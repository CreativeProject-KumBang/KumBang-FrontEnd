import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from 'components/Layout/Header/header';

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

const ReadRoomBoardLayout = () => {
    return(
        <ThemeProvider theme={theme}>
            <Header />
            <Container component="main" maxWidth="md" sx={{paddingTop: '80px'}}>
                <Outlet/>
            </Container>
        </ThemeProvider>
    )
}

export default ReadRoomBoardLayout