import React from 'react'
import { Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import * as Style from './style'
import './index.css'

export default class TimeEntry extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            sel: false,
            showFiltros: false,
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
            dados: [
                {
                    projeto: "A",
                    obs: "fdfdfdf",
                    data: "0101/2020",
                    horas: "00:00"
                },
            ]
        }
    }

    handleProjeto(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                projeto: e
            }
        });
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

    handleGerente(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                gerente: e.target.value
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
        console.log("LIST: ", list);
        this.setState({
            ...this.state,
            dadosList: list
        }
        );
    }

    componentWillMount() {
        this.props.setLoad(true);
    }

    componentDidMount() {
        this.props.setLoad(false);
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
                    {this.state.showFiltros ?
                        <Style.Container selected={this.state.showFiltros}>
                            <Style.Filtros>
                                <Style.FHeader>Filtros</Style.FHeader>
                                <Style.FBody>
                                    <Style.FBoxBody>
                                        <Style.Box>
                                            <Style.BoxHeader>
                                                Time
                                        </Style.BoxHeader>
                                            <Dropdown>
                                                <Dropdown.Toggle className="drop-down">
                                                    {
                                                        this.state.sel ? this.state.sel : "Select"
                                                    }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="drop-down-menu">
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "1" }) }}>Action</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "2" }) }}>Another action</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "3" }) }}>Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Style.Box>
                                        <Style.Box>
                                            <Style.BoxHeader>
                                                Centro de Custo
                                        </Style.BoxHeader>
                                            <Dropdown>
                                                <Dropdown.Toggle className="drop-down">
                                                    {
                                                        this.state.sel ? this.state.sel : "Select"
                                                    }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="drop-down-menu">
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "1" }) }}>Action</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "2" }) }}>Another action</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "3" }) }}>Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Style.Box>
                                        <Style.Box>
                                            <Style.BoxHeader>
                                                Projeto
                                        </Style.BoxHeader>
                                            <Dropdown>
                                                <Dropdown.Toggle className="drop-down">
                                                    {
                                                        this.state.sel ? this.state.sel : "Select"
                                                    }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="drop-down-menu">
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "1" }) }}>Action</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "2" }) }}>Another action</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.state.setState({ ...this.state, sel: "3" }) }}>Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Style.Box>
                                    </Style.FBoxBody>
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
                                                        <Style.Td key={i}>{data.projeto}</Style.Td>
                                                        <Style.Td key={i}>{data.obs}</Style.Td>
                                                        <Style.Td key={i}>{data.data}</Style.Td>
                                                        <Style.Td key={i}>{data.horas}</Style.Td>
                                                        <Style.TDSmall>*ícones*</Style.TDSmall>
                                                    </Style.Tr>
                                                )
                                            })
                                        }
                                    </Style.TData>
                                </Style.Table>
                            </Style.Apontamento>
                        </Style.Container>
                        :
                        <Style.Container>
                            <Style.Dados>
                                <Style.DHeader>Novo Apontamento</Style.DHeader>
                                <Style.DBody>
                                    <Style.DBoxBody>
                                        <Style.DBigBox>
                                            <Style.BoxHeader>
                                                Projeto
                                        </Style.BoxHeader>
                                            <Dropdown>
                                                <Dropdown.Toggle className="drop-down">
                                                    {
                                                        this.state.newDados.projeto ? this.state.newDados.projeto : "Selecione"
                                                    }
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="drop-down-menu">
                                                    <Dropdown.Item onClick={() => { this.handleProjeto("Projeto 1") }}>Projeto 1</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.handleProjeto("Projeto 2") }}>Projeto 2</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.handleProjeto("Projeto 3") }}>Projeto 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Style.DBigBox>
                                    </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBox>
                                            <Style.BoxHeader>
                                                Data
                                        </Style.BoxHeader>
                                            <InputGroup className="text-box">
                                                <FormControl
                                                    id="log"
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    type="date"
                                                    onChange={(event) => { this.handleData(event) }}
                                                />
                                            </InputGroup>
                                        </Style.DBox>
                                        <Style.DSmallBox>
                                            <Style.BoxHeader>
                                                Horas
                                    </Style.BoxHeader>
                                            <InputGroup className="text-box">
                                                <FormControl
                                                    id="log"
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    type="number"
                                                    onChange={(event) => { this.handleHoras(event) }}
                                                />
                                            </InputGroup>
                                        </Style.DSmallBox>
                                        <Style.DSmallBox>
                                            <Style.BoxHeader>
                                                Minutos
                                    </Style.BoxHeader>
                                            <InputGroup className="text-box">
                                                <FormControl
                                                    id="log"
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    type="text"
                                                    onChange={(event) => { this.handleMinutos(event) }}
                                                />
                                            </InputGroup>
                                        </Style.DSmallBox>
                                        <Style.DBox>
                                            <Style.BoxHeader>
                                                Gerente do Projeto
                                    </Style.BoxHeader>
                                            <InputGroup className="text-box">
                                                <FormControl
                                                    id="log"
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    type="text"
                                                    onChange={(event) => { this.handleGerente(event) }}
                                                />
                                            </InputGroup>
                                        </Style.DBox>
                                    </Style.DBoxBody>
                                    <Style.DBoxBody>
                                        <Style.DBigBox>
                                            <Style.BoxHeader>
                                                Observações
                                    </Style.BoxHeader>
                                            <InputGroup className="text-box">
                                                <FormControl
                                                    id="log"
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    type="text"
                                                    onChange={(event) => { this.handleObs(event) }}
                                                />
                                            </InputGroup>
                                        </Style.DBigBox>
                                    </Style.DBoxBody>
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
                        </Style.Container>
                    }
                </Viewer>
            </>
        );
    }
}
