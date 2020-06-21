import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Viewer from '../../Layout/Viewer'
import * as Style from './style'

export default function Home({ setLoad, logged, setLogged, showMenu, setShowMenu }){

    const history = useHistory();
    
    useEffect(() => {
        setLoad(true);
        if(logged == null){
            history.push("/login");
        }else{
            setShowMenu(false);
        }
        setLoad(false);
    }, [])

    return(
        <>
            <Viewer setLoad={setLoad} showMenu={showMenu} setShowMenu={setShowMenu} >
                <Style.MainContainer>
                    <Style.Title>GESPO</Style.Title>
                    <Style.SubTitle>Gestão de custos e projetos</Style.SubTitle>
                    <Style.Container>
                        <Style.SubContainer>
                            <Style.Component onClick={() => history.push("/register") }>Cadastros</Style.Component>
                            <Style.Component onClick={() => history.push("/projectManagement") }>Gestão de Projetos</Style.Component>
                        </Style.SubContainer>
                        <Style.SubContainer>
                            <Style.Component onClick={() => window.location.href = process.env.REACT_APP_DASHBOARD_URL }>Dashboards</Style.Component>
                            <Style.Component onClick={() => history.push("/timeEntry") }>Apontamento de horas</Style.Component>
                        </Style.SubContainer>
                    </Style.Container>
                </Style.MainContainer>
            </Viewer>
        </>
    );
}