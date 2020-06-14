import React from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card } from 'react-bootstrap';
import "./index.css"
import * as Style from './style'

export default class CustCenterRegister extends React.Component {


    render() {
    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                        <Style.DHeader>
                            <Style.DivCreate>
                                <Style.DivTitle>Cadastrar Centro de Custos</Style.DivTitle>
                           <Style.BotaoFormCreate onClick={() => { setNovo(!novo) }}>
                                    {!novo ? 'Novo' : 'Editar'}
                                </Style.BotaoFormCreate>
                            </Style.DivCreate>
                        </Style.DHeader>
                        <Style.DBody>
                            <Style.DBoxBody>
                                <Style.DBox>
                                    <Card.Body className="fundoForm">
                                        <Form.Group as={Col} controlId="formGridClientName">
                                            <Form.Label>Nome do Cliente</Form.Label>
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
}
