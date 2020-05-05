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
    border-radius: inherit;
    font-size: 4VH;
    color: black;
    text-align: center;
    vertical-align: middle;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    width: auto;
    height: 7.5VH;
    right: 1VW;
    display: flex;
    position: absolute;
    justify-content: right;
`;

export const Button = styled.div`
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