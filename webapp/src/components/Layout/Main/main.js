import React from 'react';
import styled from "styled-components";
import { Hidden, Box, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Grid, Card, CardContent } from '@mui/material';
import { Link, Link as RouterLink } from 'react-router-dom';

const StyledMain = styled.div`
    min-height: calc(100vh - 180px);
`;

const StyledBoard = styled.div`
    width: 100%;
    height: 400px;
    background-color: rgba(241, 196, 15, 0.11);
`;

const StyledBoard2 = styled.div`
    width: 100%;
    height: 250px;
    background-color: rgba(241, 196, 15, 0.11); //메인 배경바꿀거면 img로 변경
`;

const StyledDiv = styled.div`
    padding: 10% 30% 0 30%;
    font-size: 20px;
`;

const StyledDiv2 = styled.div`
    padding: 0 26% 0 34%;
    font-size: 20px;
`;

const StyledDiv3 = styled.div`
    padding: 5% 20% 0 20%;
    font-size: 20px;
   marginBottom: 50px;
`;

const StyledH2 = styled.h2`
    text-align: center;
`;

const StyledH4 = styled.h4`
    text-align: center;
`;

const Main = () => {
   return (
      <StyledMain>
         <Hidden mdDown>
            <StyledBoard>
               <StyledDiv>
                  <StyledH2>
                     어떤 방을 원하세요?
                  </StyledH2>
               </StyledDiv>
               <StyledDiv2>
                  <LocationSearchingIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} />
                  <TextField
                     style={{ width: '70%' }}
                     fullWidth
                     hiddenLabel
                     id="filled-hidden-label-small"
                     variant="filled"
                     size="small"
                     placeholder="건물명, 도로명, 지번으로 검색하세요."
                  />
                  <SearchIcon sx={{ fontSize: 35 }} style={{ marginLeft: '1%' }} />
               </StyledDiv2>
            </StyledBoard>
         </Hidden>
         <Hidden mdUp>
            <StyledBoard2>
               <StyledDiv>
                  <StyledH4>
                     어떤 방을 원하세요?
                  </StyledH4>
               </StyledDiv>
               <StyledDiv2>
                  <Hidden xsUp>
                     <LocationSearchingIcon sx={{ fontSize: 20 }} style={{ marginRight: '1%' }} />
                  </Hidden>
                  <TextField
                     style={{ width: '70%' }}
                     fullWidth
                     hiddenLabel
                     id="filled-hidden-label-small"
                     variant="filled"
                     size="small"
                  />
                  <SearchIcon sx={{ fontSize: 25 }} style={{ marginLeft: '1%' }} />
               </StyledDiv2>
            </StyledBoard2>
         </Hidden>
         <StyledDiv3>
            <Box >
               <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                     <Link to="/map/list" style={{ textDecoration: 'none', color: 'black' }}>
                        <Card
                           sx={{
                              boxShadow: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}
                        >
                           <CardContent>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                 }}
                              >
                                 <h3>방 찾기</h3>
                              </Box>
                           </CardContent>
                        </Card>
                     </Link>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                     <Link to="/room/register" style={{ textDecoration: 'none', color: 'black' }}>
                        <Card
                           sx={{
                              boxShadow: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}
                        >
                           <CardContent>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                 }}
                              >
                                 <h3>방 내놓기</h3>
                              </Box>
                           </CardContent>
                        </Card>
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </StyledDiv3>
      </StyledMain>
   )
}

export default Main