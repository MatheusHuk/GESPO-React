import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Style from './style'

export default function SideMenu(){

    const history = useHistory();
    
    return(
        <Style.SideMenu>
            <Style.Container>
                <Style.Button selected={ window.location.href.indexOf("/time-entry") > -1 } onClick={() => history.push("/time-entry")}>Rota 1</Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/two") > -1 } onClick={() => history.push("/two")}>Rota 2</Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/three") > -1 } onClick={() => history.push("/three")}>Rota 3</Style.Button>
                <Style.Button selected={ window.location.href.indexOf("/four") > -1 } onClick={() => history.push("/four")}>Rota 4</Style.Button>
            </Style.Container> 
        </Style.SideMenu>
    )
}