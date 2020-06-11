import styled, { keyframes } from 'styled-components';
const animation = keyframes`
    0%{
        left: 100%
    }
    100%{
        left: 0
    }
`;
export const Container = styled.div`
    padding: 2VH 2VW;
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    animation: ${animation} 0.5s;
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

export const Filtros = styled.div`
    padding: 2%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 30%;
    width: 80%;
    border-radius: 17px;
    background-color: #2B47AA;
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
   
}
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
    flex: 1 1 auto;
    min-height: 1px;
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
    width: 55%;
    height: 10VH;
`;

export const Dados = styled.div`
    padding: 2%;
    position: relative;
    height: 50%;
    width: 80%;
    border-radius: 5px;
    background-color: #2B47AA;
    top: 30%;
    left: 50%;
    margin-bottom: 5%;
    transform: translate(-50%, -50%);
    box-shadow: 0VH 0.5VH  8px black;
`;
export const DadosTwo = styled.div`
    padding: 2%;
    position: relative;
    height: 70%;
    width: 80%;
    background-color: #2B47AA;
    top: 40%;
    left: 50%;
    margin-bottom: 5%;
    transform: translate(-50%, -50%);
    box-shadow: 0VH 0.5VH  5px black;
    border-radius: 5px;
`;

export const DadosThree = styled.div`
    padding: 2%;
    position: relative;
    height: 70%;
    width: 80%;
    border-radius: 5px;
    background-color: #2B47AA;
    top: 40%;
    left: 50%;
    margin-bottom: 5%;
    transform: translate(-50%, -50%);
    box-shadow: 0VH 0.5VH  5px black;
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
export const DHeaderTwo = styled.div`
    padding: 0 2% 0 2%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 3VH;
    color: #1F1462;
    font-size: 3VH;
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
    justify-content: flex-end;
`;


export const DBoxBodyFlexRight = styled.div`
    padding: 0VH 2VW 0 2VW;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-right;
`;

export const DBoxBody = styled.div`
    padding: 0VH 2VW 0 2VW;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 20%;
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
    width: 55%;
    height: 10VH;
`;

export const DBoxFirst = styled.div`
position: relative;
width: 60%;
height: 10VH;
`;

export const DBoxFirstTwo = styled.div`
    position: relative;
    width: 40%;
    height: 10VH;
`;

export const DBoxFirstThree = styled.div`
position: relative;
    width: 35%;
    height: 10VH;
    `;


export const DBoxFirstFour = styled.div`
    position: relative;
    width: 20%;
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
    width: 23%;
    height: 100%;
    background-color: white;
    vertical-align: middle;
    border: 1px solid black;
    `;

export const Td = styled.td`
    padding: 0;
    display: inline-block;
    position: relative;
    width: 23%;
    height: 100%;
    background-color: white;
    border: 1px solid black;
    `;

export const THSmall = styled.th`
    display: inline-block;
    position: relative;
    width: 8%;
    height: 100%;
    background-color: white;
    vertical-align: middle;
    border: 1px solid black;
    `;

export const TDSmall = styled.td`
    display: inline-block;
    position: relative;
    width: 8%;
    height: 100%;
    background-color: white;
    vertical-align: middle;
    border: 1px solid black;
`;
export const BotaoForm = styled.button`
    background-color: transparent !important;
    color: white !important;
    height: 100% !important;
    width: 20%;
    border: 1px solid white !important;
    line-height: 50% !important;
    box-shadow: 0VW 0.3VH 3px black;
    z-index: 0 !important;
    margin-left: 1VW;
    
    :hover{
        background-color: #251680 !important; 
`;
export const DivAlign = styled.div`
position: relative;
    width: 100%;
    height: 3VH;
    display: flex;
    justify-content: flex-end;
`;

export const Component = styled.div`
    float: left;
    background-color: white;
    width: 19VW;
    height: 25VH;
    border-radius: 10px;
    color: #1F1462;
    font-size: 3VH;
    text-align: left;
    line-height: 2px;
    transition: all 0.5s;
    padding: 3% 1%;
    box-shadow: 0VH 0.5VH  10px black;
`;
export const SubContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 50%;
    padding-top: 2.5VH;
    padding-bottom: 2.5VH;
`;