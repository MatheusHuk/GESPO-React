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
    height: 100%;
    animation: ${entranceAnimation} 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
`;

export const MainContainer = styled.div`
    padding-top: 1%;
    width: 100%;
    height: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
`;

export const HeaderContainer = styled.div`
    width: auto;
    height: 5%;
    display: flex;
    flex-wrap: wrap;
`;

export const HeaderBackButton = styled.div`
    width: 10%;
    height: 100%;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px 10px 0 0;
    font-size: 2VH;

    p{
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const ButtonContainer = styled.div`
    height: 100%;
    width: 90%;
`;

export const HeaderButton = styled.div`
    width: 50%;
    height: 100%;
    background-color: ${props => props.selected ? '#2B47AA' : "white"};
    color: ${props => props.selected ? 'white' : "black"};
    border: 1px solid black;
    border-radius: 10px 10px 0 0;
    font-size: 2VH;
    position: relative;
    right: 0;
    float: right;
    cursor: pointer;

    p{
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const Filtros = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 30%;
    width: auto;
    border-radius: 17px;
    background-color: #2B47AA;
    color: white;
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
    justify-content: flex-end;
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
    height: 60%;
    width: 100%;
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
    justify-content: space-around;
    flex-wrap: wrap;
    color: white;
    padding: 2% 0;
`;

export const DFooter = styled.div`
    position: relative;
    width: 100%;
    height: 3VH;
    display: flex;
    justify-content: flex-end;
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

export const ApontamentoSmall = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 35%;
    width: 100%;
    border-radius: 17px;
    background-color: #2B47AA;
`;

export const Apontamento = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 65%;
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

export const Table = styled.table`
    border: 1;
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
`;

export const THeader = styled.thead`
    position: relative;
    width: 100%;
    height: 10%;
`;

export const TData = styled.tbody`
    position: relative;
    width: 100%;
    height: 90%;
    overflow-y: scroll;
    -moz-overflow-style: none;
    ::-webkit-scrollbar{
        display: none;
    }
`;

export const TRHeader = styled.tr`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
`;

export const Tr = styled.tr`
    padding: 0;
    display: inline-block;
    position: relative;
    width: 100%;
    height: 10%;
`;

export const Th = styled.th`
    padding: 0;
    display: inline-block;
    position: relative;
    width: 19%;
    height: 100%;
    background-color: white;
    vertical-align: middle;
    border: 1px solid black;
`;

export const Td = styled.td`
    padding: 0;
    display: inline-block;
    position: relative;
    width: 19%;
    height: 100%;
    background-color: white;
    border: 1px solid black;
`;

export const THSmall = styled.th`
    display: inline-block;
    position: relative;
    width: 5%;
    height: 100%;
    background-color: white;
    vertical-align: middle;
    border: 1px solid black;
`;

export const TDSmall = styled.td`
    display: inline-block;
    position: relative;
    width: 5%;
    height: 100%;
    background-color: white;
    vertical-align: middle;
    border: 1px solid black;
`;

export const Icone = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
`;