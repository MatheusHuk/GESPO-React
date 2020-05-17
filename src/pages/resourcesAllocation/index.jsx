import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import {FormControl, FormGroup, FormLabel, Form, Col, Button, Card} from 'react-bootstrap';
import "./index.css"
import * as ReactBootstrap from "react-bootstrap";
import * as Style from './style'

export default function ResourcesAllocation(){
    
    return(
        <>
        
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                <div className = "divFormulario">
                    <Card >
                        <div className = "divHeader">Selecione o Projeto</div>
                        <Card.Body className = "fundoForm">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridProjeto">
                                <Form.Label>Projeto</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                <option>Selecione...</option>
                                <option>Gerente 1</option>
                                <option>Gerente 2</option>
                                <option>Gerente 3</option>
                                </Form.Control>
                                </Form.Group>
                            </Form.Row>

                        
                        </Form>     
                        </Card.Body>
                    </Card>
                </div>
                    <div>
                        <div className = "divFormulario2">
                            <Card>
                                <div className = "divHeader">Dados Alocação</div>
                                <Card.Body className = "fundoForm">
                        <Form>   

                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                <option>Selecione...</option>
                                <option>Cliente 1</option>
                                <option>Cliente 2</option>
                                <option>Cliente 3</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCCusto">
                                <Form.Label>Recurso</Form.Label>
                                <Form.Control as="select" value="Choose..." >
                                <option>Selecione...</option>
                                <option>Categoria 1</option>
                                <option>Categoria 2</option>
                                <option>Categoria 3</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCategoria">
                                <Form.Label>Time</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                <option>Selecione...</option>
                                <option>Categoria 1</option>
                                <option>Categoria 2</option>
                                <option>Categoria 3</option>
                                </Form.Control>
                                </Form.Group>

                            </Form.Row>

                            <div className = "botaoForm">
                            <Button className = "corBotao" variant="primary" type="submit">Gravar</Button>
                            </div>
                        </Form>     
                        </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className = "divFormulario3">
                    <Card>
                    <Card.Body className = "fundoForm">
                <div >
                    <h4>Recursos</h4>
                <ReactBootstrap.Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Time</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>markson </td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </ReactBootstrap.Table>
                </div>
                </Card.Body>
                </Card>
                </div>
                </Style.Dados>
                </Style.Container>
            </Viewer>

        </>
    );
}