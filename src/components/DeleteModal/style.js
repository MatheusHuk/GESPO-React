import styled from 'styled-components'

export const Todo = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    position: absolute;
    z-index: 100;
`;

export const Container = styled.div`
    padding: 2%;
    position: relative;
    height: auto;
    width: 50%;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    background-color: #2B47AA;
    transform: translate(-50%, -50%);
    box-shadow: 0VH 0.5VH  8px black;
`;

export const Header = styled.div`
    padding: 0 2% 0 2%;
    position: relative;
    width: 100%;
    border-bottom: 1px solid white;
    color: white;
    font-size: 2.5VH;
    top: 5%;
`;

export const Body = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    color: white;
`;

export const Button = styled.div`
    background-color: transparent !important;
    color: white !important;
    height: auto !important;
    width: 30%;
    border: 1px solid white !important;
    box-shadow: 0VW 0.3VH 3px black;
    z-index: 0 !important;
    margin-left: 1VW;
    text-align: center;
    cursor: pointer;

    :hover{
        background-color: #251680 !important; 
    }
`;