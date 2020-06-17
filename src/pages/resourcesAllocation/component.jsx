import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as ReactBootstrap from "react-bootstrap";
import * as Style from './style'
import FA from 'react-fontawesome'
import ProjectService from '../../services/projectService'
import EmployeeService from '../../services/employeeService'

export default class ResourcesAllocation extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            invalid: {
                show: false,
                message: ""
            },
            showFiltros: true,
            showEdit: false,
            showToaster: false,
            toaster: {
                header: "",
                body: "",
            },
            project: {},
            resource: {},
            alocations: [],
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
        await this.mount()
        this.props.setLoad(false);
        this.props.setShowMenu(true);
    }

    async mount(){
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
                            this.setState({
                                ...this.state,
                                showToaster: true,
                                toaster: {
                                    header: "Erro",
                                    body: "Erro interno do Servidor"
                                }
                            })
                        })
                    await EmployeeService.getAllByProject({
                        projectId: res.data[0].id
                    })
                        .then(async (res3) => {
                            this.setState({
                                ...this.state,
                                alocations: res3.data == "" ? [] : res3.data
                            })
                        })
                        .catch(error => {
                            this.setState({
                                ...this.state,
                                showToaster: true,
                                toaster: {
                                    header: "Erro",
                                    body: "Erro interno do Servidor"
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
                        body: "Erro interno do Servidor"
                    }
                })
            })
    }

    async alocate(){
        this.props.setLoad(true)
        await ProjectService.addAllocation({
            employeeId: this.state.resource.id,
            projectId: this.state.project.id
        }, true)
            .then(async (res) => {
                await this.mount()
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster:{
                        header: "Sucesso",
                        body: "Recurso Alocado"
                    }
                })
            })
            .catch(error => {
               console.log("Add Al: ",error) 
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    async deallocate(id){
        this.props.setLoad(true)
        await ProjectService.removeAllocation({
            employeeId: id,
            projectId: this.state.project.id
        })
            .then(async (res) => {
                await this.mount()
                this.setState({
                    ...this.state,
                    showToaster: true,
                    toaster:{
                        header: "Sucesso",
                        body: "Recurso Desalocado"
                    }
                })
            })
            .catch(error => {
               console.log("Rem Al: ",error) 
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
                                        <Style.BotaoForm onClick={() => { this.alocate() }}>
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
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.alocations.map((data, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{data.employee.name}</td>
                                                                <td>{data.employee.category.dsCategory}</td>
                                                                <td>{data.employee.team.name}</td>
                                                                <td><Style.Icone onClick={() => { this.deallocate(data.employee.id) }}><FA name="ban" /></Style.Icone></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </ReactBootstrap.Table>
                                    </Style.TableDiv>
                                </Style.DadosTerceiros>
                            </>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}