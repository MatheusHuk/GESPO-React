import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import CategoryService from '../../services/categoryService'
import TeamService from '../../services/teamService'
import "./index.css"
import * as Style from './style'
import FA from 'react-fontawesome'
import * as ReactBootstrap from "react-bootstrap";

export default class CategoryRegister extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            showToaster: false,
            showEdit: false,
            showGrid: true,
            toaster: {
                header: "",
                body: ""
            },
            categories: [],
            selectDados: {                
                teams: []
            },            
            newDados: {           
                dsCategory: ""                                    
            },
            editDados: {
                id: -1,
                dsCategory: ""
            }
        }
    }

    componentDidUpdate() {
        console.log("This.state: ", this.state)
    }

    async save() {
        this.props.setLoad(true)
        await CategoryService.create([this.state.newDados])
            .then(async (res) => {
                await CategoryService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            categories: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `A categoria ${this.state.newDados.dsCategory} foi criado com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar categoria !`,
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
                        body: `Erro ao criar categoria !`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await CategoryService.getAll()
            .then(async (res) => {
                await TeamService.getAll()
                    .then(async (res2) => {                        
                                this.setState({
                                    ...this.state,
                                    categories: res.data = "" ? [] : res.data,
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
        this.props.setLoad(false)
        this.props.setShowMenu(true);
    }


    async updateCategory() {
        this.props.setLoad(true)
        await CategoryService.create([this.state.editDados])
            .then(async (res) => {
                await CategoryService.getAll()
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            categories: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `A Categoria ${this.state.editDados.dsCategory} foi criado com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao criar categoria !`,
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
                        body: `Erro ao criar categoria !`,
                    }
                })
            })
        this.props.setLoad(false)
    }


    async deleteCategory(id) {
        this.props.setLoad(true)
        await CategoryService.delete({ "id": id })
            .then(async (res) => {
                await CategoryService.getAll()
                    .then(res2 => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            showGrid: true,
                            showEdit: false,
                            categories: res2.data = "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: `Categoria excluída com sucesso !`,
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Error",
                                body: `Erro ao excluir categoria !`,
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
                        body: `Erro ao excluir categoria !`,
                    }
                })
            })
        this.props.setLoad(false)
    }

    editCategory(data) {
        this.setState({
            ...this.state,
            showEdit: true,
            showGrid: false,
            editDados: {
                ...data
            }
        })
    }

    handleNewCategory(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                dsCategory: e.target.value
            }
        })
    }

    handleEditCategory(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                dsCategory: e.target.value
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
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showGrid}
                                onClick={() => { this.setState({ ...this.state, showGrid: true, showEdit: false }) }}
                            >
                                <p>Categoria</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showGrid && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                            >
                                <p>Cadastro de categoria</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar categoria</p>
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
                                                <th>Categoria</th>                                                                            
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.categories.map((value, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{value.dsCategory}</td>                                                       
                                                            <td>
                                                                <Style.Icone onClick={() => { this.editCategory(value) }}>
                                                                    <FA name="edit" />
                                                                </Style.Icone>
                                                                <Style.Icone onClick={() => { this.deleteCategory(value.id) }}>
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
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text"
                                                        defaultValue={this.state.editDados.dsCategory}
                                                        onChange={(event) => { this.handleEditCategory(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBigBox>                                            
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { this.updateCategory() }}>
                                            Gravar
                                        </Style.BotaoForm>                                        
                                    </Style.DFooter>
                                </Style.Dados>
                                :
                                <Style.Dados>
                                    <Style.DHeader>
                                        Categoria 
                        </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCnpj">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleNewCategory(event) }} />
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
