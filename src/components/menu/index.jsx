import React from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import * as Style from './style'
import img from '../../assets/gespo.jpg'

export default function Menu({ setLoad }){

    const history = useHistory();

    const [cookies, setCookies, removeCookies] = useCookies([]);

    const logOut = async () => {
        setLoad(true)
        await removeCookies("LOGGED")
        await removeCookies("JSESSIONID")
        history.push("/login")
    }

    return(
        <Style.Menu>
            <Style.Empresa>
                <Style.Gespo>
                    <img src={img} />
                </Style.Gespo>
            </Style.Empresa>
            <Style.ButtonContainer>
                <Style.Button onClick={() => history.push("/")}>Inicio</Style.Button>
                <Style.Button onClick={() => logOut()}>Sair</Style.Button>
            </Style.ButtonContainer>
        </Style.Menu>
    )
}