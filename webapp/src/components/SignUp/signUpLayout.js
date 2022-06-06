import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    fontSize: '1.7rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
};

theme.typography.p = {
    fontSize: '16px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
    },
};

const SignUpLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <Outlet/>
        </ThemeProvider>
    );
}
export default SignUpLayout