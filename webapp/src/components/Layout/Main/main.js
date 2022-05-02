import React from 'react';
import styled from "styled-components";

const StyledMain = styled.div`
    display: flex;
    min-height: calc(100vh - 180px);
`;

const StyledBoard = styled.div`
    display: flex;
    width: 100%;
    height: 500px;
    background-color: rgba(241, 196, 15, 0.11);
`;

const StyledDiv = styled.div`
    padding: 10% 35%;
    font-size: 20px;
`;

const StyledH1 = styled.h1`
    text-align: center;
    margin: 0 auto;
    font-size: 2rem;

`;

const Main = () => {
    return (
        <StyledMain>
            <StyledBoard>
                <StyledDiv>
                    <StyledH1>
                        어떤 방을 원하세요?
                    </StyledH1>
                </StyledDiv>
            </StyledBoard>
        </StyledMain>
    )
}

export default Main