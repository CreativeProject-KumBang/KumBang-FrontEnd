import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from 'components/Layout/Header/header';

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
    backgrond-color: white;
`;
const MainLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <StyledLayout>
            <Header />
            <MainLayoutWrapper>
                <MainLayoutContainer>
                    <MainLayoutContent>
                        <Outlet />
                    </MainLayoutContent>
                </MainLayoutContainer>
                </MainLayoutWrapper>
        </StyledLayout>
  );
};

export default MainLayout;