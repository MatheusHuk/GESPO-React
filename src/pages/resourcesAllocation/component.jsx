import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as ReactBootstrap from "react-bootstrap";
import * as Style from './style'
import ProjectService from '../../services/projectService'
import EmployeeService from '../../services/employeeService'

export default class ResourcesAllocation extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            showFiltros: true,
            showEdit: false,
            showToaster: false,
            toaster: {
                header: "",
                body: "",
            },
            project: {},
            resource: {},
            selectDados: {
                projects: [],
                resources: []
            }
        }
    }

    componentDidUpdate() {
        console.log("Res Upd: ", this.state.resource)
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                if (res.data.length > 0) {
                    await EmployeeService.distinctProject({
                        projectId: res.data[0].id
                    })
                        .then(async (res2) => {
                            this.setState({
                                ...this.state,
                                project: res.data == "" ? {} : res.data[0],
                                resource: res2.data == "" ? {} : res2.data[0],
                                selectDados: {
                                    ...this.state.selectDados,
                                    projects: res.data == "" ? [] : res.data,
                                    resources: res2.data == "" ? [] : res2.data
                                }
                            })
                        })
                        .catch(error => {
                            console.log("Dist pro: " + error)
                        })
                }
            })
            .catch(error => {
                console.log("Res a error: ", error)
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    handleProject(e) {
        let value = e.target.value;
        let res = this.state.selectDados.projects.find(v => v.id == value)
        this.setState({
            ...this.state,
            project: res
        })
    }

    handleResource(e) {
        let value = e.target.value;
        let res = this.state.selectDados.resources.find(v => v.id == value)
        this.setState({
            ...this.state,
            resource: res
        })
    }

    render() {
        return (
            <>
                <Viewer>
                    <Style.Container>
                        <Style.Dados>
                            <Style.DHeader>
                                <Style.DivCreate>Filtros</Style.DivCreate>
                            </Style.DHeader>
                            <Style.DBoxBody>
                                <Style.DBigBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridClientName">
                                            <Form.Label>Projeto</Form.Label>
                                            <Form.Control as="select"
                                                defaultValue={this.state.project}
                                                onChange={(event) => { this.handleProject(event) }}>
                                                {
                                                    this.state.selectDados.projects.map((value, i) => {
                                                        return (
                                                            <option value={value.id}>{value.name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBigBox>
                            </Style.DBoxBody>
                            <Style.DFooter>
                                <Style.BotaoForm>
                                    Filtrar
                                </Style.BotaoForm>
                            </Style.DFooter>
                        </Style.Dados>
                        <Style.DadosDois>
                            <Style.DHeader>
                                <Style.DivCreate>Dados Alocação</Style.DivCreate>
                            </Style.DHeader>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCategory">
                                            <Form.Label>Recurso</Form.Label>
                                            <Form.Control as="select"
                                                defaultValue={-1}
                                                onChange={(event) => { this.handleResource(event) }}>
                                                {
                                                    this.state.selectDados.resources.map((value, i) => {
                                                        return (
                                                            <option value={value.id}>{value.name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                                {
                                    this.state.resource.category ?
                                        <>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResource">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" value={this.state.resource.category.dsCategory} readOnly />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Time</Form.Label>
                                                        <Form.Control type="text" value={this.state.resource.team.name} readOnly />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBox>
                                        </> : null
                                }

                            </Style.DBoxBody>
                            <Style.DFooter>
                                <Style.BotaoForm disabled={!this.state.resource}>
                                    Alocar
                                </Style.BotaoForm>
                            </Style.DFooter>
                        </Style.DadosDois>
                        <Style.DadosTerceiros>
                            <Style.DHeader>
                                <Style.DivCreate>Alocações - {this.state.project.name}</Style.DivCreate>
                            </Style.DHeader>
                            <Style.TableDiv>
                                <ReactBootstrap.Table striped bordered hover className="table">
                                    <thead>
                                        <tr>
                                            <th>Recurso</th>
                                            <th>Categoria</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Larry the Bird</td>
                                            <td>markson </td>
                                        </tr>
                                    </tbody>
                                </ReactBootstrap.Table>
                            </Style.TableDiv>
                        </Style.DadosTerceiros>
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}