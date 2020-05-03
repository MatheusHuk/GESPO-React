import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import {FormControl, FormGroup, FormLabel, Form, Col, Button, Card} from 'react-bootstrap';
import "./index.css"

export default function ResourcesAllocation(){
    
    return(
        <>
        
            <Viewer>
            <div class="title">GESPO</div>
                <div class="subtitle">Cadastros/ Cadastro de Projeto </div>
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
            </Viewer>

        </>
    );
}