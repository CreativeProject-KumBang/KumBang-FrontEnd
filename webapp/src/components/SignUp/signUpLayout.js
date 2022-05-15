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

const SignUpLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <Outlet/>
        </ThemeProvider>
    );
}
export default SignUpLayout