import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as ReactBootstrap from "react-bootstrap";
import * as Style from './style'

export default class ResourcesAllocation extends React.Component {


    render() {

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
                        <Style.DadosDois>
                            <Style.DHeader>
                                <Style.DivCreate>Dados Alocação
                            </Style.DivCreate>
                            </Style.DHeader>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">

                                        <Form.Group as={Col} controlId="formGridCategory">
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Selecione...</option>
                                                <option>Categoria 1</option>
                                                <option>Categoria 2</option>
                                                <option>Categoria 3</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridResource">
                                            <Form.Label>Recurso</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Selecione...</option>
                                                <option>Time 1</option>
                                                <option>Time 2</option>
                                                <option>Time 3</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCategory">
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control type="text" placeholder="Automatico" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
                            <Style.DFooter>
                                <Style.BotaoForm>
                                    Gravar
                            </Style.BotaoForm>
                                <Style.BotaoForm>
                                    Deletar
                            </Style.BotaoForm>
                            </Style.DFooter>
                        </Style.DadosDois>
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
}