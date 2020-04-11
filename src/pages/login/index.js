import React, { useState, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
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

    const resetToaster = () => {
        setTimeout(() => {
            setShow(false)
        }, 5000);
    }

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
                setLogged(res);
                history.push("/");
            })
            .catch((error) => {
                setToaster({
                    header: "Erro",
                    body: "E-mail ou senha inválidos"
                });
                setShow(true);
                resetToaster();
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