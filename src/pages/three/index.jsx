import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import {useHistory} from 'react-router-dom'; 

export default function Three(){
    const history = useHistory();

    return(
        <>
            <Viewer>
                <div class="title">GESPO</div>
                <div class="subtitle">Gestão de custos e projetos</div>
                <div class="container">
                    <div class="subcontainer">
                        <div class="component" onClick={() => history.push("/hoursProvisioning") }>Provisionamento de Horas</div>
                        <div class="component" onClick={() => history.push("/three/hoursProvisioningReal") }>Provisionamento de Horas Real</div>
                    </div>
                    <div class="subcontainer">
                        <div class="component" onClick={() => history.push("/three") }>Rota 3</div>
                        <div class="component" onClick={() => history.push("/four") }>Rota 4</div>
                    </div>
                </div>
            </Viewer>
        </>
    );
}
