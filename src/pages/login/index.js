import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import UserService from '../../services/userService'
import Toaster from '../../utils/Toaster'
import './index.css'

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

    useEffect(() => {
        setLoad(false);
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
        UserService.login([["cpf", state.cpf], ["password", state.password]])
            .then((res) => {
                setLogged(res.data);
                history.push("/");
            })
            .catch((error) => {
                let erro = "";
                switch(error){
                    case 403:
                        erro = "Cpf ou senha inválidos";break;
                    case 404:
                        erro = "Cpf ou senha inválidos";break;
                    case 500:
                        erro = "Erro interno do servidor";break;
                    default:
                        erro = "Erro";break;
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
                setShowToaster={(sit) => {setShow(sit)}}
                header={toaster.header}
                body={toaster.body}
            />
            <div class="page">
                <div class="box">
                    <div class="gespo">GESPO</div>
                    <div class="label">Login</div>
                    <InputGroup className="text">
                        <FormControl
                            id="log"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(event) => { handleLogin(event) }}
                            type="text"
                        />
                    </InputGroup>
                    <div class="label">Senha</div>
                    <InputGroup className="text">
                        <FormControl
                            id="log"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(event) => { handlePass(event) }}
                            type="password"
                        />
                    </InputGroup>
                    <div class="button_box">
                        <Button onClick={() => { login() }} variant="light">Login</Button>
                    </div>
                </div>
            </div>
        </>
    );

}