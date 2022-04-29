import React from 'react';
import styled from "styled-components";

const StyledMain = styled.div`
    display: flex;
    min-height: calc(100vh - 180px);
    
`;

const StyledBoard = styled.div`
    display: flex;
    width: 30%;
    background-color: pink;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }

`;

const StyledMap = styled.div`
    display: flex;
    width: 70%;
    background-color: yellow;
    @media only screen and (max-width: 768px) {
        width: 0%
    }

`;

const Main = () => {
    return (
        <StyledMain>
            <StyledBoard>
                
            </StyledBoard>
            <StyledMap>

            </StyledMap>
        </StyledMain>
    )
}

export default Main