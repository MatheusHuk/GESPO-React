import React from 'react'
import Viewer from '../../Layout/Viewer'
import {FormControl, FormGroup, FormLabel, Form, Col, Button, Card} from 'react-bootstrap';
import "./index.css"

export default function CustCenterRegister(){

    return(
        <>
            <Viewer>
            <div class="title">GESPO</div>
                <div class="subtitle">Cadastros/ Cadastros de Centro de Custo </div>
                <div className = "divFormulario">
                    <Card >
                        <div className = "divHeader">Cadastrar Centro de Custos</div>
                        <Card.Body className = "fundoForm">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>Nome Cliente</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCnpj">
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control type="number" placeholder="" />
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
