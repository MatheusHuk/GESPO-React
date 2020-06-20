import styled from 'styled-components'

export const Todo = styled.div`
    display: flex;
    position: fixed;
    top: 7.5VH;
    left: ${props => props.showMenu ? "20VW" : "0"};
    width: ${props => props.showMenu ? "80VW" : "100vw"};
    height: 92.5VH;
`;