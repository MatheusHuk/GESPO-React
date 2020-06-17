import styled, { keyframes } from 'styled-components'

const animation = keyframes`
    0%{
        left: 100%
    }
    100%{
        left: 0
    }
`;

export const MainContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    animation: ${animation} 0.5s;
`;

export const Title = styled.div`
    display: flex;
    position: absolute;
    width: auto;
    height: 10VH;
    font-size: 10VH;
    color: #3C3C3C;
    margin-top: 3VH;
    margin-left: 3VW;
    padding: 0;
`;

export const SubTitle = styled.div`
    display: flex;
    position: absolute;
    width: auto;
    height: 10VH;
    font-size: 5VH;
    color: #3C3C3C;
    margin-top: 15VH;
    margin-left: 3VW;
    padding: 0;
`;

export const Container = styled.div`
    position: absolute;
    top: 25VH;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60VH;
`;

export const SubContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 50%;
    padding-top: 2.5VH;
    padding-bottom: 2.5VH;
`;

export const Component = styled.div`
    float: left;
    background-color: #1F1462;
    width: 19VW;
    height: 25VH;
    border-radius: 10px;
    color: white;
    font-size: 3VH;
    text-align: left;
    line-height: 1;
    cursor: pointer;
    transition: all 0.5s;
    padding: 3% 1%;

    :hover{
        background-color: #0C043D;
        transition: all 0.5s;
    }
`;