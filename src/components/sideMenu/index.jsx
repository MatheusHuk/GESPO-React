import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Style from './style'

export default function SideMenu({ showMenu, setShowMenu }){

    const history = useHistory();
    
    return(
        <Style.SideMenu showMenu={showMenu}>
            <Style.Container>
                <Style.Button selected={ window.location.href.indexOf("/register") > -1 } onClick={() => history.push("/register")}>Cadastros</Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/projectManagement") > -1 } onClick={() => history.push("/projectManagement")}>Gestão de projetos</Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/timeEntry") > -1 } onClick={() => history.push("/timeEntry")}>Apontamento de horas</Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/dashboards") > -1 } onClick={() => history.push("/dashboards")}>Dashboards</Style.Button>
            </Style.Container> 
        </Style.SideMenu>
    )
}