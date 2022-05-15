import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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

export default function Authentication() {
    const emailSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });
        CodeField(event);
    };

    const codeSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            code: data.get('verificationCode'),
        });
    };

    const CodeField = (e) => {
        e.preventDefault();
        const rootElement = document.getElementById('box');
        const element = React.createElement('div', {
            children:
            <ThemeProvider theme={theme}>
                <Grid container component="form" onSubmit={codeSubmit} spacing={1}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            fullWidth
                            name="verificationCode"
                            label="인증코드 입력"
                            //type="password"
                            id="verificationCode"
                            size='small'
                        />
                        <Grid container justifyContent="flex-end">
                            <Timer />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="secondary"
                            href={`/signup/detail`}
                        >
                            확인
                        </Button>
                    </Grid>
                </Grid>
            </ThemeProvider>
        })
        ReactDOM.hydrate(element, rootElement);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    flexDirection: 'column',
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    금방에 오신 것을 환영합니다.
                </Typography>
                <Grid container justifyContent="center" component="p" sx={{ mt: 5 }}>
                    본인 확인을 위해 학교 이메일 주소를 입력해주세요.
                </Grid>
                <div id='box'>
                    <Grid container component="form" onSubmit={emailSubmit} spacing={1} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="학교 이메일 주소 입력"
                                name="email"
                                autoComplete="email"
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="secondary"
                            // href='인증코드 전송 url'
                            >
                                인증코드 전송
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}


const Timer = () => {
    const [min, setMin] = useState(2);
    const [sec, setSec] = useState(59);
    const time = useRef(179); //useRef는 값이 변화하더라도 리랜더링을 발생시키지 않아서 useEffect를 호출하지 않음
    const timerId = useRef(null);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        //만약 타임 아웃이 발생했을 경우
        if (time.current <= 0) {
            console.log("time out!!");
            clearInterval(timerId.current);
            //인증번호 취소? 이벤트 주루룱
        }
    }, [sec])

    return (
        <div className='timer' style={{ color: 'red' }}>
            {min}:{sec}
        </div>
    )
}
