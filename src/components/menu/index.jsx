import React, { useState, useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import * as Style from './style'
import img from '../../assets/gespo.jpg'

export default function Menu({ setLoad }){

    const history = useHistory();

    const [cookies, setCookies, removeCookies] = useCookies([]);

    const cookie = new Cookies();

    const [logged, setLogged] = useState({ name: "" })

    const logOut = async () => {
        setLoad(true)
        await removeCookies("LOGGED")
        await removeCookies("JSESSIONID")
        history.push("/login")
    }

    useEffect(() => {
        console.log("MENU: ",cookie.get("LOGGED"))
        setLogged(cookie.get("LOGGED"))
    }, [])

    return(
        <Style.Menu>
            <Style.Empresa>
                <Style.Gespo>
                    <img src={img} />
                </Style.Gespo>
            </Style.Empresa>
            <Style.Name>
                <span>
                    {logged.name}
                </span>
            </Style.Name>
            <Style.ButtonContainer>
                <Style.Button onClick={() => history.push("/")}>Inicio</Style.Button>
                <Style.Button onClick={() => logOut()}>Sair</Style.Button>
            </Style.ButtonContainer>
        </Style.Menu>
    )
}