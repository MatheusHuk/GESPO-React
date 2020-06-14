import React from 'react';
import Toaster from '../../utils/Toaster';
import Viewer from '../../Layout/Viewer';
import * as Style from './style';
import './index.css';
import CostCenterRegisterService from '../../services/CostCenterRegisterService';
import { render } from '@testing-library/react';

export default class CostCenterRegister extends React.Component {

constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        showFiltros: true,
        showToaster: false,
        toaster: {
            header: "Header",
            body: "Body"
        },
        filtros: {
            nomeCliente: null,
            cnpj: null
        },
        newDados: {
            project: null,
            name: null,
            cnpj: null
        },        
    }
}

addDados() {
    if(!this.state.newDados.name || !this.state.newDados.cnpj) {
        this.setState({
            ...this.state,
            toaster: {
                header: "Erro",
                body: "Os dados estão incompletos"
            },
            showToaster: true
        });
        return
    }
    let list = this.state.dadosList;
    list.push(this.state.newDados);
    this.setState({
        ...this.state,
        dadosList: list
    });
}

saveDados() {
    this.props.setLoad(true);
    CostCenterRegisterService.newDados(this.state.dadosList)
    .then(res => {
        this.setState({
            ...this.state,
            dados: res.data == "" ? [] : res.data,
            toaster: {
                header: "Sucesso",
                body: "Dados gravados com sucesso"
            },
            showToaster: true,
            showFiltros: true
        })
    })
    .catch(error => {
        console.log('Error: ', error);
    })
    .finally(() => {
        this.props.setLoad(false);
    })     
}


render() {
    return(
        <>
            <Viewer>
                <Toaster
                    show={this.state.showToaster}
                    setShowToater={(sit) => { this.setState({ ...this.state, showToaster: sit}); }}
                    header={this.state.toaster.header}
                    body={this.state.toaster.body}
                />
                <Style.Container>
                    <Style.HeaderContainer>
                        <Style.HeaderButton 
                            select={this.state.showFiltros}
                            onClick={() => { this.setState({ ...this.state, showFiltros: true}) }}
                        >
                            <p>Cadastrar Centro de Custos</p>    
                        </Style.HeaderButton>                        
                    </Style.HeaderContainer>
                    {this.state.showFiltros ?
                    <Style.MainContainer>
                        <Style.Filtros>
                            <Style.FHeader>Cadastrar Centro de Custos</Style.FHeader>
                        </Style.Filtros>
                    </Style.MainContainer>
                    }
                </Style.Container>             
            </Viewer>
        </>
    )
}
}