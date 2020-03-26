import React from 'react'
import * as Style from './style'

export default function SideMenu({route}){

    return(
        <Style.SideMenu>
            <Style.Container>
                <Style.Button selected={ route == "/one" }>Rota 1</Style.Button>
                <Style.Button selected={ route == "/two" }>Rota 2</Style.Button>
                <Style.Button selected={ route == "/three" }>Rota 3</Style.Button>
                <Style.Button selected={ route == "/four" }>Rota 4</Style.Button>
            </Style.Container> 
        </Style.SideMenu>
    )
}