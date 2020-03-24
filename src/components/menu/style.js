import styled from 'styled-components'

export const Menu = styled.div`
    display: flex;
    position: absolute;
    width: 100VW;
    height: 7.5VH;
    background-color: white;
    border: 1px solid #E1CFCF;
    border-bottom-left-radius: 20px;
    z-index: 999;
`;

export const Empresa = styled.div`
    width: calc(20VW - 1px);
    height: 7.5VH;
    background-color: red;
    border-radius: inherit;
`;

export const ButtonContainer = styled.div`
    width: auto;
    height: 7.5VH;
    right: 1VW;
    display: flex;
    position: absolute;
    justify-content: space-between;
`;

export const Button = styled.div`
    display: flex;
    height: 7.5VH;
    width: 15VW;
    float: right;
    font-size: 20px;
    text-align: center;
    line-height: calc(10VH - 10px);
    cursor: pointer;

    :hover{
        color: grey;
    }
`;