import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Layout/Header/header';
import Footer from 'components/Layout/Footer/footer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { mainListItems } from './menu2';
import Info from './info';

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

const MypageLayout2 = () => {
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
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <List component="nav" sx={{ paddingTop: '30px', textAlign: 'center', backgroundColor: 'rgb(254, 248, 220)' }}>
                                {mainListItems}
                            </List>
                        </Grid>
                        <Grid item  lg={9} md={9} sx={{ display: { md: 'block', xs: 'none' }, padding: 3, paddingTop: 1}}>
                            <Grid >
                                <Info />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default MypageLayout2;
