import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import {useHistory} from 'react-router-dom'; 
import * as Style from './style';

export default function ProjectManagement({ setLoad }){
    const history = useHistory();

    useEffect(() => {
        setLoad(false);
    }, []);

    return(
        <>
            <Viewer setLoad={setLoad}>
                <Style.Title>GESPO</Style.Title>
                <Style.SubTitle>Gestão de custos e projetos</Style.SubTitle>
                <Style.Container>
                    <Style.SubContainer>
                        <Style.Component onClick={() => history.push("/projectManagement/hoursProvisioning") }>Provisionamento de Horas</Style.Component>
                        <Style.Component onClick={() => history.push("/projectManagement/resourcesAllocation") }>Alocação de recursos</Style.Component>
                    </Style.SubContainer>
                    <Style.SubContainer>
                        <Style.Component class="component" onClick={() => history.push("/projectManagement/goalsDefinition") }>Definição de metas</Style.Component>
                    </Style.SubContainer>
                </Style.Container>
            </Viewer>
        </>
    );
}
