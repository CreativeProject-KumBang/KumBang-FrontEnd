import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import Map from 'components/Map/Map';
import Grid from '@mui/material/Grid';
import { Hidden } from '@mui/material';

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
         <Grid container>
            <Grid lg={4} md={4} sm={12} xs={12}>
               <Outlet></Outlet>
            </Grid>
            <Hidden mdDown>
               <Grid lg={3} md={3}>
                  <Map></Map>
               </Grid>
            </Hidden>
         </Grid>
      </StyledLayout>
   );
};

export default BoardMapLayout;