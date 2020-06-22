import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import DeleteModal from '../../components/DeleteModal'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import CustCenterService from '../../services/CustCenterService'
import "./index.css"
import * as Style from './style'
import FA from 'react-fontawesome'
import { Invalid } from '../style.js'
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
        this.props.setLoad(false);
        this.props.setShowMenu(true);

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
                            custCenters: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O Centro de custo ${this.state.newDados.name} foi criado com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar centro de custo !`,
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
                        body: `Erro ao criar centro de custo !`,
                    }
                })
            })
        this.props.setLoad(false)
    }


    async updateCustCenter() {
        this.props.setLoad(true)
        await CustCenterService.create([this.state.newDados])
            .then(async (res) => {
                await CustCenterService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            custCenters: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O Centro de custo ${this.state.editDados.name} foi atualizado com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao atualizar centro de custo !`,
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
                        body: `Erro ao atualizar centro de custo !`,
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

    async deleteCustCenter(id) {
        this.props.setLoad(true)
        await CustCenterService.delete({ "id": id })
            .then(async (res) => {
                await CustCenterService.getAll()
                    .then(res2 => {
                        this.setState({
                            ...this.state,
                            showDeleteModal: false,
                            showToaster: true,
                            showGrid: true,
                            showEdit: false,
                            custCenters: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `Centro de custo excluído com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao excluir centro de custo !`,
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
                        body: `Erro ao excluir centro de custo !`,
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

    openModal(value){
        this.setState({
            ...this.state,
            showDeleteModal: true,
            deleteModal:{
                ...this.state.deleteModal,
                obj: value.id,
                message: "Deseja excluir Centro de Custo "+value.name+"?"
            }
        })
    }

    render() {

        return (
            <>
                <Viewer logged={this.props.logged} setLoad={this.props.setLoad} showMenu={this.props.showMenu} setShowMenu={this.props.setShowMenu}>
                    <Toaster
                        show={this.state.showToaster}
                        setShowToaster={(sit) => { this.setState({ ...this.state, showToaster: sit }); }}
                        header={this.state.toaster.header}
                        body={this.state.toaster.body}
                    />
                    <Style.Container>
                        {
                            this.state.showDeleteModal ?
                            <DeleteModal 
                                message={this.state.deleteModal.message}
                                obj={this.state.deleteModal.obj}
                                yes={(v) => { this.deleteCustCenter(v) }}
                                no={() => { this.setState({ ...this.state, showDeleteModal: false})}}
                            /> : null
                        }
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showGrid}
                                onClick={() => { this.setState({ ...this.state, showGrid: true, showEdit: false }) }}
                            >
                                <p>Centros de custos</p>
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
                                    Centros de Custo
                                </Style.DHeader>
                                    {
                                        this.state.custCenters.length == 0 ?
                                        <Invalid>Você não possui nenhum centro de custo cadastrado</Invalid> :
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
                                                                        <Style.Icone onClick={() => { this.openModal(value) }}>
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
                                    }
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
                                        <Style.BotaoForm onClick={() => { this.updateCustCenter() }}>
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