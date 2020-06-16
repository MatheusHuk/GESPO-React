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
                project: {}
            },
            editDados: {
                title: "",
                description: "",
                percentProject: 0,
                employee: {},
                category: {},
                project: {}
            }
        }
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                if (res.data != "") {
                    await TasksService.getAllByProjectId({ id: res.data[0].id })
                        .then(async (res2) => {
                            await CategoryService.getAll()
                                .then(async (res3) => {
                                    await EmployeeService.getAllByProject({ projectId: res.data[0].id })
                                        .then(async (res4) => {
                                            this.setState({
                                                ...this.state,
                                                project: res.data[0],
                                                tasks: res2.data = "" ? [] : res2.data,
                                                selectDados: {
                                                    ...this.state.selectDados,
                                                    projects: res.data = "" ? [] : res.data,
                                                    categories: res3.data = "" ? [] : res3.data,
                                                    employees: res4.data = "" ? [] : res4.data,
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
                                <Style.Dados>
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
                                </Style.Dados>
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
                                </Style.DadosTerceiros>
                            </>
                            : this.state.showEdit ?
                                <></> : <></>}
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}