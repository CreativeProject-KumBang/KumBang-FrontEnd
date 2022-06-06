import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Api from 'API/Api';

const CodeField = (props) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
                <TextField
                    required
                    fullWidth
                    id="authCode"
                    label="인증코드 입력"
                    name="authCode"
                    size='small'
                    defaultValue={props.authkey}
                    onChange={props.handleField}
                />
                <Grid container justifyContent="flex-end">
                    <Timer setField={props.setField}/>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={props.handleBtn}
                >
                    확인
                </Button>
            </Grid>
        </Grid>
    )
}

export default function Authentication() {

    const [email, setEmail] = useState();
    const [authkey, setAuthkey] = useState();
    const [field, setField] = useState();
    const navigate = useNavigate();

    const codeSubmit = async () => {
        const isEmpty = emptyCheck();
        if (isEmpty === false) {
            alert('입력값이 비었습니다.');
            return false;
        }

        let response = await Api.postAuthEmail(email, authkey);
        if (response.data.response[0] === true) {
            alert('인증 완료');
            navigate('/signup/detail', { state: email });
        } else {
            alert('인증 실패');
        }
    };

    const handleEmail = (event) => {
        setEmail(
            event.target.value
        );
    };
    const handleCode = (event) => {
        setAuthkey(
            event.target.value
        );
    };

    const emptyCheck = () => {
        if (!email) {
            return false;
        }
    };

    const emailCheck = () => {
        //일반 이메일 형식의 정규표현식
        const emailRegex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        //골뱅이 뒤 문자 정규표현식
        const schoolEmailRegex = /(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})/i;
        
        if (emailRegex.test(email) === true) {
            if(schoolEmailRegex.exec(email)[0] === 'kumoh.ac.kr')
                return 2; //학교 이메일 형식입니다.
            else 
                return 1; //학교 이메일 형식이 아닙니다.
        }
        else {
            return 0; //이메일 형식이 아닙니다.
        }
    }

    const sendMail = async () => {
        const isEmpty = emptyCheck();
        if (isEmpty === false) {
            alert('이메일 주소를 입력하세요.');
            return false;
        }
        else {
            const isEmail = emailCheck();
            if (isEmail === 0) {
                alert('이메일 주소 형식이 아닙니다.');
                return false;
            }
            else if (isEmail === 1) {
                alert('학교 이메일 주소를 입력하셔야 합니다.');
                return false;
            }
            else {
                let response = await Api.postEmail(email);
                console.log(response)
                if (response.data.status === true) {
                    alert('전송 완료! 학교 메일함을 확인해주세요.');
                    setField(true);
                } else {
                    alert(response.data.response[0]);
                }
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 15,
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h1" sx={{ mb: 10 }}>
                    금방에 오신 것을 환영합니다.
                </Typography>
                <Typography variant="p" >
                    본인 확인을 위해 학교 이메일 주소를 입력해주세요.
                </Typography>
                <Grid>
                    <Grid container spacing={1} sx={{ mt: 1, mb: 3 }}>
                        <Grid item xs={12} sm={8} >
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="학교 이메일 주소 입력"
                                name="email"
                                autoComplete="email"
                                size='small'
                                defaultValue={email}
                                onChange={handleEmail}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                color="secondary"
                                onClick={sendMail}
                            >
                                인증코드 전송
                            </Button>
                        </Grid>
                    </Grid>
                    {field && <CodeField authkey={authkey} handleField={handleCode} handleBtn={codeSubmit} setField={setField}/>}
                </Grid>
            </Box>
        </Container>
    );
}

const Timer = (props) => {
    const [min, setMin] = useState(2);
    const [sec, setSec] = useState(59);
    const time = useRef(179); //useRef는 값이 변화하더라도 리랜더링을 발생시키지 않아서 useEffect를 호출하지 않음
    const timerId = useRef(null);
    const [isOne, setIsOne] = useState(false);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);

            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect((props) => {
        //만약 타임 아웃이 발생했을 경우
        if (time.current < 0) {
            console.log("time out!!");
            clearInterval(timerId.current);
            //인증코드 필드 없애기
            props.setField(false);
            alert("시간초과! 다시 인증코드를 전송하세요.")
        }
        //초가 한자리일 경우 true
        if(parseInt(sec, 10) < 10) {
            setIsOne(true);
        }
        //초가 두자리일 경우 false
        else if(parseInt(sec, 10) >= 10) {
            setIsOne(false);
        }
    }, [sec])

    return (
        <div className='timer' style={{ color: 'red' }}>
            {
                isOne ? <>{min}:0{sec}</> : <>{min}:{sec}</>
            }
        </div>
    )
}
