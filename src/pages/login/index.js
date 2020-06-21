import React, { useState, useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { FormControl, InputGroup, Button, Form, Col } from 'react-bootstrap';
import UserService from '../../services/userService'
import Toaster from '../../utils/Toaster'
import './index.css'
import loginImg from "../../assets/GespoLogo.png";
import back from "../../assets/back.jpg"
import './style.scss';
import * as Style from './style.js'


export default function Login({ setLoad, logged, setLogged }) {

    const history = useHistory();

    const [state, setState] = useState({
        cpf: "",
        password: ""
    });

    const [toaster, setToaster] = useState({
        header: "Header",
        body: "Body"
    });

    const [show, setShow] = useState(false);

    const [cookies, setCookies] = useCookies([]);

    const cookie = new Cookies();

    useEffect(() => {
        setLoad(true);
        let loggedCookie = cookie.get("LOGGED")
        if (loggedCookie) {
            setLogged(loggedCookie)
            history.push("/")
        } else {
            setLoad(false);
        }
    }, []);

    function handleLogin(e) {
        setState({
            ...state,
            cpf: e.target.value
        });
    }

    function handlePass(e) {
        setState({
            ...state,
            password: e.target.value
        });
    }

    async function login() {
        setLoad(true);
        UserService.login(state)
            .then((res) => {
                setLogged(res.data);
                setCookies("LOGGED", res.data, { sameSite: "Lax" });
                history.push("/");
            })
            .catch((error) => {
                let erro = "";
                switch (error) {
                    case 400:
                        erro = "Cpf ou senha inválidos"; break;
                    case 403:
                        erro = "Cpf ou senha inválidos"; break;
                    case 404:
                        erro = "Cpf ou senha inválidos"; break;
                    case 500:
                        erro = "Erro interno do servidor"; break;
                    default:
                        erro = "Erro"; break;
                }
                setToaster({
                    header: "Erro",
                    body: erro
                });
                setShow(true);
            })
            .finally(() => {
                setLoad(false);
            });
    }

    return (
        <>
        <Style.Background src={back} />
            <Toaster
                show={show}
                setShowToaster={(sit) => { setShow(sit) }}
                header={toaster.header}
                body={toaster.body}
            />

            <div class="box_login">
                <div className="base-container">
                    <Style.Content>
                        <Style.Image>
                            <img src={loginImg} />
                        </Style.Image>
                        <Style.Dados>
                            <Style.DHeader>Login</Style.DHeader>
                            <Style.DBody>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Usuário</Form.Label>
                                            <Form.Control type="text" placeholder="CPF" onChange={(event) => { handleLogin(event) }} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control type="password" placeholder="Password" onChange={(event) => { handlePass(event) }} />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </Style.DBody>
                            <Style.DFooter>
                                <Style.BotaoForm onClick={() => { login() }}>
                                    Entrar
                                </Style.BotaoForm>
                            </Style.DFooter>
                        </Style.Dados>
                    </Style.Content>
                </div>
            </div>
        </>
    );

}
