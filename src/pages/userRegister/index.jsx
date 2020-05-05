import React from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'

export default function UserRegister() {

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                        <Style.DHeader> 
                           <Style.DivCreate>Cadastrar Usuário
                           <Style.BotaoFormCreate>Novo</Style.BotaoFormCreate>
                           </Style.DivCreate>
                         </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridUserName">
                                            <Form.Label>Nome do Usuário</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridBirthDate">
                                            <Form.Label>Data de Nascimento</Form.Label>
                                            <Form.Control type="text" placeholder="xx/xx/xxxx" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridRG">
                                            <Form.Label>RG</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCPF">
                                            <Form.Label>CPF</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
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
                                        <Form.Group as={Col} controlId="formGridTeam     ">
                                            <Form.Label>Time</Form.Label>
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
                                        <Form.Group as={Col} controlId="formGridHourTax">
                                            <Form.Label>Taxa Hora</Form.Label>
                                            <Form.Control type="text" placeholder="R$00,00" />
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
