import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import * as ReactBootstrap from "react-bootstrap";
import FA from 'react-fontawesome'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'
import CategoryService from '../../services/categoryService'
import TeamService from '../../services/teamService'
import EmployeeService from '../../services/employeeService'

export default class UserRegister extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showToaster: false,
            showEdit: false,
            showGrid: true,
            toaster: {
                header: "",
                body: ""
            },
            employees: [],
            selectDados: {
                categories: [],
                teams: []
            },
            newDados: {
                name: "",
                cpf: "",
                dtBirth: "2020-01-01",
                email: "",
                password: "",
                hourValue: 0,
                office: "",
                permission: {
                    id: 2
                }
            }
        }
    }

    componentDidUpdate() {
        console.log("This.state: ", this.state)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await CategoryService.getAll()
            .then(async (res) => {
                await TeamService.getAll()
                    .then(async (res2) => {
                        await EmployeeService.getAll()
                            .then(res3 => {
                                this.setState({
                                    ...this.state,
                                    employees: res3.data = "" ? [] : res3.data,
                                    selectDados: {
                                        categories: res.data = "" ? [] : res.data,
                                        teams: res2.data = "" ? [] : res2.data
                                    },
                                    newDados: {
                                        ...this.state.newDados,
                                        category: res.data = "" ? {} : res.data[0],
                                        team: res2.data = "" ? {} : res2.data[0]
                                    }
                                })
                            })
                    })
                    .catch(error => {
                        console.log("Error: ", error)
                    })
            })
            .catch(error => {
                console.log("Error: ", error)
            })
        this.props.setLoad(false)
    }

    async save() {
        this.props.setLoad(true)
        await EmployeeService.create([this.state.newDados])
            .then(res => {
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster: {
                        header: "Sucesso",
                        body: `Usuário ${this.state.newDados.name} criado com sucesso`,
                    }
                })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster: {
                        header: "Error",
                        body: `Erro ao criar usuário`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    handleNewName(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                name: e.target.value
            }
        })
    }

    handleNewCpf(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                cpf: e.target.value
            }
        })
    }

    handleNewDate(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                dtBirth: e.target.value
            }
        })
    }

    handleNewEmail(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                email: e.target.value
            }
        })
    }

    handleNewOffice(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                office: e.target.value
            }
        })
    }

    handleNewPassword(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                password: e.target.value
            }
        })
    }

    handleNewCategory(e) {
        let res = this.state.selectDados.categories.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                category: res
            }
        })
    }

    handleNewTeam(e) {
        let res = this.state.selectDados.teams.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                team: res
            }
        })
    }

    handleNewHourValue(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                hourValue: parseInt(e.target.value)
            }
        })
    }

    render() {
        return (
            <>
                <Viewer>
                    <Toaster
                        show={this.state.showToaster}
                        setShowToaster={(sit) => { this.setState({ ...this.state, showToaster: sit }); }}
                        header={this.state.toaster.header}
                        body={this.state.toaster.body}
                    />
                    <Style.Container>
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showGrid}
                                onClick={() => { this.setState({ ...this.state, showGrid: true, showEdit: false }) }}
                            >
                                <p>Usuários</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showGrid && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                            >
                                <p>Cadastrar usuário</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar usuário</p>
                            </Style.HeaderEditButton>
                        </Style.HeaderContainer>
                        {this.state.showGrid ?
                            <Style.DadosGrid>
                                <Style.DHeader>
                                    Usuários
                                </Style.DHeader>
                                <Style.TableDiv>
                                    <ReactBootstrap.Table striped bordered hover className="table">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>Cargo</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.employees.map((value, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{value.name}</td>
                                                            <td>{value.email}</td>
                                                            <td>{value.office}</td>
                                                            <td>
                                                                <Style.Icone onClick={() => { }}>
                                                                    <FA name="edit" />
                                                                </Style.Icone>
                                                                <Style.Icone onClick={() => { }}>
                                                                    <FA name="ban" />
                                                                </Style.Icone>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </ReactBootstrap.Table>
                                </Style.TableDiv>
                            </Style.DadosGrid>
                            : this.state.showEdit ? 
                            <Style.Dados>
                                <Style.DHeader>
                                    <Style.DivCreate>
                                        <Style.DivTitle>Editar Usuário</Style.DivTitle>
                                    </Style.DivCreate>
                                </Style.DHeader>
                                <Style.DBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Nome do Usuário</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewName(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewEmail(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Cargo</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewOffice(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridBirthDate">
                                                    <Form.Label>Data de Nascimento</Form.Label>
                                                    <Form.Control type="date" onChange={(event) => { this.handleNewDate(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>CPF</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewCpf(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewPassword(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">

                                                <Form.Group as={Col} controlId="formGridCategory">
                                                    <Form.Label>Categoria</Form.Label>
                                                    <Form.Control as="select"
                                                        defaultValue={this.state.newDados.category}
                                                        onChange={(event) => { this.handleNewCategory(event) }}>
                                                        {
                                                            this.state.selectDados.categories.map((value, i) => {
                                                                return (
                                                                    <option value={value.id}>{value.dsCategory}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>

                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridTeam">
                                                    <Form.Label>Time</Form.Label>
                                                    <Form.Control as="select"
                                                        defaultValue={this.state.newDados.team}
                                                        onChange={(event) => { this.handleNewTeam(event) }}>
                                                        {
                                                            this.state.selectDados.teams.map((value, i) => {
                                                                return (
                                                                    <option value={value.id}>{value.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridHourTax">
                                                    <Form.Label>Taxa Hora</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewHourValue(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                </Style.DBody>
                                <Style.DFooter>
                                    <Style.BotaoForm onClick={() => { this.save() }}>
                                        Gravar
                                    </Style.BotaoForm>
                                    <Style.BotaoForm>
                                        Deletar
                                    </Style.BotaoForm>
                                </Style.DFooter>
                            </Style.Dados>
                            :
                            <Style.Dados>
                                <Style.DHeader>
                                    <Style.DivCreate>
                                        <Style.DivTitle>Cadastrar Usuário</Style.DivTitle>
                                    </Style.DivCreate>
                                </Style.DHeader>
                                <Style.DBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Nome do Usuário</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewName(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewEmail(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Cargo</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewOffice(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridBirthDate">
                                                    <Form.Label>Data de Nascimento</Form.Label>
                                                    <Form.Control type="date" onChange={(event) => { this.handleNewDate(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>CPF</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewCpf(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col}>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewPassword(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">

                                                <Form.Group as={Col} controlId="formGridCategory">
                                                    <Form.Label>Categoria</Form.Label>
                                                    <Form.Control as="select"
                                                        defaultValue={this.state.newDados.category}
                                                        onChange={(event) => { this.handleNewCategory(event) }}>
                                                        {
                                                            this.state.selectDados.categories.map((value, i) => {
                                                                return (
                                                                    <option value={value.id}>{value.dsCategory}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>

                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridTeam">
                                                    <Form.Label>Time</Form.Label>
                                                    <Form.Control as="select"
                                                        defaultValue={this.state.newDados.team}
                                                        onChange={(event) => { this.handleNewTeam(event) }}>
                                                        {
                                                            this.state.selectDados.teams.map((value, i) => {
                                                                return (
                                                                    <option value={value.id}>{value.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridHourTax">
                                                    <Form.Label>Taxa Hora</Form.Label>
                                                    <Form.Control type="text" onChange={(event) => { this.handleNewHourValue(event) }} />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                </Style.DBody>
                                <Style.DFooter>
                                    <Style.BotaoForm onClick={() => { this.save() }}>
                                        Gravar
                                    </Style.BotaoForm>
                                </Style.DFooter>
                            </Style.Dados>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}
