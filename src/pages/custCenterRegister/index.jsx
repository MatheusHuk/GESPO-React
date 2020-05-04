import React from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'

export default function CustCenterRegister() {

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                        <Style.DHeader>
                            <Style.DivCreate>Cadastrar Centro de Custos
                           <Style.BotaoFormCreate>Novo</Style.BotaoFormCreate>
                            </Style.DivCreate>
                        </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridClientName">
                                            <Form.Label>Nome do Cliente</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCnpj">
                                            <Form.Label>CNPJ</Form.Label>
                                            <Form.Control type="text" placeholder="00.000.000/0000-00" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
                        </Style.DBody>
                        <Style.DFooter>
                            <Style.BotaoForm>
                                Gravar
                            </Style.BotaoForm>
                            <Style.BotaoForm>
                                Deletar
                            </Style.BotaoForm>
                        </Style.DFooter>
                    </Style.Dados>
                </Style.Container>
            </Viewer>
        </>
    );
}
