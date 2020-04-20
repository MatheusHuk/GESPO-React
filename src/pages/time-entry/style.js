import styled, { keyframes } from 'styled-components';

const entranceAnimation = keyframes`
    0%{
        left: 100%;
    }
    100%{
        left: 0%;
    }
`;
export const Container = styled.div`
    position: relative;
    width: 100VW;
    height: 100%;
    left: 0%;
    animation: ${entranceAnimation} 0.5s;
`;

export const Filtros = styled.div`
    padding: 2%;
    left: 50%;
    top: 3%;
    transform: translateX(-50%);
    position: relative;
    height: 30%;
    width: 90%;
    border-radius: 17px;
    background-color: #2B47AA;
    margin-bottom: 4%;
`;

export const FHeader = styled.div`
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

export const FBody = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 6VH);
    display: flex;
    justify-content: space-around;
`;

export const FFooter = styled.div`
    position: relative;
    width: 100%;
    height: 3VH;
    display: flex;
    justify-content: right;
`;

export const BoxBody = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-around;
`;

export const BoxHeader = styled.div`
    font-size: 80%;
    overflow: Hidden;
    width: 100%;
    height: 50%;
    color: white;
    line-height: 2;
`;

export const Box = styled.div`
    display: inline-block;
    position: relative;
    top: 10%;
    width: 25%;
    height: 60%;
`;

export const Dados = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 60%;
    width: 90%;
    border-radius: 17px;
    background-color: #2B47AA;
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
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: calc(100% - 6VH);
    display: flex;
    background-color: green;
    justify-content: space-around;
`;

export const DFooter = styled.div`
    position: relative;
    width: 100%;
    height: 3VH;
    display: flex;
    justify-content: right;
`;