import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import DeleteModal from '../../components/DeleteModal'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import TeamService from '../../services/teamService'
import CategoryService from '../../services/categoryService'
import "./index.css"
import * as Style from './style'
import FA from 'react-fontawesome'
import * as ReactBootstrap from "react-bootstrap";

export default class TeamRegister extends React.Component {

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
            teams: [],
            selectDados: {                
                team: []
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
        await TeamService.create([this.state.newDados])
            .then(async (res) => {
                await TeamService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            teams: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O time ${this.state.newDados.name} foi criado com sucesso`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar time`,
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
                        body: `Erro ao criar time`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await TeamService.getAll()
            .then(async (res) => {
                await TeamService.getAll()
                    .then(async (res2) => {                        
                                this.setState({
                                    ...this.state,
                                    teams: res.data = "" ? [] : res.data,
                                    selectDados: {
                                        teams: res.data = "" ? [] : res.data
                                    },
                                    newDados: {
                                        ...this.state.newDados,
                                        category: res.data = "" ? {} : res.data[0]
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


    async updateTeam() {
        this.props.setLoad(true)
        await TeamService.create([this.state.editDados])
            .then(async (res) => {
                await TeamService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            teams: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `O time ${this.state.editDados.name} foi atualizado com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar time!`,
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
                        body: `Erro ao criar time!`,
                    }
                })
            })
        this.props.setLoad(false)
    }


    async deleteTeam(id) {
        this.props.setLoad(true)
        await TeamService.delete({ "id": id })
            .then(async (res) => {
                await TeamService.getAll()
                    .then(res2 => {
                        this.setState({
                            ...this.state,
                            showDeleteModal: false,
                            showToaster: true,
                            showGrid: true,
                            showEdit: false,
                            teams: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `Time excluído com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao excluir time, pois possui funcionários trabalhando nele !`,
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
                        body: `Erro ao excluir time, pois possui funcionários trabalhando nele !`,
                    }
                })
            })
        this.props.setLoad(false)
    }


    handleNewTeam(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                name: e.target.value
            }
        })
    }

    handleEditTeam(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                name: e.target.value
            }
        })
    }

    editTeam(data) {
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
                message: "Time "+value.name
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
                                yes={(v) => { this.deleteTeam(v) }}
                                no={() => { this.setState({ ...this.state, showDeleteModal: false})}}
                            /> : null
                        }
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showGrid}
                                onClick={() => { this.setState({ ...this.state, showGrid: true, showEdit: false }) }}
                            >
                                <p>Time</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showGrid && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                            >
                                <p>Cadastro de time</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar Time</p>
                            </Style.HeaderEditButton>
                        </Style.HeaderContainer>
                        {this.state.showGrid ?
                            <Style.DadosGrid>
                                <Style.DHeader>
                                    Time
                            </Style.DHeader>
                                <Style.TableDiv>
                                    <ReactBootstrap.Table striped bordered hover className="table">
                                        <thead>
                                            <tr>
                                                <th>Time</th>                                                                            
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.teams.map((value, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{value.name}</td>                                                       
                                                            <td>
                                                                <Style.Icone onClick={() => { this.editTeam(value) }}>
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
                                        Categoria
                                    </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>Time</Form.Label>
                                                        <Form.Control type="text"
                                                        defaultValue={this.state.editDados.name}
                                                        onChange={(event) => { this.handleEditTeam(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBigBox>                                            
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { this.updateTeam() }}>
                                            Gravar
                                        </Style.BotaoForm>                                        
                                    </Style.DFooter>
                                </Style.Dados>
                                :
                                <Style.Dados>
                                    <Style.DHeader>
                                        Time 
                        </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>Time</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewTeam(event) }} />
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
