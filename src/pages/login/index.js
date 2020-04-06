import React, { useState } from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import './index.css'

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            login: "",
            senha: ""
        }
    }

    handleLogin(e){
        console.log("Val: ",e.target.value);
        this.setState({
            login: e.target.value
        });
    }

    handlePass(e){
        console.log("Val: ",e.target.value);
        this.setState({
            senha: e.target.value
        });
    }

    render(){
        return(
            <div class="page">
                <div class="box">
                    <div class="gespo">GESPO</div>
                    <div class="label">Login</div>
                    <InputGroup className="text">
                        <FormControl
                        id="log"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(event) => {this.handleLogin(event)}}
                        type="text"
                        />
                    </InputGroup>
                    <div class="label">Senha</div>
                    <InputGroup className="text">
                        <FormControl
                        id="log"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(event) => {this.handlePass(event)}}
                        type="password"
                        />
                    </InputGroup>
                    <div class="button_box">
                        <Button variant="light">Login</Button>
                    </div>
                </div>
            </div>
        );
    }
    
}