import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Viewer from '../../Layout/Viewer'
import * as Style from './style'

export default function Home({ setLoad, logged, setLogged }){

    const history = useHistory();
    
    useEffect(() => {
        setLoad(true);
        if(logged == null) history.push("/login");
        setLoad(false);
    }, [])

    return(
        <>
            <Viewer setLoad={setLoad}>
                <Style.Title>GESPO</Style.Title>
                <Style.SubTitle>Gestão de custos e projetos</Style.SubTitle>
                <Style.Container>
                    <Style.SubContainer>
                        <Style.Component onClick={() => history.push("/timeEntry") }>Apontamento de horas</Style.Component>
                        <Style.Component onClick={() => history.push("/dashboards") }>Dashboards</Style.Component>
                    </Style.SubContainer>
                    <Style.SubContainer>
                        <Style.Component onClick={() => history.push("/projectManagement") }>Gestão de Projetos</Style.Component>
                        <Style.Component onClick={() => history.push("/register") }>Cadastros</Style.Component>
                    </Style.SubContainer>
                </Style.Container>
            </Viewer>
        </>
    );
}