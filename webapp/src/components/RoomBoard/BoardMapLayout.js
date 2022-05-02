import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import Map from 'components/Map/Map';


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

const StyledBoard = styled.div`
    display: flex;
    width: 30%;
    background-color: white;
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

const BoardMapLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <StyledLayout>
            <Header />
            <MainLayoutWrapper>
                <MainLayoutContainer>
                    <StyledBoard>
                        <Outlet></Outlet>
                    </StyledBoard>
                    <StyledMap>
                        <Map></Map>
                    </StyledMap>
                </MainLayoutContainer>
                </MainLayoutWrapper>
        </StyledLayout>
  );
};

export default BoardMapLayout;