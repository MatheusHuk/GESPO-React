import React, { useState, useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import FA from 'react-fontawesome'
import UserService from '../../services/userService'
import Toaster from '../../utils/Toaster'
import './index.css'
import loginImg from "../../assets/GespoLogo.png";
import phone from '../../assets/phone.svg'
import wave from "../../assets/wave.png"
import './style.css';

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
        <img className="wave" src={wave} />
            <Toaster
                show={show}
                setShowToaster={(sit) => { setShow(sit) }}
                header={toaster.header}
                body={toaster.body}
            />

            <div className="loginContainer">
                <div className="img">
                    <img src={phone} />
                </div>
                <div class="login-content">
                    <div className="form">
                        <img src={loginImg} />
                        <h1>Nunca foi tão simples</h1>
                        <div className="input-div one">
                            <div className="i">
                                <FA name="user" />
                            </div>
                            <div className="div">
                                <input placeholder="CPF" type="text" className="input" 
                                onChange={(event) => { handleLogin(event) }} />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <FA name="lock" />
                            </div>
                            <div className="div">
                                <input placeHolder="Senha" type="password" className="input"
                                onChange={(event) => { handlePass(event) }} />
                            </div>
                        </div>
                    <div className="btnLogin" onClick={() => { login() }}>
                        <span>Entrar</span>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );

}
