import React, { useEffect, useState } from 'react'
import { Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import * as Style from './style'
import './index.css'

export default function TimeEntry({ setLoad }) {

    const [sel, setSel] = useState(false);

    const [showFiltros, setShowFiltros] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [toaster, setToaster] = useState({
        header: "Header",
        body: "Body"
    });

    const [dadosList, setDadosList] = useState([]);
    const [newDados, setNewDados] = useState({
        projeto: "",
        data: "",
        horas: "",
        minutos: "",
        gerente: "",
        obs: ""
    });

    const handleProjeto = (e) => {
        setNewDados({
            ...newDados,
            projeto: e
        });
    }

    const handleData = (e) => {
        setNewDados({
            ...newDados,
            data: e.target.value
        });
    }

    const handleHoras = (e) => {
        setNewDados({
            ...newDados,
            horas: e.target.value
        });
    }

    const handleMinutos = (e) => {
        setNewDados({
            ...newDados,
            minutos: e.target.value
        });
    }

    const handleGerente = (e) => {
        setNewDados({
            ...newDados,
            gerente: e.target.value
        });
    }

    const handleObs = (e) => {
        setNewDados({
            ...newDados,
            obs: e.target.value
        });
    }

    const addDados = () => {
        if (newDados.projeto == "" || newDados.data == "" || newDados.horas == "" || newDados.minutos == "" || newDados.gerente == "" || newDados.obs == "") {
            setToaster({
                header: "Erro",
                body: "Os dados estão incompletos"
            });
            setShowToaster(true);
            return
        }
        let list = dadosList;
        list.push(newDados);
        console.log("LIST: ", list);
        setDadosList(list);
        console.log("New dados 0: ",dadosList);
    }

    useEffect(() => {
        console.log("New dados: ",dadosList);
    }, [dadosList])

    const [dados, setDados] = useState(
        [
            {
                projeto: "A",
                obs: "fdfdfdf",
                data: "0101/2020",
                horas: "00:00"
            },
        ]
    );

    useEffect(() => {
        setLoad(true);
        setLoad(false);
    }, []);

    return (
        <>
            <Viewer>
                <Toaster
                    show={showToaster}
                    setShowToaster={(sit) => { setShowToaster(sit) }}
                    header={toaster.header}
                    body={toaster.body}
                />
                {showFiltros ?
                    <Style.Container selected={showFiltros}>
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
                                                    sel ? sel : "Select"
                                                }
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="drop-down-menu">
                                                <Dropdown.Item onClick={() => { setSel("1") }}>Action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setSel("2") }}>Another action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setSel("3") }}>Something else</Dropdown.Item>
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
                                                    sel ? sel : "Select"
                                                }
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="drop-down-menu">
                                                <Dropdown.Item onClick={() => { setSel("1") }}>Action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setSel("2") }}>Another action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setSel("3") }}>Something else</Dropdown.Item>
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
                                                    sel ? sel : "Select"
                                                }
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="drop-down-menu">
                                                <Dropdown.Item onClick={() => { setSel("1") }}>Action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setSel("2") }}>Another action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setSel("3") }}>Something else</Dropdown.Item>
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
                                        dados.map((data, i) => {
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
                                                    newDados.projeto ? newDados.projeto : "Selecione"
                                                }
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="drop-down-menu">
                                                <Dropdown.Item onClick={() => { handleProjeto("P1") }}>Action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleProjeto("P2") }}>Another action</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleProjeto("P3") }}>Something else</Dropdown.Item>
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
                                                onChange={(event) => { handleData(event) }}
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
                                                onChange={(event) => { handleHoras(event) }}
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
                                                onChange={(event) => { handleMinutos(event) }}
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
                                                onChange={(event) => { handleGerente(event) }}
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
                                                onChange={(event) => { handleObs(event) }}
                                            />
                                        </InputGroup>
                                    </Style.DBigBox>
                                </Style.DBoxBody>
                            </Style.DBody>
                            <Style.DFooter>
                                <Button className="but" onClick={() => { addDados() }}>Adicionar</Button>
                                <Button className="but" disabled={true} >Gravar tudo</Button>
                            </Style.DFooter>
                        </Style.Dados>
                        <Style.ApontamentoSmall>
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
                                        dadosList.map((data, i) => {
                                            return (
                                                <Style.Tr key={i}>
                                                    <Style.Td>{data.projeto}</Style.Td>
                                                    <Style.Td>{data.obs}</Style.Td>
                                                    <Style.Td>{data.data}</Style.Td>
                                                    <Style.Td>{data.horas}</Style.Td>
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
