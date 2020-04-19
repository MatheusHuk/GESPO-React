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
    width: 100%;
    height: 100%;
    left: 0%;
    animation: ${entranceAnimation} 0.5s;
`;

export const Filtros = styled.div`
    left: 50%;
    top: 5%;
    transform: translateX(-50%);
    position: absolute;
    height: 30%;
    width: 90%;
    border-radius: 17px;
    background-color: #2B47AA;
`;

export const Header = styled.div`
    padding: 0 2% 0 2%;
    line-height: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 20%;
    border-bottom: 1px solid white;
    color: white;
    font-size: 3VH;
`;

export const Body = styled.div`
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    width: 95%;
    height: 70%;
    display: flex;
    justify-content: space-around;
`;

export const BoxBody = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-around;
`;

export const Footer = styled.div`
    position: absolute;
    top: 80%;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: right;
`;

export const BoxHeader = styled.div`
    font-size: 1.5VW;
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