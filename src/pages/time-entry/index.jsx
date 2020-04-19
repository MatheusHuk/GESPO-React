import React, { useEffect, useState } from 'react'
import { Dropdown, Button } from 'react-bootstrap'
import Viewer from '../../Layout/Viewer'
import * as Style from './style'
import './index.css'

export default function TimeEntry({ setLoad }) {

    const [sel, setSel] = useState(false);

    useEffect(() => {
        setLoad(true);
        setLoad(false);
    }, []);

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Filtros>
                        <Style.Header>
                            Filtros
                        </Style.Header>
                        <Style.Body>
                            <Style.BoxBody>
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

                                        <Dropdown.Menu>
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

                                        <Dropdown.Menu>
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

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { setSel("1") }}>Action</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setSel("2") }}>Another action</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setSel("3") }}>Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Style.Box>
                            </Style.BoxBody>
                            <Style.Footer>
                                    <Button className="but">Filtrar</Button>
                            </Style.Footer>
                        </Style.Body>
                    </Style.Filtros>
                </Style.Container>
            </Viewer>
        </>
    );
}
