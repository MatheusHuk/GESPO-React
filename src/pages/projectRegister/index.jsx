import React from 'react'
import Viewer from '../../Layout/Viewer'
import {FormControl, FormGroup, FormLabel, Form, Col, Button, Card} from 'react-bootstrap';
import "./index.css"

export default function ProjectRegister(){

    return(
        <>
            <Viewer>
            <div class="title">GESPO</div>
                <div class="subtitle">Cadastros/ Cadastro de Projeto </div>
                <div className = "divFormulario">
                    <Card >
                        <div className = "divHeader">Cadastrar Projeto</div>
                        <Card.Body className = "fundoForm">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridProjeto">
                                <Form.Label>Nome do Projeto</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridGerente">
                                <Form.Label>Gerente Responsável</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                <option>Selecione...</option>
                                <option>Gerente 1</option>
                                <option>Gerente 2</option>
                                <option>Gerente 3</option>
                                </Form.Control>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                <option>Selecione...</option>
                                <option>Cliente 1</option>
                                <option>Cliente 2</option>
                                <option>Cliente 3</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCCusto">
                                <Form.Label>Centro de Custo</Form.Label>
                                <Form.Control type="text" placeholder="Automático" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                <option>Selecione...</option>
                                <option>Categoria 1</option>
                                <option>Categoria 2</option>
                                <option>Categoria 3</option>
                                </Form.Control>
                                </Form.Group>

                            </Form.Row>
                            
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridObservação">
                                <Form.Label>Observação</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                </Form.Group>

                            </Form.Row>
                            <div className = "botaoForm">
                            <Button className = "corBotao" variant="primary" type="submit">Gravar</Button>
                            </div>
                        </Form>     
                        </Card.Body>
                    </Card>
                </div>
            </Viewer>
        </>
    );
}
