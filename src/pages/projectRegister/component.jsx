import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import * as ReactBootstrap from "react-bootstrap";
import FA from 'react-fontawesome'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'
import ProjectService from '../../services/projectService'
import EmployeeService from '../../services/employeeService';
import CustCenterService from '../../services/CustCenterService'


export default class ProjectRegister extends React.Component {


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
            projects: [],
            selectDados: {
                nameCustCenters: []
            },
            newDados: {
                name: "",
                dsProject: "",
                manager: "",
                costCenter: {

                }
            },
            editDados: {
                id: -1,
                name: "",
                dsProject: "",
                manager: "",
                costCenter: {

                }
            }
        }
    }

    componentDidUpdate() {
        console.log("This.state: ", this.state)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                await CustCenterService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            projects: res.data = "" ? [] : res.data,
                            selectDados: {

                                nameCustCenters: res2.data = "" ? [] : res2.data
                            },
                            newDados: {
                                ...this.state.newDados,

                                costCenter: res2.data = "" ? {} : res2.data[0]
                            }
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
        await ProjectService.create([this.state.newDados])
            .then(async (res) => {
                await ProjectService.getAllByEmployeeId(this.props.logged.id)
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            projects: res2.data = "" ? [] : res2.data,
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

    async update() {
        this.props.setLoad(true)
        await ProjectService.update(this.state.editDados)
            .then(async (res) => {
                await ProjectService.getAllByEmployeeId(this.props.logged.id)
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            projects: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `Usuário ${this.state.editDados.name} criado com sucesso`,
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

    editProject(data){
        this.setState({
            ...this.state,
            showEdit: true,
            showGrid: false,
            editDados: {
                ...data
            }
        })
    }


    handleNewManager(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                manager: e.target.value
            }
        })
    }

    handleNewCustCenter(e) {
        let res = this.state.selectDados.nameCustCenters.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                costCenter: res
            }
        })
    }

    handleNewProject(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                name: e.target.value
            }
        })
    }

    handleNewDescProject(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                dsProject: e.target.value
            }
        })
    }

    handleEditManager(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                manager: e.target.value
            }
        })
    }

    handleEditCustCenter(e) {
        let res = this.state.selectDados.nameCustCenters.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                costCenter: res
            }
        })
    }

    handleEditProject(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                name: e.target.value
            }
        })
    }

    handleEditDescProject(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                dsProject: e.target.value
            }
        })
    }

    render() {
        return (
            <>
                <Viewer setLoad={this.props.setLoad}>
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
                                <p>Projetos</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showGrid && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                            >
                                <p>Cadastrar Projeto</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar Projeto</p>
                            </Style.HeaderEditButton>
                        </Style.HeaderContainer>
                        {this.state.showGrid ?
                            <Style.DadosGrid>
                                <Style.DHeader>
                                    Projetos
                            </Style.DHeader>
                                <Style.TableDiv>
                                    <ReactBootstrap.Table striped bordered hover className="table">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Descrição</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.projects.map((value, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{value.name}</td>
                                                            <td>{value.dsProject}</td>
                                                            <td>
                                                                <Style.Icone onClick={() => { this.editProject(value) }}>
                                                                    <FA name="edit" />
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
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridProjectName">
                                                        <Form.Label>Nome do Projeto</Form.Label>
                                                        <Form.Control type="text"  defaultValue={this.state.editDados.name}
                                                         onChange={(event) => { this.handleEditProject(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">

                                                    <Form.Group as={Col} controlId="formGridManager">
                                                        <Form.Label>Gerente Responsável</Form.Label>
                                                        <Form.Control type="text"  defaultValue={this.state.editDados.manager}
                                                         onChange={(event) => { this.handleEditManager(event) }}>
                                                        </Form.Control>
                                                    </Form.Group>

                                                </Card.Body>
                                            </Style.DBox>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">

                                                    <Form.Group as={Col} controlId="formGridClient">
                                                        <Form.Label>Centro de custo</Form.Label>
                                                        <Form.Control as="select" defaultValue={this.state.editDados.costCenter}
                                                            onChange={(event) => { this.handleEditCustCenter(event) }}>
                                                            {
                                                                this.state.selectDados.nameCustCenters.map((value, i) => {
                                                                    return (
                                                                        <option value={value.id}>{value.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>

                                                </Card.Body>
                                            </Style.DBox>

                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridObs">
                                                        <Form.Label>Observação</Form.Label>
                                                        <Form.Control type="text"  defaultValue={this.state.editDados.dsProject}
                                                         onChange={(event) => { this.handleEditDescProject(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBigBox>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { this.update() }}>
                                            Update
                            </Style.BotaoForm>
                                    </Style.DFooter>
                                </Style.Dados>
                                :
                                <Style.Dados>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridProjectName">
                                                        <Form.Label>Nome do Projeto</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewProject(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">

                                                    <Form.Group as={Col} controlId="formGridManager">
                                                        <Form.Label>Gerente Responsável</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewManager(event) }}>
                                                        </Form.Control>
                                                    </Form.Group>

                                                </Card.Body>
                                            </Style.DBox>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">

                                                    <Form.Group as={Col} controlId="formGridClient">
                                                        <Form.Label>Centro de custo</Form.Label>
                                                        <Form.Control as="select" defaultValue={this.state.newDados.costCenter}
                                                            onChange={(event) => { this.handleNewCustCenter(event) }}>
                                                            {
                                                                this.state.selectDados.nameCustCenters.map((value, i) => {
                                                                    return (
                                                                        <option value={value.id}>{value.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>

                                                </Card.Body>
                                            </Style.DBox>

                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridObs">
                                                        <Form.Label>Observação</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewDescProject(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBigBox>
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
