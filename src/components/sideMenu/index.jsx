import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Style from './style'

export default function SideMenu({ showMenu, setShowMenu }){

    const history = useHistory();
    
    return(
        <Style.SideMenu showMenu={showMenu}>
            <Style.Container>
                <Style.Button selected={ window.location.href.indexOf("/register") > -1 } onClick={() => history.push("/register")}><span>Cadastros</span></Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/projectManagement") > -1 } onClick={() => history.push("/projectManagement")}><span>Gestão de projetos</span></Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/timeEntry") > -1 } onClick={() => history.push("/timeEntry")}><span>Apontamento de horas</span></Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/dashboards") > -1 } onClick={() => history.push("/dashboards")}><span>Dashboards</span></Style.Button>
            </Style.Container> 
        </Style.SideMenu>
    )
}