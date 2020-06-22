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
    width: 20VW;
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
    right: 0VW;
    display: flex;
    position: absolute;
    justify-content: right;
`;

export const Button = styled.div`
    height: 7.5VH;
    width: 10VW;
    float: right;
    font-size: 20px;
    text-align: center;
    line-height: calc(10VH - 10px);
    cursor: pointer;

    :hover{
        color: grey;
    }
`;

export const Gespo = styled.div`
    width: 6VH;
    height: 6VH;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img{
        width: 100%;
        height: 100%;
        margin: 0;
        display: block;
    }
`;

export const Name = styled.div`
    width: 60VW;
    height: 100%;
    text-align: center;
    font-size: 3.5VH;
    font-weight: bold;
    padding: 0;

    span{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
    }
`;