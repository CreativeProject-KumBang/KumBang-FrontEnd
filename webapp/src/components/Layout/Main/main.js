import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Hidden, Box, Grid, Card, CardContent, Container, Typography, TextField, Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import HomeIcon from '@mui/icons-material/Home';

const StyledMain = styled.div`
    min-height: calc(100vh - 180px);
    background-color: rgba(241, 196, 15, 0.11); //메인 배경바꿀거면 img로 변경
`;

const StyledBoard = styled.div`
    width: 100%;
    height: 200px;
    background-color: rgba(241, 196, 15, 0.11);
`;

const StyledBoard2 = styled.div`
    width: 100%;
    height: 100px;
`;

const StyledDiv = styled.div`
    padding: 3% 20% 0 20%;
    font-size: 20px;
`;

const StyledDiv2 = styled.div`
    padding: 0 26% 0 34%;
    font-size: 20px;
`;

const StyledDiv3 = styled.div`
    padding: 5% 20% 0 20%;
    font-size: 15px;
   marginBottom: 50px;
   background-color: rgba(241, 196, 15, 0.11); //메인 배경바꿀거면 img로 변경
`;

const StyledH2 = styled.h2`
    text-align: center;
`;

const StyledH5 = styled.h5`
    text-align: center;
    outline: none;
`;

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

const Main = () => {
   return (
      <>
         <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
               <Box sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}>

                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <HomeIcon fontSize='large' />
                  </Avatar>
                  <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                     어떤 방을 원하세요?
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                     <Link to="/map/list" style={{ textDecoration: 'none' }}>
                        <span style={{color: "grey", fontSize: "12px"}}>원하시는 방을 찾고 싶다면?</span>
                        <Button
                           fullWidth
                           variant="contained"
                           color="secondary"
                           sx={{ mt: 3, mb: 2, color: "white" }}
                        >
                           방찾기
                        </Button>
                     </Link>
                     <Link to="/room/register" style={{ textDecoration: 'none' }}>
                        <span style={{color: "grey", fontSize: "12px"}}>방을 내놓고 싶으시다면?</span>
                        <Button
                           fullWidth
                           variant="contained"
                           color="secondary"
                           sx={{ mt: 3, mb: 2, color: "white" }}
                        >
                           방내놓기
                        </Button>
                     </Link>

                  </Box>

               </Box>

            </Container>
         </ThemeProvider >
      </>
      //       <StyledMain>
      //          <Hidden mdDown>
      //             <StyledBoard>
      //                <StyledDiv>
      //                   <StyledH2>
      //                      어떤 방을 원하세요?
      //                   </StyledH2>
      //                </StyledDiv>
      //                {/*<StyledDiv2>
      //                   <LocationSearchingIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} />
      //                   <TextField
      //                      style={{ width: '70%' }}
      //                      fullWidth
      //                      hiddenLabel
      //                      id="filled-hidden-label-small"
      //                      variant="filled"
      //                      size="small"
      //                      placeholder="건물명, 도로명, 지번으로 검색하세요."
      //                   />
      //                   <SearchIcon sx={{ fontSize: 35 }} style={{ marginLeft: '1%' }} />
      //    </StyledDiv2>*/}

      //             </StyledBoard>
      //          </Hidden>
      //          <Hidden mdUp>
      //             <StyledBoard2>
      //                <StyledDiv>
      //                   <StyledH5>
      //                      어떤 방을 원하세요?
      //                   </StyledH5>
      //                </StyledDiv>
      //                {/*<StyledDiv2>
      //                   <Hidden xsUp>
      //                      <LocationSearchingIcon sx={{ fontSize: 20 }} style={{ marginRight: '1%' }} />
      //                   </Hidden>
      //                   <TextField
      //                      style={{ width: '70%' }}
      //                      fullWidth
      //                      hiddenLabel
      //                      id="filled-hidden-label-small"
      //                      variant="filled"
      //                      size="small"
      //                   />
      //                   <SearchIcon sx={{ fontSize: 25 }} style={{ marginLeft: '1%' }} />
      // </StyledDiv2>*/}

      //             </StyledBoard2>
      //          </Hidden>
      //          <StyledDiv3>
      //             <Container maxWidth="md" component="main">
      //                <Grid container spacing={3}>
      //                   <Grid item lg={6} md={6} sm={12} xs={12}>
      //                      <Link to="/map/list" style={{ textDecoration: 'none', color: 'black' }}>
      //                         <Card
      //                            sx={{
      //                               boxShadow: 5,
      //                               justifyContent: 'center',
      //                               alignItems: 'center',
      //                               maxWidth: "350px",
      //                               maxHeight: "100px"
      //                            }}
      //                         >
      //                            <CardContent>
      //                               <Box
      //                                  sx={{
      //                                     display: 'flex',
      //                                     justifyContent: 'center',
      //                                     alignItems: 'center',
      //                                     flexDirection: 'column'
      //                                  }}
      //                               >
      //                                  <h3>방 찾기</h3>
      //                               </Box>
      //                            </CardContent>
      //                         </Card>
      //                      </Link>
      //                   </Grid>
      //                   <Grid item lg={6} md={6} sm={12} xs={12}>
      //                      <Link to="/room/register" style={{ textDecoration: 'none', color: 'black' }}>
      //                         <Card
      //                            sx={{
      //                               boxShadow: 5,
      //                               justifyContent: 'center',
      //                               alignItems: 'center',
      //                               maxWidth: "350px",
      //                               maxHeight: "100px"
      //                            }}
      //                         >
      //                            <CardContent>
      //                               <Box
      //                                  sx={{
      //                                     display: 'flex',
      //                                     justifyContent: 'center',
      //                                     alignItems: 'center',
      //                                     flexDirection: 'column'
      //                                  }}
      //                               >
      //                                  <h3>방 내놓기</h3>
      //                               </Box>
      //                            </CardContent>
      //                         </Card>
      //                      </Link>
      //                   </Grid>
      //                </Grid>
      //             </Container>
      //          </StyledDiv3>
      //       </StyledMain>
   )
}

export default Main