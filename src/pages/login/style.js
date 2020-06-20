import styled, { keyframes } from 'styled-components'

const anim = keyframes`
    0%{
        top: -100%;
    }
    100%{
        top: 0;
    }
`;

export const Dados = styled.div`
    padding: 5%;
    position: relative;
    height: auto;
    width: 100%;
    border-radius: 5px;
    background-color: #2B47AA;
    left: 50%;
    margin-bottom: 5%;
    transform: translateX(-50%);
    box-shadow: 0VH 0.5VH  8px black;
    color: white;
`;

export const BotaoForm = styled.button`
    background-color: transparent;
    color: white !important;
    height: 100%;
    width: 50%;
    border: 1px solid white !important;
    line-height: 50% !important;
    box-shadow: 0VW 0.3VH 3px black;
    z-index: 0 !important;
    
    :hover{
        background-color: #251680 !important; 
    }
`;

export const DHeader = styled.div`
    padding: 0 2% 0 2%;
    line-height: 50%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 3VH;
    border-bottom: 1px solid white;
    color: white;
    font-size: 2.5VH;
`;

export const DBody = styled.div`
    padding: 5%;
    position: relative;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const DFooter = styled.div`
    position: relative;
    width: 100%;
    height: 5VH;
    display: flex;
    justify-content: center;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    top: 0;
    animation: ${anim} 0.5s;
`;

export const Image = styled.div`
    margin-top: 5%;
    margin-left: 25%;
    width: 21em;

    img {
        width: 50%;
        height: 100%;
    }
`