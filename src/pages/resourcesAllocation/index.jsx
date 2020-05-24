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
                </Style.Container>
            </Viewer>

        </>
    );
}