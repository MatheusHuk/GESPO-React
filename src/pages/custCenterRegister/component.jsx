import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import CustCenterService from '../../services/CustCenterService'
import "./index.css"
import * as Style from './style'
import FA from 'react-fontawesome'
import * as ReactBootstrap from "react-bootstrap";

export default class CustCenterRegister extends React.Component {

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
            custCenters: [],
            selectDados: {
                nameCustCenters: []
            },
            newDados: {
                name: "",
                cnpj: ""
            },
            editDados: {
                id: -1,
                cnpj: ""
            }
        }
    }

    componentDidUpdate() {
        console.log("This.state: ", this.state)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await CustCenterService.getAll()
            .then(res => {
                this.setState({
                    ...this.state,
                    custCenters: res.data = "" ? [] : res.data,
                    selectDados: {
                        nameCustCenters: res.data = "" ? [] : res.data
                    },
                    newDados: {
                        ...this.state.newDados,
                        custCenter: res.data = "" ? {} : res.data[0]
                    }
                })
            })
            .catch(error => {
                console.log("Error: ", error)
            })
        this.props.setLoad(false)
    }


    async save() {
        this.props.setLoad(true)
        await CustCenterService.create([this.state.newDados])
            .then(async (res) => {
                await CustCenterService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            employees: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O Centro de custo ${this.state.newDados.name} foi criado com sucesso`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar centro de custo`,
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
                        body: `Erro ao centro de custo`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    handleNewCustCenter(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                name: e.target.value
            }
        })
    }

    handleNewCnpj(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                cnpj: e.target.value
            }
        })
    }

    handleEditCustCenter(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.editDados,
                name: e.target.value
            }
        })
    }

    handleEditCnpj(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.editDados,
                cnpj: e.target.value
            }
        })
    }

    async deleteCustCenter(id){
        this.props.setLoad(true)
        await CustCenterService.delete({ "id": id })
            .then(async (res) => {
                await CustCenterService.getAll()
                    .then(res2 => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            showGrid: true,
                            showEdit: false,
                            employees: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `Centro de custo excluído com sucesso`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao excluir centro de custo`,
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
                        body: `Erro ao excluir centro de custo`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    editCustCenter(data) {
        this.setState({
            ...this.state,
            showEdit: true,
            showGrid: false,
            editDados: {
                ...data                
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
                                <p>centros de custo</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showGrid && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                            >
                                <p>Cadastrar centro de custo</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar centro de custo</p>
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
                                                <th>CNPJ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.custCenters.map((value, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{value.name}</td>
                                                            <td>{value.cnpj}</td>
                                                            <td>
                                                                <Style.Icone onClick={() => { this.editCustCenter(value) }}>
                                                                    <FA name="edit" />
                                                                </Style.Icone>
                                                                <Style.Icone onClick={() => { this.deleteCustCenter(value.id) }}>
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
                                            <Style.DivTitle>Editar centro de custo</Style.DivTitle>
                                        </Style.DivCreate>
                                    </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Nome do centro de custo</Form.Label>
                                                        <Form.Control type="text"
                                                        defaultValue={this.state.editDados.name}
                                                        onChange={(event) => { this.handleEditCustCenter(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>CNPJ</Form.Label>
                                                        <Form.Control type="text"
                                                        defaultValue={this.state.editDados.cnpj}
                                                        onChange={(event) => { this.handleEditCnpj(event) }} />
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
                                :
                                <Style.Dados>
                                    <Style.DHeader>
                                        <Style.DivCreate>
                                            <Style.DivTitle>Editar centro de custo</Style.DivTitle>
                                        </Style.DivCreate>
                                    </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Nome do centro de custo</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewCustCenter(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>CNPJ</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewCnpj(event) }} />
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