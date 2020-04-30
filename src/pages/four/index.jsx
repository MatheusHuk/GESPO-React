import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Viewer from '../../Layout/Viewer';

import './index.css'

export default function Four(){

    const history = useHistory();
    return(
        <>
            <Viewer>
            <div class="title">GESPO</div>
                <div class="subtitle">Gestão de custos e projetos/ Cadastros </div>
                <div class="container">
                    <div class="subcontainer">
                        <div class="component" onClick={() => history.push("/custCenterRegister") }>Rota 1</div>
                        <div class="component" onClick={() => history.push("/projectRegister") }>Rota 2</div>
                    </div>
                    <div class="subcontainer">
                        <div class="component" onClick={() => history.push("/userRegister") }>Rota 3</div>
                    </div>
                </div>
            </Viewer>
        </>
    );
}
