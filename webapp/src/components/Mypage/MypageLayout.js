import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import Footer from 'components/Layout/Footer/footer';
import MenuApp from 'components/Mypage/menu'
import MyInfo from 'components/Mypage/myinfo'
// import mainTheme from "./mainTheme";

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
const StyledMain = styled.div`
    display: flex;
    min-height: calc(100vh - 180px);
    margin:
        margin-top: 0px;
        margin-right: 210px;
        margin-bottom: 0px;
        margin-left: 210px;
`;

const StyledNav = styled.div`
    display: block;
    float: left;
    width: 20%;
    padding-top: 30px;
    background-color: rgb(254, 248, 220);
`;

const StyledSection = styled.div`
    display: block;
    width: 80%;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 50px;
    font-size: 22px;
    background-color: green;
`;

const StyledTop = styled.div`
    display: block;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 50px;
    margin-right: 50px;
    font-size: 22px;
    background-color: yellow;
`;

const StyledMypage = styled.div`
    display: block;
    margin-right: 50px;
    font-size: 22px;
    background-color: #ffca09;
`;

const MypageLayout = () => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <StyledLayout>
            <Header />
            {/* <MainLayoutWrapper>
                <MainLayoutContainer> */}
                    <StyledMain>
                        <StyledNav>
                            <MenuApp />
                        </StyledNav>
                        <StyledSection>
                            <StyledTop>
                                <h2>내 정보</h2>
                            </StyledTop>
                            <StyledMypage>
                                <MyInfo />
                            </StyledMypage>
                        </StyledSection>
                    </StyledMain>
                {/* </MainLayoutContainer>
            </MainLayoutWrapper> */}
            <Footer />
        </StyledLayout>
    )
}

export default MypageLayout