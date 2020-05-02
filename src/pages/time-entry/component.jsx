import React from 'react'
import { Dropdown, Button, InputGroup, FormControl, Col, Form } from 'react-bootstrap'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import * as Style from './style'
import TimeEntryService from '../../services/timeEntryService'
import './index.css'

export default class TimeEntry extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            sel: false,
            showFiltros: true,
            showToaster: false,
            toaster: {
                header: "Header",
                body: "Body"
            },
            dadosList: [],
            newDados: {
                projeto: "",
                data: "",
                horas: "",
                minutos: "",
                gerente: "",
                obs: ""
            },
            selectDados: {
                projetos: [
                    {
                        nome: "1",
                        gerente: "A"
                    },
                    {
                        nome: "2",
                        gerente: "B"
                    }
                ]
            },
            dados: []
        }
    }

    componentDidMount() {
        this.props.setLoad(true);
        TimeEntryService.getAllByUser([["id", this.props.logged.id]])
            .then(res => {
                console.log("Resposta: ", res);
                this.state.dados = res.data == "" ? [] : res.data;
            })
            .catch(error => {
                console.log('Error: ', error);
            })
            .finally(() => {
                this.props.setLoad(false);
            })
    }

    componentDidUpdate() {
        console.log('State: ', this.state.newDados);
    }

    handleProjeto(e) {
        if (e.target.value < 0) {
            this.setState({
                ...this.state,
                newDados: {
                    ...this.state.newDados,
                    projeto: "",
                    gerente: ""
                }
            });
        } else {
            this.setState({
                ...this.state,
                newDados: {
                    ...this.state.newDados,
                    projeto: this.state.selectDados.projetos[e.target.value].nome,
                    gerente: this.state.selectDados.projetos[e.target.value].gerente
                }
            });
        }
    }

    handleData(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                data: e.target.value
            }
        });
    }

    handleHoras(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                horas: e.target.value
            }
        });
    }

    handleMinutos(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                minutos: e.target.value
            }
        });
    }

    handleObs(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                obs: e.target.value
            }
        });
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

    addDados() {
        if (this.state.newDados.projeto == "" || this.state.newDados.data == "" || this.state.newDados.horas == "" || this.state.newDados.minutos == "" || this.state.newDados.gerente == "" || this.state.newDados.obs == "") {
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
        }
        );
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
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Gerente 1</option>
                                                        <option>Gerente 2</option>
                                                        <option>Gerente 3</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formFuncionario">
                                                    <Form.Label>Funcionário</Form.Label>
                                                    <Form.Control type="text" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formData">
                                                    <Form.Label>Data</Form.Label>
                                                    <Form.Control type="date" />
                                                </Form.Group>

                                            </Form.Row>
                                        </Form>
                                    </Style.FBody>
                                    <Style.FFooter>
                                        <Button className="but">Filtrar</Button>
                                    </Style.FFooter>
                                </Style.Filtros>
                                <Style.Apontamento>
                                    <Style.AHeader>Apontamentos</Style.AHeader>
                                    <Style.Table>
                                        <Style.THeader>
                                            <Style.TRHeader>
                                                <Style.Th>Projeto</Style.Th>
                                                <Style.Th>Observações</Style.Th>
                                                <Style.Th>Data</Style.Th>
                                                <Style.Th>Horas</Style.Th>
                                                <Style.THSmall>Ações</Style.THSmall>
                                            </Style.TRHeader>
                                        </Style.THeader>
                                        <Style.TData>
                                            {
                                                this.state.dados.map((data, i) => {
                                                    return (
                                                        <Style.Tr>
                                                            <Style.Td key={i}>{data.project.name}</Style.Td>
                                                            <Style.Td key={i}>{data.dsWork}</Style.Td>
                                                            <Style.Td key={i}>{data.date || ""}</Style.Td>
                                                            <Style.Td key={i}>{this.decryptHours(data.amountHours)}</Style.Td>
                                                            <Style.TDSmall>*ícones*</Style.TDSmall>
                                                        </Style.Tr>
                                                    )
                                                })
                                            }
                                        </Style.TData>
                                    </Style.Table>
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
                                                                    <option value={i} key={i}>{value.nome}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
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
                                                    <Form.Control size="sm" type="text" value={this.state.newDados.gerente} readOnly />
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
                                        <Button className="but" disabled={this.state.dadosList.length == 0} >Gravar tudo</Button>
                                    </Style.DFooter>
                                </Style.Dados>
                                <Style.ApontamentoSmall>
                                    <Style.AHeader>Apontamentos</Style.AHeader>
                                    <Style.Table size={1}>
                                        <Style.THeader>
                                            <Style.TRHeader>
                                                <Style.Th>Projeto</Style.Th>
                                                <Style.Th>Observações</Style.Th>
                                                <Style.Th>Data</Style.Th>
                                                <Style.Th>Horas</Style.Th>
                                                <Style.THSmall>Ações</Style.THSmall>
                                            </Style.TRHeader>
                                        </Style.THeader>
                                        <Style.TData>
                                            {
                                                this.state.dadosList.map((data, i) => {
                                                    return (
                                                        <Style.Tr key={i}>
                                                            <Style.Td>{data.projeto}</Style.Td>
                                                            <Style.Td>{data.obs}</Style.Td>
                                                            <Style.Td>{data.data}</Style.Td>
                                                            <Style.Td>{data.horas}:{data.minutos}</Style.Td>
                                                            <Style.TDSmall>*ícones*</Style.TDSmall>
                                                        </Style.Tr>
                                                    )
                                                })
                                            }
                                        </Style.TData>
                                    </Style.Table>
                                </Style.ApontamentoSmall>
                            </Style.MainContainer>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}
