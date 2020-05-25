import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'

export default function ProjectRegister() {

    const [novo, setNovo] = useState(false);

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                        <Style.DHeader>
                            <Style.DivCreate>
                                <Style.DivTitle>Cadastrar Projeto</Style.DivTitle>
                                <Style.BotaoFormCreate onClick={() => { setNovo(!novo) }}>
                                    {!novo ? 'Novo' : 'Editar'}
                                </Style.BotaoFormCreate>
                            </Style.DivCreate>
                        </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridProjectName">
                                            <Form.Label>Nome do Projeto</Form.Label>
                                            {
                                                novo ?
                                                    <Form.Control type="text" placeholder="" /> :
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Projeto 1</option>
                                                        <option>Projeto 2</option>
                                                        <option>Projeto 3</option>
                                                    </Form.Control>
                                            }
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">

                                        <Form.Group as={Col} controlId="formGridManager">
                                            <Form.Label>Gerente Responsável</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Selecione...</option>
                                                <option>Gerente 1</option>
                                                <option>Gerente 2</option>
                                                <option>Gerente 3</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">

                                        <Form.Group as={Col} controlId="formGridClient">
                                            <Form.Label>Cliente</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Selecione...</option>
                                                <option>Cliente 1</option>
                                                <option>Cliente 2</option>
                                                <option>Cliente 3</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCustCenter">
                                            <Form.Label>Centro de Custo</Form.Label>
                                            <Form.Control type="text" placeholder="Automático" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBox>
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
                            </Style.DBoxBody>
                            <Style.DBoxBody>
                                <Style.DBigBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridObs">
                                            <Form.Label>Observação</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBigBox>
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
