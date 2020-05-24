import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Style from './style'
import img from '../../assets/gespo.jpg'

export default function Menu(){

    const history = useHistory();

    return(
        <Style.Menu>
            <Style.Empresa>
                <Style.Gespo>
                    <img src={img} />
                </Style.Gespo>
            </Style.Empresa>
            <Style.ButtonContainer>
                <Style.Button onClick={() => history.push("/")}>Inicio</Style.Button>
                <Style.Button>Sair</Style.Button>
            </Style.ButtonContainer>
        </Style.Menu>
    )
}