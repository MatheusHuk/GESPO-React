import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Style from './style'

export default function HoursProvisioningReal({ setLoad, logged, setLogged }) {

    useEffect(() => {
        setLoad(false)
    }, [])

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
                    <Style.DadosTwo>
                        <Style.DHeader> Dados do Provisionamento </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBigBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridProjectAction">
                                            <Form.Label>Projeto</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Selecione...</option>
                                                <option>Projeto 1</option>
                                                <option>Projeto 2</option>
                                                <option>Projeto 3</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBigBox>
                            </Style.DBoxBody>
                            <Style.DBoxBody>
                                <Style.DBoxFirst>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridResourceAction">
                                            <Form.Label>Recurso</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Selecione...</option>
                                                <option>Recurso 1</option>
                                                <option>Recurso 2</option>
                                                <option>Recurso 3</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBoxFirst>
                                <Style.DBoxFirstTwo>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCategory">
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control type="text" placeholder="Automatico" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBoxFirstTwo>
                            </Style.DBoxBody>
                            <Style.DBoxBodyFlexRight>
                                <Style.DBoxFirstThree>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridResourceAction">
                                            <Form.Label>Data</Form.Label>
                                            <Form.Control type="date"></Form.Control>
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBoxFirstThree>
                                <Style.DBoxFirstFour>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCategory">
                                            <Form.Label>Horas</Form.Label>
                                            <Form.Control type="text" placeholder="00h" />
                                        </Form.Group>
                                    </Card.Body>
                                </Style.DBoxFirstFour>
                            </Style.DBoxBodyFlexRight>
                        </Style.DBody>
                        <Style.DFooter>
                            <Style.BotaoForm>
                                Gravar
                            </Style.BotaoForm>
                            <Style.BotaoForm>
                                Deletar
                            </Style.BotaoForm>
                        </Style.DFooter>
                    </Style.DadosTwo>
                    <Style.DadosThree>
                        <Style.DHeader> Provisionamento de Horas </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.SubContainer>
                                    <Style.Component>
                                        <Style.DHeaderTwo> Jan/2020 </Style.DHeaderTwo>
                                        <Style.DBody>
                                            <Style.DBoxBody>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">" Recurso:X - Categoria:Y"</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                                            120
                                                    </Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">" Recurso:X - Categoria:Y"</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                                            120
                                                    </Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">" Recurso:X - Categoria:Y"</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                                            120
                                                    </Button>
                                                    </span>
                                                </OverlayTrigger>
                                            </Style.DBoxBody>
                                        </Style.DBody>
                                    </Style.Component>
                                    <Style.Component>
                                        <Style.DHeaderTwo> Fev/2020 </Style.DHeaderTwo>
                                        <Style.DBody>
                                            <Style.DBoxBody>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">" Recurso:X - Categoria:Y"</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                                            120
                                                    </Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">" Recurso:X - Categoria:Y"</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                                            120
                                                    </Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">" Recurso:X - Categoria:Y"</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }}>
                                                            120
                                                    </Button>
                                                    </span>
                                                </OverlayTrigger>
                                            </Style.DBoxBody>
                                        </Style.DBody>
                                    </Style.Component>
                                </Style.SubContainer>
                            </Style.DBoxBody>
                        </Style.DBody>
                    </Style.DadosThree>
                </Style.Container>
            </Viewer>
        </>
    );
}