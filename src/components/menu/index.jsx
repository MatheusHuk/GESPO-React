import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Style from './style'

export default function Menu(){

    const history = useHistory();

    return(
        <Style.Menu>
            <Style.Empresa>Gespo</Style.Empresa>
            <Style.ButtonContainer>
                <Style.Button onClick={() => history.push("/")}>Inicio</Style.Button>
                <Style.Button>Sair</Style.Button>
            </Style.ButtonContainer>
        </Style.Menu>
    )
}