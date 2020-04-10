import React, { useState } from 'react'
import History from '../../utils/useHistory'
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import UserService from '../../services/userService'
import './index.css'

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            cpf: "",
            password: ""
        }
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        console.log("Props: ",this.props);
        this.props.setLoad(false);
    }

    handleLogin(e){
        this.setState({
            cpf: e.target.value
        });
    }

    handlePass(e){
        this.setState({
            password: e.target.value
        });
    }

    async login(){
        this.props.setLoad(true);
        UserService.login("/user/login", 
            [["cpf", this.state.cpf], ["password", this.state.password]])
            .then((res) => {
                alert("Logado");
                History.push("/");
            })
            .catch((error) => {
                alert("Res: "+error.status);
            })
            .finally(() => {
                this.props.setLoad(false);
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
                        <Button onClick={() => {this.login()}} variant="light">Login</Button>
                    </div>
                </div>
            </div>
        );
    }
    
}