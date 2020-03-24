import React, { useState, useEffect } from 'react';
import * as Style from './style';
import AddForm from '../AddForm';

export default class Form extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            list: [],
        }
        this.prop = {
            name: "",
            cnpj: 0
        }
        this.render = this.render.bind(this);
        this.adicionar = this.adicionar.bind(this);
    }

    adicionar(){
        if(this.prop.name != null && this.prop.cnpj != null){
            this.setState(state => {
                const list = state.list;
                list.push(this.prop);
                return {
                    list
                }
            })
        }
    }

    componentDidUpdate(){
        console.log('State: ',this.state);
    }

    onNameChange(value){
        this.prop.name = value;
    }

    onCnpjChange(value){
        this.prop.cnpj = value;
    }

    render(){
        return(
            <>
                <Style.Todo>
                    <Style.Form>
                        <Style.Title>
                            <Style.TitleButton>x</Style.TitleButton>
                            <Style.TitleButton onClick={this.adicionar}>+</Style.TitleButton>
                            <Style.Text>Cadastrar centro de custo</Style.Text>
                        </Style.Title>
                        <Style.Body>
                            <Style.Box>
                                <Style.InnerText>Nome Cliente</Style.InnerText>
                                <Style.Input 
                                    value={this.state.name}
                                    onChange={e => this.onNameChange(e.target.value)}
                                />
                            </Style.Box>
                            <Style.Box>
                                <Style.InnerText>CNPJ</Style.InnerText>
                                <Style.Input 
                                    value={this.state.cnpj}
                                    onChange={e => this.onCnpjChange(e.target.value)}
                                />
                            </Style.Box>
                        </Style.Body>
                    </Style.Form>
                </Style.Todo>
                <Style.AddFormTodo>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <AddForm name={item.name} cnpj={item.cnpj} key={index}/>
                            );
                        })
                    }
                </Style.AddFormTodo>

            </>
        )
    }
}