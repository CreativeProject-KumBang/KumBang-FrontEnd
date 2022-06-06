import React, { useState } from 'react';
import styled from "styled-components";
import { Hidden, Divider } from '@mui/material'
import ChatCard from 'components/Chat/readChatList/ChatCard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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

theme.typography.h1 = {
   fontSize: '20px',
   [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
   },
};

const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const StyledTop = styled.div`
    display: block;
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const StyledTopSmall = styled.div`
    display: block;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const ReadChatList = () => {


   return (
      <ThemeProvider theme={theme}>
         <StyledBox>
            <Typography variant='h1' sx={{
               display: 'block',
               height: '40px',
               marginTop: '30px',
               marginBottom: '30px',
            }}>채팅 내역
            </Typography>

            <Divider />
            <ChatCard></ChatCard>
         </StyledBox>
      </ThemeProvider>
   );
}

export default ReadChatList