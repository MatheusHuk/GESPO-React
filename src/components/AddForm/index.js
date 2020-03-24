import React from 'react';
import * as Style from './style';

export default function AddForm({ name, cnpj }){
    return(
        <>
            <Style.Body>
                <Style.Box>
                    <Style.InnerText>Nome Cliente</Style.InnerText>
                    <Style.Input>{name}</Style.Input>
                </Style.Box>
                <Style.Box>
                    <Style.InnerText>CNPJ</Style.InnerText>
                    <Style.Input>{cnpj}</Style.Input>
                </Style.Box>
            </Style.Body>
        </>
    );
}