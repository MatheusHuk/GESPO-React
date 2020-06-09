import React, { useState, useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import UserService from '../../services/userService'
import Toaster from '../../utils/Toaster'
import './index.css'
import loginImg from "../../assets/gespo.jpg";
import './style.scss';


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
                setCookies("LOGGED", res.data);
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
            <Toaster
                show={show}
                setShowToaster={(sit) => { setShow(sit) }}
                header={toaster.header}
                body={toaster.body}
            />

            <div class="box_login">
                <div className="base-container">
                    <div className="content">
                        <div className="image">
                            <img src={loginImg} />
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Usuário</label>
                                <input type="text" name="username" placeholder="CPF" onChange={(event) => { handleLogin(event) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" name="password" placeholder="Senha" onChange={(event) => { handlePass(event) }} />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button onClick={() => { login() }} type="button" class="button_box">
                            Entrar
          </button>
                    </div>
                </div>
            </div>
        </>
    );

}
