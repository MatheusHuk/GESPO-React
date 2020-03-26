import React from 'react';
import { useHistory } from 'react-router-dom'
import './index.css'

export default function Home({ goto }){

    const history = useHistory();

    function changePage(route){
        goto(route);
        history.push(route);
    }
    return(
        <>
            <div class="title">GESPO</div>
            <div class="subtitle">Gestão de custos e projetos</div>
            <div class="container">
                <div class="subcontainer">
                    <div class="component" onClick={() => changePage("/one") }>Rota 1</div>
                    <div class="component" onClick={() => changePage("/two") }>Rota 2</div>
                </div>
                <div class="subcontainer">
                    <div class="component" onClick={() => changePage("/three") }>Rota 3</div>
                    <div class="component" onClick={() => changePage("/four") }>Rota 4</div>
                </div>
            </div>
        </>
    );
}