import React from 'react'
import * as Style from './style'

export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return(
            <Style.Menu>
                <Style.Empresa />
                <Style.ButtonContainer>
                    <Style.Button>Inicio</Style.Button>
                    <Style.Button>Sair</Style.Button>
                </Style.ButtonContainer>
            </Style.Menu>
        )
    }
}