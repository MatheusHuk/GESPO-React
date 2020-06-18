import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Viewer from '../../Layout/Viewer';
import * as Style from './style'

import './index.css'

export default function Register({ setLoad, showMenu, setShowMenu }){

    const history = useHistory();

    useEffect(() => {
        setLoad(false);
        setShowMenu(true);
    }, []);
    
    return(
        <>
            <Viewer setLoad={setLoad} showMenu={showMenu} setShowMenu={setShowMenu}>
            <Style.MainContainer>
                <Style.Title>GESPO</Style.Title>
                    <Style.SubTitle>Gestão de custos e projetos / Cadastros </Style.SubTitle>
                    <Style.Container>
                        <Style.SubContainer>
                            <Style.Component class="component" onClick={() => history.push("/register/custCenterRegister") }>Cadastro de centro de custo</Style.Component>
                            <Style.Component class="component" onClick={() => history.push("/register/projectRegister") }>Cadastro de projetos</Style.Component>
                        </Style.SubContainer>
                        <Style.SubContainer class="subcontainer">
                            <Style.Component class="component" onClick={() => history.push("/register/userRegister") }>Cadastro de usuários</Style.Component>
                            <Style.Component class="component" onClick={() => history.push("/register/categoryRegister") }>Cadastro de categoria</Style.Component>
                            <Style.Component class="component" onClick={() => history.push("/register/teamRegister") }>Cadastro de times</Style.Component>
                        </Style.SubContainer>
                    </Style.Container>
                </Style.MainContainer>
            </Viewer>
        </>
    );
}
