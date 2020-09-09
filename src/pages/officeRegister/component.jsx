import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import DeleteModal from '../../components/DeleteModal'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import OfficeService from '../../services/officeService'
import CategoryService from '../../services/categoryService'
import PermissionService from '../../services/permissionService'
import "./index.css"
import * as Style from './style'
import FA from 'react-fontawesome'
import * as ReactBootstrap from "react-bootstrap";

export default class OfficeRegister extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            showDeleteModal: false,
            deleteModal: {
                obj: {},
                message: "",
                yes: this.deleteUser
            },
            showToaster: false,
            showEdit: false,
            showGrid: true,
            toaster: {
                header: "",
                body: ""
            },
            Offices: [],
            selectDados: {
                permissions: []
            },            
            newDados: {           
                name: ""                                  
            },
            editDados: {
                id: -1,
                name: ""
            }
        }
    }

    componentDidUpdate() {
        console.log("This.state: ", this.state)
    }
    
    async save() {
        this.props.setLoad(true)
        await OfficeService.create(this.state.newDados)
            .then(async (res) => {
                await OfficeService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            Offices: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O Cargo ${this.state.newDados.name} foi criado com sucesso`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar Cargo`,
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
                        body: `Erro ao criar Cargo`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await OfficeService.getAllP()
        .then(async (res2) => {
            if(res2.data == ""){
                this.setState({
                    ...this.state,
                    invalid: {
                        show: true,
                        message: "Você não tem nenhuma permissão cadastrado"
                    }
                })
                return;
            }
            await OfficeService.getAll()
                .then(res => {                                          
                    this.setState({
                        ...this.state,
                        Offices: res.data = "" ? [] : res.data,
                        selectDados: {
                            permissions: res2.data = "" ? [] : res2.data
                            },
                        newDados: {
                            ...this.state.newDados,
                            permission: res2.data = "" ? {} : res2.data[0]
                            }
                                    })
                                })
                            })                                
                    .catch(error => {
                        console.log("Error: ", error)
                    })                           
        this.props.setLoad(false)
        this.props.setShowMenu(true);
    }

    async updateOffice() {
        this.props.setLoad(true)
        await OfficeService.create(this.state.editDados)
            .then(async (res) => {
                await OfficeService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            Offices: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O Cargo ${this.state.editDados.name} foi atualizado com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar Cargo!`,
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
                        body: `Erro ao criar Cargo!`,
                    }
                })
            })
        this.props.setLoad(false)
    }


    async deleteOffice(id) {
        this.props.setLoad(true)
        await OfficeService.delete({ "id": id })
            .then(async (res) => {
                await OfficeService.getAll()
                    .then(res2 => {
                        this.setState({
                            ...this.state,
                            showDeleteModal: false,
                            showToaster: true,
                            showGrid: true,
                            showEdit: false,
                            Offices: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `Cargo excluído com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao excluir Cargo !`,
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
                        body: `Erro ao excluir Cargo !`,
                    }
                })
            })
        this.props.setLoad(false)
    }


    handleNewOffice(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                name: e.target.value
            }
        })
    }

    handleNewPermission(e) {
        let res = this.state.selectDados.permissions.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                permission: res
            }
        })
    }

    handleEditPermission(e) {
        let res = this.state.selectDados.permissions.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                permission: res
            }
        })
    }


    handleEditOffice(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                name: e.target.value
            }
        })
    }

    editOffice(data) {
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
                message: "Deseja excluir Cargo "+value.name+"?"
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
                                yes={(v) => { this.deleteOffice(v) }}
                                no={() => { this.setState({ ...this.state, showDeleteModal: false})}}
                            /> : null
                        }
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showGrid}
                                onClick={() => { this.setState({ ...this.state, showGrid: true, showEdit: false }) }}
                            >
                                <p>Cargo</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showGrid && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                            >
                                <p>Cadastro de Cargo</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar Cargo</p>
                            </Style.HeaderEditButton>
                        </Style.HeaderContainer>
                        {this.state.showGrid ?
                            <Style.DadosGrid>
                                <Style.DHeader>
                                    Cargo
                            </Style.DHeader>
                                <Style.TableDiv>
                                    <ReactBootstrap.Table striped bordered hover className="table">
                                        <thead>
                                            <tr>
                                                <th>Cargo</th>                                                                            
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Offices.map((value, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{value.name}</td>                                                       
                                                            <td>
                                                                <Style.Icone onClick={() => { this.editOffice(value) }}>
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
                            </Style.DadosGrid>
                            : this.state.showEdit ?
                                <Style.Dados>
                                    <Style.DHeader>
                                        Permissão
                                    </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>Cargo</Form.Label>
                                                        <Form.Control type="text"
                                                        defaultValue={this.state.editDados.name}
                                                        onChange={(event) => { this.handleEditOffice(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>

                                            <Style.DBox>
                                                    <Card.Body className="fundoForm">

                                                        <Form.Group as={Col} controlId="formGridPermission">
                                                            <Form.Label>Permissão</Form.Label>
                                                            <Form.Control as="select"
                                                                defaultValue={this.state.editDados.permission.id}
                                                                onChange={(event) => { this.handleEditPermission(event) }}>
                                                                {
                                                                    this.state.selectDados.permissions.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id}>{value.dsPermission}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>


                                                    </Card.Body>
                                                </Style.DBox>

                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { this.updateOffice() }}>
                                            Gravar
                                        </Style.BotaoForm>                                        
                                    </Style.DFooter>
                                </Style.Dados>
                                :
                                <Style.Dados>
                                    <Style.DHeader>
                                        Cargo 
                        </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>Cargo</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewOffice(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>  

                                            <Style.DBox>
                                                    <Card.Body className="fundoForm">

                                                    <Form.Group as={Col} controlId="formGridPermission">
                                                            <Form.Label>Permissão</Form.Label>
                                                            <Form.Control as="select"
                                                                defaultValue={this.state.editDados.permission}
                                                                onChange={(event) => { this.handleNewPermission(event) }}>
                                                                {
                                                                    this.state.selectDados.permissions.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id}>{value.dsPermission}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control>
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
