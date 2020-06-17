import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import FA from 'react-fontawesome'
import * as ReactBootstrap from "react-bootstrap";
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import ProjectService from '../../services/projectService'
import TasksService from '../../services/tasksService'
import CategoryService from '../../services/categoryService'
import EmployeeService from '../../services/employeeService'

import * as Style from './style'

export default class GoalsDefinition extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            invalid: {
                show:false,
                message: ""
            },
            showGrid: true,
            showEdit: false,
            showToaster: false,
            tasks: [],
            project: {},
            toaster: {
                header: "",
                body: ""
            },
            selectDados: {
                projects: [],
                categories: [],
                employees: []
            },
            newDados: {
                title: "",
                description: "",
                percentProject: 0,
                employee: {},
                category: {},
                project: {},
                deadline: 0
            },
            editDados: {
                title: "",
                description: "",
                percentProject: 0,
                employee: {},
                category: {},
                project: {},
                deadline: 0
            }
        }
    }

    componentDidUpdate(){
        console.log("State: ",this.state)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                res.data = ""
                if (res.data != "") {
                    await TasksService.getAllByProjectId({ id: res.data[0].id })
                        .then(async (res2) => {
                            await CategoryService.getAll()
                                .then(async (res3) => {
                                    await EmployeeService.getAllByProject({ projectId: res.data[0].id })
                                        .then(async (res4) => {
                                            let emp = []
                                            if(res4.data != ""){
                                                res4.data.forEach(v => {
                                                    emp.push(v.employee)
                                                })
                                            }
                                            this.setState({
                                                ...this.state,
                                                project: res.data[0],
                                                tasks: res2.data = "" ? [] : res2.data,
                                                selectDados: {
                                                    ...this.state.selectDados,
                                                    projects: res.data = "" ? [] : res.data,
                                                    categories: res3.data = "" ? [] : res3.data,
                                                    employees: emp,
                                                },
                                                newDados: {
                                                    ...this.state.newDados,
                                                    project: res.data = "" ? {} : res.data[0],
                                                    employee: emp[0],
                                                    category: res3.data = "" ? {} : res3.data[0],
                                                    percentProject: 0
                                                }
                                            })
                                        })
                                        .catch(error => {
                                            this.setState({
                                                ...this.state,
                                                showToaster: true,
                                                toaster: {
                                                    header: "Erro",
                                                    body: "Erro interno do servidor"
                                                }
                                            })
                                        })
                                })
                                .catch(error => {
                                    this.setState({
                                        ...this.state,
                                        showToaster: true,
                                        toaster: {
                                            header: "Erro",
                                            body: "Erro interno do servidor"
                                        }
                                    })
                                })
                        })
                        .catch(error => {
                            this.setState({
                                ...this.state,
                                showToaster: true,
                                toaster: {
                                    header: "Erro",
                                    body: "Erro interno do servidor"
                                }
                            })
                        })
                }else{
                    this.setState({
                        ...this.state,
                        invalid: {
                            show: true,
                            message: "Você não está gerindo nenhum projeto"
                        }
                    })
                }
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster: {
                        header: "Erro",
                        body: "Erro interno do servidor"
                    }
                })
            })
        this.props.setLoad(false)
        this.props.setShowMenu(true);
    }

    edit(value){
        this.setState({
            ...this.state,
            showGrid: false,
            showEdit: true,
            editDados: {
                ...value,
                deadline: 0
            }
        })
    }

    async editTask(){
        this.props.setLoad(true)
        await TasksService.update(this.state.editDados)
            .then(async (res) => {
                await TasksService.getAllByProjectId({ id: this.state.project.id })
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            tasks: res2.data == "" ? [] : res2.data,
                            showGrid: true,
                            showEdit: false,
                            showToaster: true,
                            toaster: {
                                header: "Sucesso",
                                body: "Meta atualizada com sucesso"
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Erro",
                                body: "Erro interno do servidor"
                            }
                        })
                    })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster: {
                        header: "Erro",
                        body: "Erro interno do servidor"
                    }
                })
            })
        this.props.setLoad(false)
    }

    async saveTask(){
        this.props.setLoad(true)
        await TasksService.create([this.state.newDados])
            .then(async (res) => {
                await TasksService.getAllByProjectId({ id: this.state.project.id })
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            tasks: res2.data == "" ? [] : res2.data,
                            showGrid: true,
                            showEdit: false,
                            showToaster: true,
                            toaster: {
                                header: "Sucesso",
                                body: "Meta criada com sucesso"
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Erro",
                                body: "Erro interno do servidor"
                            }
                        })
                    })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster: {
                        header: "Erro",
                        body: "Erro interno do servidor"
                    }
                })
            })
        this.props.setLoad(false)
    }

    async deleteTask(id){
        this.props.setLoad(true)
        await TasksService.delete({ id: id })
            .then(async (res) => {
                await TasksService.getAllByProjectId({ id: this.state.project.id })
                    .then(async (res2) => {
                        this.setState({
                            ...this.state,
                            tasks: res2.data == "" ? [] : res2.data,
                            showGrid: true,
                            showEdit: false,
                            showToaster: true,
                            toaster: {
                                header: "Sucesso",
                                body: "Meta excluída com sucesso"
                            }
                        })
                    })
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            showToaster: true,
                            toaster: {
                                header: "Erro",
                                body: "Erro interno do servidor"
                            }
                        })
                    })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster: {
                        header: "Erro",
                        body: "Erro interno do servidor"
                    }
                })
            })
        this.props.setLoad(false)
    }

    handleEditTitle(e){
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                title: e.target.value
            }
        })
    }

    handleEditCategory(e){
        let value = e.target.value
        console.log("Cat v: ",value)
        let res = this.state.selectDados.categories.find(v => v.id == value)
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                category: res
            }
        })
    }

    handleEditProject(e){
        let value = e.target.value
        let res = this.state.selectDados.projects.find(v => v.id == value)
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                project: res
            }
        })
    }

    handleEditPercent(e){
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                percentProject: e.target.value
            }
        })
    }

    handleEditDesc(e){
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                description: e.target.value
            }
        })
    }

    handleNewTitle(e){
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                title: e.target.value
            }
        })
    }

    handleNewCategory(e){
        let value = e.target.value
        console.log("Cat v: ",value)
        let res = this.state.selectDados.categories.find(v => v.id == value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                category: res
            }
        })
    }

    handleNewProject(e){
        let value = e.target.value
        let res = this.state.selectDados.projects.find(v => v.id == value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                project: res
            }
        })
    }

    handleNewEmployee(e){
        let value = e.target.value
        let res = this.state.selectDados.employees.find(v => v.id == value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                employee: res
            }
        })
    }

    handleNewDesc(e){
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                description: e.target.value
            }
        })
    }

    render() {
        return (
            <>
                <Viewer setLoad={this.props.setLoad} showMenu={this.props.showMenu} setShowMenu={this.props.setShowMenu}>
                    <Toaster
                        show={this.state.showToaster}
                        setShowToaster={(sit) => { this.setState({ ...this.state, showToaster: sit }); }}
                        header={this.state.toaster.header}
                        body={this.state.toaster.body}
                    />
                    <Style.Container>
                        {
                            this.state.invalid.show ? 
                            <>{this.state.invalid.message}</> :
                            <>
                                <Style.HeaderContainer>
                                    <Style.HeaderButton
                                        selected={this.state.showGrid}
                                        onClick={() => { this.setState({ ...this.state, showGrid: true, showEdit: false }) }}
                                    >
                                        <p>Metas</p>
                                    </Style.HeaderButton>
                                    <Style.HeaderButton
                                        selected={!this.state.showGrid && !this.state.showEdit}
                                        onClick={() => { this.setState({ ...this.state, showGrid: false, showEdit: false }) }}
                                    >
                                        <p>Nova meta</p>
                                    </Style.HeaderButton>
                                    <Style.HeaderEditButton
                                        selected={this.state.showEdit}
                                    >
                                        <p>Editar meta</p>
                                    </Style.HeaderEditButton>
                                </Style.HeaderContainer>
                                {this.state.showGrid ?
                                    <>
                                        <Style.Filtros>
                                            <Style.DHeader>
                                                <Style.DivCreate>Filtros</Style.DivCreate>
                                            </Style.DHeader>
                                            <Style.DBody>
                                                <Style.DBoxBody>
                                                    <Style.DBigBox>
                                                        <Card.Body className="fundoForm">
                                                            <Form.Group as={Col} controlId="formGridClientName">
                                                                <Form.Label>Projeto</Form.Label>
                                                                <Form.Control as="select"
                                                                    defaultValue={this.state.project.id}>
                                                                    {
                                                                        this.state.selectDados.projects.map((value, i) => {
                                                                            return (
                                                                                <option value={value.id} key={i}>{value.name}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Card.Body>
                                                    </Style.DBigBox>
                                                </Style.DBoxBody>
                                            </Style.DBody>
                                        </Style.Filtros>
                                        <Style.DadosTerceiros>
                                            <Style.DHeader>
                                                <Style.DivCreate>Metas - {this.state.project.name}</Style.DivCreate>
                                            </Style.DHeader>
                                            <Style.TableDiv>
                                                <ReactBootstrap.Table striped bordered hover className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Titulo</th>
                                                            <th>Descrição</th>
                                                            <th>Categoria</th>
                                                            <th>Funcionário</th>
                                                            <th>%</th>
                                                            <th>Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.tasks.map((value, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{value.title}</td>
                                                                        <td>{value.description}</td>
                                                                        <td>{value.category.dsCategory}</td>
                                                                        <td>{value.employee.name}</td>
                                                                        <td>
                                                                            {value.percentProject}%
                                                                        <input type="range" min={0} max={100} value={value.percentProject} readOnly />
                                                                        </td>
                                                                        <td>
                                                                            <Style.Icone onClick={() => { this.edit(value) }}>
                                                                                <FA name="edit" />
                                                                            </Style.Icone>
                                                                            <Style.Icone onClick={() => { this.deleteTask(value.id) }}>
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
                                        </Style.DadosTerceiros>
                                    </>
                                    : this.state.showEdit ?
                                    <Style.Dados>
                                        <Style.DHeader>
                                            <Style.DivCreate>
                                                <Style.DivTitle>Editar Meta</Style.DivTitle>
                                            </Style.DivCreate>
                                        </Style.DHeader>
                                        <Style.DBody>
                                            <Style.DBoxBody>
                                                <Style.DBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Título</Form.Label>
                                                            <Form.Control type="text"
                                                            defaultValue={this.state.editDados.title}
                                                            onChange={(event) => { this.handleEditTitle(event) }} />
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBox>
                                                <Style.DBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Categoria</Form.Label>
                                                            <Form.Control as="select" 
                                                            defaultValue={this.state.editDados.category.id}
                                                            onChange={(event) => { this.handleEditCategory(event) }}>
                                                                {
                                                                    this.state.selectDados.categories.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id} key={i}>{value.dsCategory}</option>
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
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Projeto</Form.Label>
                                                            <Form.Control as="select" 
                                                            defaultValue={this.state.editDados.project.id}
                                                            onChange={(event) => { this.handleEditProject(event) }}>
                                                                {
                                                                    this.state.selectDados.projects.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id} key={i}>{value.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBox>
                                                <Style.DBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Concluída (%)</Form.Label>
                                                            <Form.Control type="text"
                                                            defaultValue={this.state.editDados.percentProject}
                                                            onChange={(event) => { this.handleEditPercent(event) }} />
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBox>
                                            </Style.DBoxBody>
                                            <Style.DBoxBody>
                                                <Style.DBigBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Descrição</Form.Label>
                                                            <Form.Control type="text"
                                                            defaultValue={this.state.editDados.description}
                                                            onChange={(event) => { this.handleEditDesc(event) }} />
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBigBox>
                                            </Style.DBoxBody>
                                        </Style.DBody>
                                        <Style.DFooter>
                                            <Style.BotaoForm onClick={() => { this.editTask() }}>
                                                Gravar
                                            </Style.BotaoForm>
                                        </Style.DFooter>
                                    </Style.Dados>
                                    :
                                    <Style.Dados>
                                        <Style.DHeader>
                                            <Style.DivCreate>
                                                <Style.DivTitle>Nova Meta</Style.DivTitle>
                                            </Style.DivCreate>
                                        </Style.DHeader>
                                        <Style.DBody>
                                            <Style.DBoxBody>
                                                <Style.DBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Título</Form.Label>
                                                            <Form.Control type="text"
                                                            defaultValue={this.state.newDados.title}
                                                            onChange={(event) => { this.handleNewTitle(event) }} />
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBox>
                                                <Style.DBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Categoria</Form.Label>
                                                            <Form.Control as="select" 
                                                            defaultValue={this.state.newDados.category.id}
                                                            onChange={(event) => { this.handleNewCategory(event) }}>
                                                                {
                                                                    this.state.selectDados.categories.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id} key={i}>{value.dsCategory}</option>
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
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Projeto</Form.Label>
                                                            <Form.Control as="select" 
                                                            defaultValue={this.state.newDados.project.id}
                                                            onChange={(event) => { this.handleNewProject(event) }}>
                                                                {
                                                                    this.state.selectDados.projects.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id} key={i}>{value.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBox>
                                                <Style.DBox>
                                                    <Card.Body className="fundoForm">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Funcionário</Form.Label>
                                                            <Form.Control as="select" 
                                                            defaultValue={this.state.newDados.employee.id}
                                                            onChange={(event) => { this.handleNewEmployee(event) }}>
                                                                {
                                                                    this.state.selectDados.employees.map((value, i) => {
                                                                        return (
                                                                            <option value={value.id} key={i}>{value.name}</option>
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
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Descrição</Form.Label>
                                                            <Form.Control type="text"
                                                            defaultValue={this.state.newDados.description}
                                                            onChange={(event) => { this.handleNewDesc(event) }} />
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Style.DBigBox>
                                            </Style.DBoxBody>
                                        </Style.DBody>
                                        <Style.DFooter>
                                            <Style.BotaoForm onClick={() => { this.saveTask() }}>
                                                Gravar
                                            </Style.BotaoForm>
                                        </Style.DFooter>
                                    </Style.Dados>
                                }
                            </>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}