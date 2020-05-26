import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import * as ReactBootstrap from "react-bootstrap";
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';

import * as Style from './style'

export default function HoursProvisioning({ setLoad }) {

    useEffect(() => {
        setLoad(false);
    }, []);

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                       <Style.DHeader>
                            <Style.DivCreate>Filtros
                            </Style.DivCreate>
                        </Style.DHeader>
                    <Style.DBody>
                        <Style.DBoxBody>
                            <Style.DBigBox>
                                <Card.Body className="fundoForm">
                                    <Form.Group as={Col} controlId="formGridClientName">
                                        <Form.Label>Projeto</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                            <option>Selecione...</option>
                                            <option>Projeto 1</option>
                                            <option>Projeto 2</option>
                                            <option>Projeto 3</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Card.Body>
                            </Style.DBigBox>
                        </Style.DBoxBody>
                    </Style.DBody>
                    </Style.Dados>
                <Style.DadosTerceiros>
                    <Style.DHeader>
                        <Style.DivCreate>Metas
                            </Style.DivCreate>
                    </Style.DHeader>
                    <div className="tabela">
                        <ReactBootstrap.Table striped bordered hover className="table">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>%</th>
                                    <th>Estimativa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>bla</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>bla</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry the Bird</td>
                                    <td>markson </td>
                                    <td>@twitter</td>
                                    <td>bla</td>
                                </tr>
                            </tbody>
                        </ReactBootstrap.Table>
                    </div>
                </Style.DadosTerceiros>
                </Style.Container>
        </Viewer>
        </>
    );
}