import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Api from 'API/Api';


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

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [postBody, setPostBody] = useState({
    email: '',
    password: ''
  });

  const handleidChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      email: event.target.value
    }));
  };
  const handlepwChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      password: event.target.value
    }));
  };
  const handleLogin = async () => {
    const isEmpty = emptyCheck();
    if (isEmpty === false) {
      alert('아이디, 비밀번호를 입력하세요');
      return false;
    }

    let response = await Api.postLogin(postBody.email, postBody.password);

    if (response.data.result === "success") {
      alert('로그인 성공');
      const target = '/';
      sessionStorage.setItem('user_data', JSON.stringify(response.user));
      sessionStorage.setItem('user_token', response.token);
      window.location.href = target;
    } else {
      alert('로그인 실패');
    }
  };
  const emptyCheck = () => {
    if (postBody.email === '' || postBody.password === '') {
      return false;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          {/* <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}> */}
            <Box sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    defaultValue={postBody.email}
                    onChange={handleidChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    defaultValue={postBody.password}
                    onChange={handlepwChange}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                >
                    로그인
                </Button>
            </Box>
            <Link href="signup" variant="body2" color="#000" >
                회원가입
            </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}