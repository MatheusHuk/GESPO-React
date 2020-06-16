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
    padding: 2VH 2VW;
    position: relative;
    width: 100VW;
    overflow-y: scroll;
    height: 100%;
    left: 0%;
    animation: ${entranceAnimation} 0.5s;
    color: white;
`;

export const Filtros = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 30%;
    width: 100%;
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
    z-index: -1;
`;

export const FBoxBody = styled.div`
    padding: 1VH 2VW 0 2VW;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
`;

export const BoxHeader = styled.div`
    font-size: 3VH;
    width: 100%;
    height: 50%;
    color: white;
    vertical-align: middle;
`;

export const Box = styled.div`
    position: relative;
    width: 25%;
    height: 10VH;
`;

export const Dados = styled.div`
    padding: 2%;
    position: relative;
    height: 35%;
    width: 80%;
    border-radius: 10px;
    background-color: #2B47AA;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0VH 0.5VH  5px black;
    border-radius: 5px;
`;

export const DadosTerceiros = styled.div`
    padding: 2%;
    position: relative;
    height: 60%;
    width: 80%;
    border-radius: 10px;
    background-color: #2B47AA;
    top: 34VH;
    left: 50%;
    margin-bottom: 5%;
    transform: translate(-50%, -50%);
    box-shadow: 0VH 0.5VH  5px black;
    border-radius: 5px;
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
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const DFooter = styled.div`
    position: relative;
    width: 100%;
    height: 3VH;
    display: flex;
    justify-content: right;
`;

export const DBoxBody = styled.div`
    padding: 1VH 2VW 0 2VW;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
`;

export const DBoxHeader = styled.div`
    font-size: 3VH;
    width: 100%;
    height: 50%;
    color: white;
    vertical-align: middle;
`;

export const DBigBox = styled.div`
    position: relative;
    width: 100%;
    height: 10VH;
`;

export const DBox = styled.div`
    position: relative;
    width: 30%;
    height: 10VH;
`;

export const DSmallBox = styled.div`
    position: relative;
    width: 15%;
    height: 10VH;
`;

export const Apontamento = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 60%;
    width: 100%;
    border-radius: 17px;
    background-color: #2B47AA;
`;

export const AHeader = styled.div`
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

export const ABody = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: calc(100% - 6VH);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const AFooter = styled.div`
    position: relative;
    width: 100%;
    height: 3VH;
    display: flex;
    justify-content: right;
`;

export const DivCreate = styled.div`
    height: 80%
`;

export const Icone = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
`;

export const TableDiv = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: calc(100% - 3VH);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    font-size: ${props => props.size == 1 ? '1.5VH' : '2VH'};
    border-spacing: 0px;
    overflow-y: scroll
`;

export const HeaderContainer = styled.div`
    width: auto;
    height: 5%;
    display: flex;
    flex-wrap: wrap;
`;

export const HeaderButton = styled.div`
    width: 33%;
    height: 100%;
    background-color: ${props => props.selected ? '#2B47AA' : "white"};
    color: ${props => props.selected ? 'white' : "black"};
    border: 1px solid black;
    border-bottom: 0;
    border-radius: 10px 10px 0 0;
    font-size: 2VH;
    position: relative;
    right: 0;
    float: right;
    cursor: pointer;

    :hover{
        background-color: ${props => props.selected ? '#2B47AA' : "#251680"};
        color: white;
    }

    p{
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const HeaderEditButton = styled.div`
    width: 33%;
    height: 100%;
    background-color: ${props => props.selected ? '#2B47AA' : "white"};
    color: ${props => props.selected ? 'white' : "grey"};
    border: 1px solid black;
    border-bottom: 0;
    border-radius: 10px 10px 0 0;
    font-size: 2VH;
    position: relative;
    right: 0;
    float: right;

    p{
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;