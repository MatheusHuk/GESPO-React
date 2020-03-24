import React from 'react';
import './index.css'

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return(
            <>
                <div class="title">GESPO</div>
                <div class="subtitle">Gestão de custos e projetos</div>
                <div class="container">
                    <div class="subcontainer">
                        <div class="component">Rota 1</div>
                        <div class="component">Rota 2</div>
                    </div>
                    <div class="subcontainer">
                        <div class="component">Rota 3</div>
                        <div class="component">Rota 4</div>
                    </div>
                </div>
            </>
        );
    }
}