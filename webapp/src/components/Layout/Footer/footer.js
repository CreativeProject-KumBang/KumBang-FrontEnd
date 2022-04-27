import React from 'react';
import styled from "styled-components";

const StyledFooter = styled.footer`
    margin-top: auto;
    height: 100px;
    background-color: #dde0ea;
`;

const StyledContent = styled.div`
    display: flex;
    width: 96%;
    height:100%
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`;

const StyledTitle = styled.h2`
    font-weight: 600;
    font-size: 20px;
`

const Footer = () => {
    return (
        <StyledFooter>
            <StyledContent>
                <StyledTitle>This is Footer</StyledTitle>
            </StyledContent>
        </StyledFooter>
    )
}

export default Footer