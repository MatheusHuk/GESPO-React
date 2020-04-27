import React from 'react'
import Viewer from '../../Layout/Viewer'
import {FormControl, FormGroup, FormLabel, Form, Col, Button, Card} from 'react-bootstrap';
import "./index.css"

export default function UserRegister(){

    return(
        <>
            <Viewer>
            <div class="title">GESPO</div>
                <div class="subtitle">Cadastros/ Cadastro de Usuário </div>
                <div className = "divFormulario">
                    <Card >
                        <div className = "divHeader">Cadastrar Projeto</div>
                        <Card.Body className = "fundoForm">
                        <Form>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridUsuario">
                                <Form.Label>Nome do Usuário</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDataNascimento">
                                <Form.Label>Data Nascimento</Form.Label>
                                <Form.Control type="text" placeholder="xx/xx/xxxx" />
                                </Form.Group>

                                
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridRg">
                                <Form.Label>RG</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCpf">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                </Form.Group>

                            </Form.Row>
                            
                            <Form.Row>

                            <Form.Group as={Col} controlId="formGridCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" value="...">
                                <option>Selecione...</option>
                                <option>categoria 1</option>
                                <option>categoria 2</option>
                                <option>categoria 3</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridTime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control as="select" value="...">
                                <option>Selecione...</option>
                                <option>Time 1</option>
                                <option>Time 2</option>
                                <option>Time 3</option>
                                </Form.Control>
                                </Form.Group>
                                
                                <Form.Group as={Col} controlId="formGridTaxaHora">
                                <Form.Label>Taxa Hora</Form.Label>
                                <Form.Control type="text" placeholder="R$00,00" />
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
