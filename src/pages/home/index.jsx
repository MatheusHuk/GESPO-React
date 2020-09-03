import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Viewer from '../../Layout/Viewer'
import * as Style from './style'

export default function Home({ setLoad, logged, setLogged, showMenu, setShowMenu }){

    const history = useHistory();

    const isAdmin = () => {
        if(logged == undefined) return
        return logged.office.permission.id == 1
    }

    const canRegister = () => {
        if(logged == undefined) return
        return logged.office.permission.id == 2
    }

    const canManage = () => {
        if(logged == undefined) return
        return logged.office.permission.id == 3
    }
    
    useEffect(() => {
        setLoad(true);
        if(logged == null){
            history.push("/login");
        }else if(logged.office.permission.id == 4){
            history.push("/timeEntry")
        }else{
            setShowMenu(false);
        }
        setLoad(false);
    }, [])

    return(
        <>
            <Viewer logged={logged} setLoad={setLoad} showMenu={showMenu} setShowMenu={setShowMenu} >
                <Style.MainContainer>
                    <Style.Title>GESPO</Style.Title>
                    <Style.SubTitle>Gestão de custos e projetos</Style.SubTitle>
                    <Style.Container>
                         <Style.SubContainer>
                            {isAdmin() || canRegister() ? <Style.Component onClick={() => history.push("/register") }>Cadastros</Style.Component> :null}
                            {isAdmin() || canManage() ? <Style.Component onClick={() => history.push("/projectManagement") }>Gestão de Projetos</Style.Component> :null}
                        </Style.SubContainer>
                        <Style.SubContainer>
                            {isAdmin() || canManage() ? <Style.Component onClick={() => window.location.href = process.env.REACT_APP_DASHBOARD_URL }>Dashboards</Style.Component> :null}
                            <Style.Component onClick={() => history.push("/timeEntry") }>Apontamento de horas</Style.Component>
                        </Style.SubContainer>
                    </Style.Container>
                </Style.MainContainer>
            </Viewer>
        </>
    );
}