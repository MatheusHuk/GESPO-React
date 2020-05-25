import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import {FormControl, FormGroup, FormLabel, Form, Col, Button, Card} from 'react-bootstrap';
import "./index.css"
import * as ReactBootstrap from "react-bootstrap";
import * as Style from './style'

export default function ResourcesAllocation(){

    const [novo, setNovo] = useState(false);
    
    return(
        <>
        
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                    <Style.DHeader>
                    <Style.DivCreate>Selecione o projeto
                            </Style.DivCreate>
                            </Style.DHeader>
                            <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridClientName">
                                            <Form.Label>Projeto</Form.Label>
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
                                        <Form.Group as={Col} controlId="formGridTeam">
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
                </Style.Container>
            </Viewer>

        </>
    );
}