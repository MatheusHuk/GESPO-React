import React from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import * as Style from './style'

export default function HoursProvisioningReal() {

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                        <Style.DHeader> Filtros </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBigBox>
                                    <Card.Body className="fundoForm">
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridGerente">
                                                    <Form.Label>Projeto</Form.Label>
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Projeto 1</option>
                                                        <option>Projeto 2</option>
                                                        <option>Projeto 3</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Card.Body>
                                </Style.DBigBox>
                            </Style.DBoxBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridGerente">
                                                    <Form.Label>Recurso</Form.Label>
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Projeto 1</option>
                                                        <option>Projeto 2</option>
                                                        <option>Projeto 3</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridGerente">
                                                    <Form.Label>Categoria</Form.Label>
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Projeto 1</option>
                                                        <option>Projeto 2</option>
                                                        <option>Projeto 3</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Card.Body>
                                </Style.DBox>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridGerente">
                                                    <Form.Label>Mês</Form.Label>
                                                    <Form.Control as="select" value="Choose...">
                                                        <option>Selecione...</option>
                                                        <option>Projeto 1</option>
                                                        <option>Projeto 2</option>
                                                        <option>Projeto 3</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Card.Body>
                                </Style.DBox>
                            </Style.DBoxBody>
                        </Style.DBody>
                    </Style.Dados>
                </Style.Container>
            </Viewer>
        </>
    );
}