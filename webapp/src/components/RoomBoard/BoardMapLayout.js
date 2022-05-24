import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import Map from 'components/Map/Map';
import { Hidden, Paper, Grid, Box } from '@mui/material';

const StyledLayout = styled.div`
    padding-top: 80px;
    margin: 0; /* margin default값으로 흰선 발생, 이를 제거 */
    font-family: 'Source Sans Pro';
`;


const BoardMapLayout = () => {
   const [isMobileNavOpen, setMobileNavOpen] = useState(false);

   return (
      <StyledLayout>
         <Header />
         <Box>
            <Grid container>
                  <Grid lg={4} md={4} sm={12} xs={12} >
                     <Box sx={{overflowY: "scroll", height: "calc(100vh)"}}>
                        <Outlet />
                     </Box>

                  </Grid>

                  <Grid lg={8} md={8} >
                     <Map />
                  </Grid>
            </Grid>
         </Box>

      </StyledLayout>
   );

   // Hidden 컴포넌트 오류날 경우 사용
   // return (
   //    <StyledLayout>
   //       <Header />
   //       <Grid container>
   //          <Grid lg={4} md={4} sm={12} xs={12}>
   //             <Outlet></Outlet>
   //          </Grid>
   //             <Grid lg={8} md={8}>
   //                <Map></Map>
   //             </Grid>
   //       </Grid>
   //    </StyledLayout>
   // );
};

export default BoardMapLayout;