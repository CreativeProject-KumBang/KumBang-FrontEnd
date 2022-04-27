import React from 'react';
import styled from "styled-components";
import Footer from "components/Layout/Footer/footer"
import Header from "components/Layout/Header/header"
import { Outlet } from 'react-router-dom';
import Main from './main';

const StyledLayout = styled.div`
    padding-top: 80px;
    margin: 0; /* margin default값으로 흰선 발생, 이를 제거 */
    font-family: 'Source Sans Pro';
`;

const MainLayoutWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
    paddingTop: 64;
`;
  
const MainLayoutContainer = styled.div`
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
`;

const MainLayoutContent = styled.div`
    flex: 1 1 auto;
    height: 100%;
    overflow: auto;
    backgrond-color: yellow;
`;


const MainLayout = (props) => {
    return (
        <StyledLayout>
            <Header />
            <MainLayoutWrapper>
                <MainLayoutContainer>
                    <MainLayoutContent>
                        <Main />
                    </MainLayoutContent>
                </MainLayoutContainer>
                </MainLayoutWrapper>
        </StyledLayout>
    )
}

export default MainLayout