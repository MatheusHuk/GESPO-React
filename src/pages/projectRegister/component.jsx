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
                managers: [],
                nameCustCenters: []
            },
            newDados: {
                name: "",
                dsProject: ""
            },
            editDados: {
                id: -1,
                name: "",
                dsProject: ""
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
                await ProjectService.getAll()
                .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            projects: res.data = "" ? [] : res.data,
                            selectDados: {
                                managers: res.data = "" ? [] : res.data,
                                nameCustCenters: res2.data = "" ? [] : res2.data
                                },
                            newDados: {
                                ...this.state.newDados,
                                manager: res.data = "" ? {} : res.data[0],
                                nameCustCenter: res2.data = "" ? {} : res2.data[0]
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

    handleNewManager(e) {
        let res = this.state.selectDados.managers.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                manager: res
            }
        })
    }

    handleNewCustCenter(e){
        let res = this.state.selectDados.nameCustCenters.find(v => v.id == e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                nameCustCenter: res
            }
        })
    }

    handleNewProject(e){
        this.setState({
            ...this.state,
            newDados: {
                name : e.target.value
            }
        })
    }

    handleNewDescProject(e){
        this.setState({
            ...this.state,
            newDados:{
                dsProject: e.target.value
            }
        })
    }

    render() {
        return (
        <>
                <Viewer>
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
                                            this.state.projects.map((value, i) => {
                                                return (
                                                    <tr>
                                                        <td>{value.name}</td>
                                                        <td>{value.dsProject}</td>
                                                        <td>
                                                            <Style.Icone onClick={() => { this.editUser(value) }}>
                                                                <FA name="edit" />
                                                            </Style.Icone>
                                                            <Style.Icone onClick={() => { this.deleteUser(value.id) }}>
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
                            <Style.DBody>
                                <Style.DBoxBody>
                                    <Style.DBox>
                                        <Card.Body className="fundoForm">
                                            <Form.Group as={Col} controlId="formGridProjectName">
                                                <Form.Label>Nome do Projeto</Form.Label>
                                                <Form.Control type="text" placeholder="Automático" />
                                            </Form.Group>
                                        </Card.Body>
                                    </Style.DBox>
                                    <Style.DBox>
                                        <Card.Body className="fundoForm">

                                            <Form.Group as={Col} controlId="formGridManager">
                                                <Form.Label>Gerente Responsável</Form.Label>
                                                <Form.Control as="select" value="Choose...">
                                                    {
                                                        
                                                    }               
                                            </Form.Control>
                                        </Form.Group>

                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">

                                                <Form.Group as={Col} controlId="formGridClient">
                                                    <Form.Label>Cliente</Form.Label>
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Cliente 1</option>
                                                        <option>Cliente 2</option>
                                                        <option>Cliente 3</option>
                                                    </Form.Control>
                                                </Form.Group>

                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">
                                                <Form.Group as={Col} controlId="formGridCustCenter">
                                                    <Form.Label>Centro de Custo</Form.Label>
                                                    <Form.Control type="text" placeholder="Automático" />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBox>
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">

                                                <Form.Group as={Col} controlId="formGridCategory">
                                                    <Form.Label>Categoria</Form.Label>
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Categoria 1</option>
                                                        <option>Categoria 2</option>
                                                        <option>Categoria 3</option>
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
                                                    <Form.Control type="text" placeholder="" />
                                                </Form.Group>
                                            </Card.Body>
                                        </Style.DBigBox>
                                    </Style.DBoxBody>
                        </Style.DBody>
                                <Style.DFooter>
                                    <Style.BotaoForm>
                                        Gravar
                            </Style.BotaoForm>
                                    <Style.BotaoForm>
                                        Deletar
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
                                                <Form.Control type="text"  onChange={(event) => { this.handleNewProject(event) }} />
                                            </Form.Group>
                                        </Card.Body>
                                    </Style.DBox>
                                    <Style.DBox>
                                        <Card.Body className="fundoForm">

                                            <Form.Group as={Col} controlId="formGridManager">
                                                <Form.Label>Gerente Responsável</Form.Label>
                                                <Form.Control as="select" defaultValue = {this.state.newDados.team}
                                                        onChange={(event) => { this.handleNewManager(event) }}>
                                                    {
                                                        this.state.selectDados.managers.map((value, i) => {
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
                                        <Style.DBox>
                                            <Card.Body className="fundoForm">

                                                <Form.Group as={Col} controlId="formGridClient">
                                                    <Form.Label>Centro de custo</Form.Label>
                                                    <Form.Control as="select" defaultValue = {this.state.newDados.nameCustCenter}
                                                        onChange={(event) => { this.handleNewCustCenter(event) }}>
                                                        {
                                                            this.state.selectDados.nameCustCenters.map((value, i) => {
                                                                return(
                                                                    <option value={value.id}>{value.dsCustCenter}</option>
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
                                    <Style.BotaoForm>
                                        Gravar
                            </Style.BotaoForm>
                                    <Style.BotaoForm>
                                        Deletar
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
