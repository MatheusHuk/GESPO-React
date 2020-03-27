import React from 'react';
import { useHistory } from 'react-router-dom'
import Viewer from '../../Layout/Viewer'
import './index.css'

export default function Home({ setLoad }){

    const history = useHistory();
    
    return(
        <>
            <Viewer>
                <div class="title">GESPO</div>
                <div class="subtitle">Gestão de custos e projetos</div>
                <div class="container">
                    <div class="subcontainer">
                        <div class="component" onClick={() => history.push("/one") }>Rota 1</div>
                        <div class="component" onClick={() => history.push("/two") }>Rota 2</div>
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