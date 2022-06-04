import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

const StyledImg = styled.img`
    width: 70%;
    max-width: 150px;
   min-width: 30px;
`;

const theme = createTheme({
   palette: {
      primary: {
         main: '#ffca00',
      },
      secondary: {
         main: '#ffb000',
      },
      white: {
         main: '#FFFFFF',
      },
   },
});

const Main = () => {
   return (
      <>
         <Hidden mdDown>
            <ThemeProvider theme={theme}>
               <Box sx={{ backgroundColor: 'rgb(254, 248, 220)' }} m={0} >
                  <Container component="main" maxWidth="md"
                     sx={{
                        display: 'flex',
                        flexGrow: 1,
                        minHeight: 'calc(100vh - 180px)',
                        overflow: 'auto',
                     }}
                  >
                     <Grid container sx={{ paddingTop: '130px', paddingBottom: 10 }}>
                        <Grid item lg={6} md={6} sx={{ paddingRight: 2, display: { md: 'block', xs: 'none' } }}>
                           <Typography variant='h3' component="h1" sx={{ paddingLeft: 1, paddingBottom: 3, fontWeight: "bolder" }}>
               
                             금방
                              
                           </Typography>
                           <Typography variant='h1' sx={{ fontSize: "90px", fontWeight: "500" }}>
                              금오공대
                           </Typography>
                           <Typography variant='h1' sx={{ fontSize: "90px", fontWeight: "500" }}>
                              방 거래를
                           </Typography>
                           <Typography variant='h1' sx={{ fontSize: "90px", fontWeight: "500" }}>
                              간편하게!
                           </Typography>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} >

                           <Grid container spacing={0}>
                              <div style={{ marginTop: "50px" }}>
                                 <img
                                    src={require("img/메인모델.png")}
                                    style={{
                                       width: "430px",
                                       // height: "500px",
                                       objectFit: "contain"
                                    }}
                                 />
                              </div>

                              <Grid item lg={6} md={6} sm={12} xs={12} marginTop={0}>


                                 <Link to="/map/list" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Button
                                       fullWidth
                                       variant="contained"
                                       color="white"
                                       sx={{ mt: 3, mb: 2, color: "white", fontWeight: "bolder", width: "90%", float: "right" }}
                                    >
                                       방찾기
                                    </Button>
                                 </Link>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12} marginTop={0}>
                                 <Link to="/room/register" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Button
                                       fullWidth
                                       variant="contained"
                                       color="white"
                                       sx={{ mt: 3, mb: 2, color: "white", fontWeight: "bolder", width: "90%", marginLeft: 1, float: "right"}}
                                    >
                                       방내놓기
                                    </Button>
                                 </Link>
                              </Grid>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Container>
               </Box>
            </ThemeProvider>

         </Hidden>
         <Hidden mdUp>
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
                           <span style={{ color: "grey", fontSize: "12px" }}>원하시는 방을 찾고 싶다면?</span>
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
                           <span style={{ color: "grey", fontSize: "12px" }}>방을 내놓고 싶으시다면?</span>
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
         </Hidden>
      </>
   )
}

export default Main