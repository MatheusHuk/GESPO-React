import React, { useState } from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'

export default function CategoryRegister() {

    const [novo, setNovo] = useState(false);

    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                        <Style.DHeader>
                            <Style.DivCreate>
                                <Style.DivTitle>Cadastrar de categoria</Style.DivTitle>
                           <Style.BotaoFormCreate onClick={() => { setNovo(!novo) }}>
                                    {!novo ? 'Editar' : 'Novo'}
                                </Style.BotaoFormCreate>
                            </Style.DivCreate>
                        </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridCnpj">
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control type="text" placeholder="Ex: Desenvolvimento" />
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
