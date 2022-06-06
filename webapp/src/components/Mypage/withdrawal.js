import React from 'react';
import styled from "styled-components";
import Api from 'API/Api';
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

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 30px;

  /* 크기 */
  width: 80px;
  height: 40px;
  font-size: 18px;

  /* 색상 */
  background: orange;
  &:hover {
    background: yellow;
  }
  &:active {
    background: black;
  }
`;

const Withdrawal = (props) => {

    const handleWithdrawal = async () => {
        let response = await Api.getWithdrawal();
        console.log(response);
        if (response.data.response[0] === "success") {
          const target = '/';
          sessionStorage.removeItem('user');
          window.location.href = target;
        }
        else if(response.data.response[0] === "fail") {
          alert('회원 탈퇴 실패');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledBox>
            <Typography variant='h1' sx={{
              display: 'block',
              height: '40px',
              marginTop: '30px',
              marginBottom: '30px',
            }}>회원 탈퇴
            </Typography>
            <p style={{ display: 'block' }}>
                정말로 떠나시겠어요?
            </p>
            <></>
            <StyledButton
                onClick={handleWithdrawal}  
            >
                네
            </StyledButton>
        </StyledBox>
        </ThemeProvider>
    );
};

export default Withdrawal