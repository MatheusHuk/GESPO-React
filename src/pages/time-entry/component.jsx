import React from 'react'
import FA from 'react-fontawesome'
import { Button, Col, Form, Table } from 'react-bootstrap'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import * as Style from './style'
import TimeEntryService from '../../services/timeEntryService'
import ProjectService from '../../services/projectService'
import EmployeeService from '../../services/employeeService'
import './index.css'

export default class TimeEntry extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            showFiltros: true,
            showToaster: false,
            toaster: {
                header: "Header",
                body: "Body"
            },
            filtros: {
                project: null,
                funcionario: null,
                data: null
            },
            dadosList: [],
            aux: {
                horas: 0,
                minutos: 0
            },
            newDados: {
                employee: this.props.logged,
                project: null,
                date: null,
                amountHours: 0,
                dsWork: null
            },
            selectDados: {
                projetos: [],
                funcionarios: [
                    {
                        id: 1,
                        name: "Matheus Huk Moreschi"
                    },
                    {
                        id: 2,
                        name: "Petter Gabriel Mene"
                    },
                    {
                        id: 3,
                        name: "Marco Antonio Morais Rover"
                    },
                    {
                        id: 4,
                        name: "Victor Ishizawa Massao"
                    },
                    {
                        id: 5,
                        name: "Bruno Almeida dos Santos"
                    },
                    {
                        id: 6,
                        name: "Lucas Abreu de Carvalho"
                    }
                ]
            },
            dados: []
        }
    }

    async componentDidMount() {
        this.props.setLoad(true);
        await TimeEntryService.getAllByUser({ "employeeId": this.props.logged.id })
            .then(async (res) => {
                await ProjectService.getAllByEmployeeId(this.props.logged.id)
                    .then(res2 => {
                        console.log("RES2: ", res2.data);
                        this.setState({
                            ...this.state,
                            dados: res.data == "" ? [] : res.data,
                            selectDados: {
                                ...this.state.selectDados,
                                projetos: res2.data == "" ? [] : res2.data,
                                funcionarios: [this.props.logged]
                            },
                            newDados: {
                                ...this.state.newDados,
                                employee: this.props.logged
                            },
                            filtros: {
                                ...this.state.filtros,
                                project: res2.data == "" ? null : res2.data[0]
                            }
                        })
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    })
            })
            .catch(error => {
                console.log('Error: ', error);
            })
            .finally(() => {
                this.props.setLoad(false);
            })
        /* if (this.props.logged.permission.id != 1) {
             this.state.selectDados.funcionarios = [this.props.logged];
             this.setState({
                 ...this.state,
                 newDados: {
                     ...this.state.newDados,
                     employee: this.props.logged
                 }
 
             });
         } */
        //this.props.setLoad(false);
    }

    componentDidUpdate() {
        console.log('State: ', this.state.newDados);
        console.log('State.dadosList: ', this.state.dadosList);
    }

    handleProjeto(e) {
        let value = parseInt(e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                project: this.state.selectDados.projetos[value < 0 ? -1 : value]
            }
        });
    }

    handleFuncionario(e) {
        let value = parseInt(e.target.value)
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                employee: this.state.selectDados.funcionarios[value < 0 ? -1 : value]
            }
        });
    }

    handleData(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                date: e.target.value
            }
        });
    }

    handleHoras(e) {
        let value = parseInt(e.target.value);
        this.setState({
            ...this.state,
            aux: {
                ...this.state.aux,
                horas: value,
            },
            newDados: {
                ...this.state.newDados,
                amountHours: (value + (this.state.aux.minutos * 1 / 60))
            }
        })
    }

    handleMinutos(e) {
        let value = parseInt(e.target.value);
        this.setState({
            ...this.state,
            aux: {
                ...this.state.aux,
                minutos: value,
            },
            newDados: {
                ...this.state.newDados,
                amountHours: (this.state.aux.horas + (value * 1 / 60))
            }
        })
    }

    handleObs(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                dsWork: e.target.value
            }
        });
    }

    handleProjetoFiltro(e) {
        let value = parseInt(e.target.value);
        this.setState({
            ...this.state,
            filtros: {
                ...this.state.filtros,
                project: this.state.selectDados.projetos[value < 0 ? -1 : value]
            }
        })
    }

    handleFuncionarioFiltro(e) {
        let value = parseInt(e.target.value);
        this.setState({
            ...this.state,
            filtros: {
                ...this.state.filtros,
                funcionario: this.state.selectDados.funcionarios[value < 0 ? -1 : value]
            }
        })
    }

    handleDataFiltro(e) {
        this.setState({
            ...this.state,
            filtros: {
                ...this.state.filtros,
                data: e.target.value ? e.target.value : null
            }
        })
    }

    decryptHours(obj) {
        var decimalTime = parseFloat(obj);
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        var seconds = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ":" + minutes;
    }

    formatLongText(text) {
        return text.length > 20 ? text.substring(0, 17) + "..." : text;
    }

    parseDate(date) {
        let d = new Date(parseInt(date));
        return (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear())
    }

    deleteEntry(key) {
        console.log("DeleteEntry: ", key)
        let list = this.state.dadosList;
        for (let i = key; i < list.length - 1; i++) {
            list[i] = list[i + 1]
        }
        list.pop();
        this.setState({
            ...this.state,
            dadosList: list
        })
    }

    async filterDados() {
        console.log("Filt: ", this.state.filtros)
        this.props.setLoad(true)
        let filter = {
            ...this.state.filtros
        }
        await TimeEntryService.filterEntries({
            projectId: filter.project.id,
            employeeId: filter.funcionario ? filter.funcionario.id : null,
            date: filter.data
        })
            .then((resF) => {
                console.log("ResF: ", resF)
                this.setState({
                    ...this.state,
                    dados: resF.data == "" ? [] : resF.data
                })
            })
            .catch(error => {
                console.log("E: ", error)
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    addDados() {
        if (!this.state.newDados.employee || !this.state.newDados.project || !this.state.newDados.date || this.state.newDados.amountHours == 0) {
            this.setState({
                ...this.state,
                toaster: {
                    header: "Erro",
                    body: "Os dados estão incompletos"
                },
                showToaster: true
            });
            return
        }
        let list = this.state.dadosList;
        list.push(this.state.newDados);
        this.setState({
            ...this.state,
            dadosList: list
        });
    }

    async saveDados() {
        this.props.setLoad(true);
        await TimeEntryService.writeNewDados(this.state.dadosList)
            .then(async (res) => {
                await TimeEntryService.getAllByUser({ "employeeId": this.props.logged.id })
                    .then(res => {
                        this.setState({
                            ...this.state,
                            dados: res.data == "" ? [] : res.data,
                            toaster: {
                                header: "Sucesso",
                                body: "Dados gravados com sucesso"
                            },
                            showToaster: true,
                            showFiltros: true
                        })
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    })
                    .finally(() => {
                        this.props.setLoad(false);
                    })
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    toaster: {
                        header: "Erro",
                        body: "Algo deu errado"
                    },
                    showToaster: true
                })
            })
            .finally(() => {
                this.props.setLoad(false);
            })
        console.log("Grava dados: ", this.state.dadosList);
    }

    render() {
        return (
            <>
                <Viewer setLoad={this.props.setLoad}>
                    <Toaster
                        show={this.state.showToaster}
                        setShowToaster={(sit) => { this.setState({ ...this.state, showToaster: sit }); }}
                        header={this.state.toaster.header}
                        body={this.state.toaster.body}
                    />
                    <Style.Container>
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showFiltros}
                                onClick={() => { this.setState({ ...this.state, showFiltros: true }) }}
                            >
                                <p>Apontamentos</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showFiltros}
                                onClick={() => { this.setState({ ...this.state, showFiltros: false }) }}
                            >
                                <p>Novo Apontamento</p>
                            </Style.HeaderButton>
                        </Style.HeaderContainer>
                        {this.state.showFiltros ?
                            <Style.MainContainer>
                                <Style.Filtros>
                                    <Style.FHeader>Filtros</Style.FHeader>
                                    <Style.FBody>
                                        <Form className="formulario">
                                            <Form.Row className="formulario-row-center">
                                                <Form.Group as={Col} controlId="formProjeto">
                                                    <Form.Label>Projeto</Form.Label>
                                                    <Form.Control as="select" onChange={(event) => { this.handleProjetoFiltro(event) }}>
                                                        {
                                                            this.state.selectDados.projetos.map((value, i) => {
                                                                return (
                                                                    <option value={i} key={i}>{value.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formFuncionario">
                                                    <Form.Label>Funcionário</Form.Label>
                                                    {
                                                        this.props.logged.permission.id == 1 ?
                                                            <Form.Control as="select" onChange={(event) => { this.handleFuncionarioFiltro(event) }}>
                                                                <option value={-1} key={-1} >Todos</option>
                                                                {
                                                                    this.state.selectDados.funcionarios.map((val, i) => {
                                                                        return (
                                                                            <>
                                                                                <option value={i} key={i}>{val.name}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control> :
                                                            <Form.Control type="text" value={this.props.logged.name} readOnly />
                                                    }
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formData">
                                                    <Form.Label>Data</Form.Label>
                                                    <Form.Control type="date" onChange={(event) => { this.handleDataFiltro(event) }} />
                                                </Form.Group>

                                            </Form.Row>
                                        </Form>
                                    </Style.FBody>
                                    <Style.FFooter>
                                        <Button className="but" onClick={() => { this.filterDados() }}>Filtrar</Button>
                                    </Style.FFooter>
                                </Style.Filtros>
                                <Style.Apontamento>
                                    <Style.AHeader>Apontamentos</Style.AHeader>
                                    <Style.TableDiv>
                                        <Table striped bordered hover className="table">
                                            <thead>
                                                <tr>
                                                    <th>Funcionário</th>
                                                    <th>Projeto</th>
                                                    <th>Data</th>
                                                    <th>Horas</th>
                                                    <th>Observações</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.dados.map((data, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{this.formatLongText(data.employee.name)}</td>
                                                                <td>{data.project.name}</td>
                                                                <td>{this.parseDate(data.creationDate)}</td>
                                                                <td>{this.decryptHours(data.amountHours)}</td>
                                                                <td>{this.formatLongText(data.dsWork)}</td>
                                                                <td><Style.Icone><FA name="ban" /></Style.Icone></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Style.TableDiv>
                                </Style.Apontamento>
                            </Style.MainContainer>
                            :
                            <Style.MainContainer>
                                <Style.Dados>
                                    <Style.DHeader>Novo Apontamento</Style.DHeader>
                                    <Style.DBody>
                                        <Form className="formulario">
                                            <Form.Row className="formulario-row">
                                                <Form.Group as={Col} controlId="formProjeto">
                                                    <Form.Label>Projeto</Form.Label>
                                                    <Form.Control size="sm" as="select" onChange={(event) => { this.handleProjeto(event) }}>
                                                        <option value="-1" >Selecione...</option>
                                                        {
                                                            this.state.selectDados.projetos.map((value, i) => {
                                                                return (
                                                                    <option value={i} key={i}>{value.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formProjeto">
                                                    <Form.Label>Funcionário</Form.Label>
                                                    {
                                                        /*this.props.logged.permission.id == 1 ?
                                                            <Form.Control size="sm" as="select" onChange={(event) => { this.handleFuncionario(event) }}>
                                                                <option value="-1" >Selecione...</option>
                                                                {
                                                                    this.state.selectDados.funcionarios.map((value, i) => {
                                                                        return (
                                                                            <option value={i} key={i}>{value.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control> : */
                                                        <Form.Control size="sm" type="text" value={this.props.logged.name} readOnly />
                                                    }
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formData">
                                                    <Form.Label>Data</Form.Label>
                                                    <Form.Control size="sm" type="date" onChange={(event) => { this.handleData(event) }} />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formHoras">
                                                    <Form.Label>Horas</Form.Label>
                                                    <Form.Control size="sm" type="number" onChange={(event) => { this.handleHoras(event) }} />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formMinutos">
                                                    <Form.Label>Minutos</Form.Label>
                                                    <Form.Control size="sm" type="number" onChange={(event) => { this.handleMinutos(event) }} />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGerente">
                                                    <Form.Label>Gerente</Form.Label>
                                                    <Form.Control size="sm" type="text" value={this.state.newDados.project ? this.state.newDados.project.manager : ""} readOnly />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formObs">
                                                    <Form.Label>Observações</Form.Label>
                                                    <Form.Control size="sm" type="text" onChange={(event) => { this.handleObs(event) }} />
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Button className="but" onClick={() => { this.addDados() }}>Adicionar</Button>
                                        <Button className="but" onClick={() => { this.saveDados() }} disabled={this.state.dadosList.length == 0} >Gravar tudo</Button>
                                    </Style.DFooter>
                                </Style.Dados>
                                <Style.ApontamentoSmall>
                                    <Style.AHeader>Apontamentos</Style.AHeader>
                                    <Style.TableDiv size={1}>
                                        <Table striped bordered hover className="table">
                                            <thead>
                                                <tr>
                                                    <th>Funcionário</th>
                                                    <th>Projeto</th>
                                                    <th>Data</th>
                                                    <th>Horas</th>
                                                    <th>Observações</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.dadosList.map((data, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{this.formatLongText(data.employee.name)}</td>
                                                                <td>{data.project.name}</td>
                                                                <td>{data.date}</td>
                                                                <td>{this.decryptHours(data.amountHours)}</td>
                                                                <td>{this.formatLongText(data.dsWork)}</td>
                                                                <td><Style.Icone onClick={() => { this.deleteEntry(i) }}><FA name="ban" /></Style.Icone></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Style.TableDiv>
                                </Style.ApontamentoSmall>
                            </Style.MainContainer>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}
