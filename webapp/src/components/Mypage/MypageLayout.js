import { useState } from 'react';
import { Outlet } from 'react-router-dom';
//import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import Footer from 'components/Layout/Footer/footer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuApp from 'components/Mypage/menu';
import List from '@mui/material/List';
import { mainListItems } from './menu2';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffca00',
        },
        secondary: {
            main: '#ffb000',
        },
    },
  });

const MypageLayout = () => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ paddingTop: '80px'}} m={0} >
                <Header />
                <Container component="main" maxWidth="md"
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        minHeight: 'calc(100vh - 180px)',
                        overflow: 'auto',
                    }}
                >
                    <Grid container >
                        <Grid item lg={3} md={3} sx={{ display: { md: 'block', xs: 'none' }, backgroundColor: 'rgb(254, 248, 220)' }}>
                            <List component="nav" sx={{ paddingTop: '30px' }}>
                                {mainListItems}
                            </List>
                        </Grid>
                        <Grid item lg={9} md={9} sm={12} xs={12} sx={{padding: 3 }}>
                            <Grid >
                                <Outlet />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default MypageLayout;

// const StyledLayout = styled.div`
//     padding-top: 80px;
//     margin: 0; /* margin default값으로 흰선 발생, 이를 제거 */
//     font-family: 'Source Sans Pro';
// `;
// const MainLayoutWrapper = styled.div`
//     display: flex;
//     flex: 1 1 auto;
//     overflow: hidden;
//     paddingTop: 64;
// `;
// const MainLayoutContainer = styled.div`
//     display: flex;
//     flex: 1 1 auto;
//     overflow: hidden;
// `;
// const StyledMain = styled.div`
//     display: flex;
//     min-height: calc(100vh - 180px);
//     margin:
//         margin-top: 0px;
//         margin-right: 210px;
//         margin-bottom: 0px;
//         margin-left: 210px;
// `;

// const StyledNav = styled.div`
//     display: block;
//     float: left;
//     width: 20%;
//     padding-top: 30px;
//     background-color: rgb(254, 248, 220);
// `;

// const StyledSection = styled.div`
//     display: block;
//     width: 80%;
//     padding-top: 50px;
//     padding-bottom: 50px;
//     padding-left: 50px;
//     font-size: 22px;
//     /*background-color: green;*/
// `;



// const StyledMypage = styled.div`
//     display: block;
//     margin-right: 50px;
//     font-size: 22px;
//     /*background-color: #ffca09;*/
// `;
    // return (
    //     <StyledLayout>
    //         <Header />
    //             <StyledMain>
    //                 <StyledNav>
    //                     <MenuApp/>
    //                 </StyledNav>
    //                 <StyledSection>
    //                     <StyledMypage>
    //                         <Outlet />
    //                     </StyledMypage>
    //                 </StyledSection>
    //             </StyledMain>
    //         <Footer />
    //     </StyledLayout>
    // )
