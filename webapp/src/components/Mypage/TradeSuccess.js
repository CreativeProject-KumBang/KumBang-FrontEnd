import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { MenuItem, TextField, Container, Box, Chip } from '@mui/material'
import dayjs from "dayjs";
import Api from 'API/Api';

const StyledH3 = styled.h3``;
const StyledH4 = styled.h4``;
const StyledH5 = styled.h5``;

const StyledDiv = styled.div`
   overflow:auto;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const StyledContainer = styled.div`
   overflow:auto;
   padding: 20px 5px 0px 0px;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const TradeSuccess = (props) => {
   const navigate = useNavigate();
   const title = props.title;
   const boardId = props.boardId;
   const buyerList = props.buyerList;

   const [buyer, setBuyer] = useState(''); // buyer

   // 양도 기간(duraion)
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
   const endDateFormat = dayjs(endDate).format("YYYY-MM-DD");
   // 양도 거래금액
   const [price, setPrice] = useState('');
   const [deposit, setDeposit] = useState('');

   const handleChange = (event) => {
      setBuyer(event.target.value);
   };


   async function emptyCheck() {
      if (buyer.trim() === '') {
         alert('거래자를 입력해주세요');
         return;
      } else if (startDateFormat.trim() === '') {
         alert('양도 기간, 시작일을 입력해주세요');
         return;
      } else if (endDateFormat.trim() === '') {
         alert('양도 기간, 종료일을 입력해주세요');
         return;
      } else if (price.trim() === '') {
         alert('양도 거래 가격을 입력해주세요');
         return;
      } else if (contract_deposit.trim() === '') {
         alert('양도 거래 보증금을 입력해주세요');
         return;
      }
   }
   const CreateTrade = async () => {
      /*
            const isEmpty = emptyCheck();
            if (isEmpty === false) {
               alert(
                  '필수항목란을 채워주세요'
               );
               return false;
            }
      */

      /*
            console.log(postBody);
            let response = await Api.postRoomBoard(postBody); // API
      
            console.log(response);
      
            if (response.data.status) {
               alert('등록되었습니다.', response.data.status);
               navigate('/');
            } else {
               alert('등록 실패하였습니다.', response.data.status);
            }
      */
   }

   return (
      <Container component="main" maxWidth="xs">
         <Box sx={{
            marginTop: 2,
            marginRight: 2,
            flexDirection: 'column',
            alignItems: 'center',
         }}>
            <StyledH3>{title}</StyledH3>
            <StyledH4>거래자 ({buyer})</StyledH4>
            <StyledDiv>
               <TextField
                  id="standard-select-nickname"
                  select
                  label="Select"
                  value={buyer}
                  onChange={handleChange}
                  helperText="Please select buyer"
                  variant="standard"
               >
                  {buyerList.map((option) => (
                     <MenuItem key={option.nickname} value={option.id}>
                        {option.nickname}
                     </MenuItem>
                  ))}
               </TextField>


            </StyledDiv>

            <StyledH4>양도 기간 | 시작일 : </StyledH4>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DesktopDatePicker
                  value={startDate}
                  inputFormat={"yyyy-MM-dd"}
                  mask={"____-__-__"}
                  onChange={date => setStartDate(date)}
                  renderInput={(params) => <TextField {...params} />}
               />
            </LocalizationProvider>

            <StyledH4>양도 기간 | 종료일 : </StyledH4>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DesktopDatePicker
                  value={endDate}
                  inputFormat={"yyyy-MM-dd"}
                  mask={"____-__-__"}
                  onChange={date => setEndDate(date)}
                  required
                  renderInput={(params) => <TextField {...params} />}
               />
            </LocalizationProvider>

            <StyledH4>양도 거래금액</StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 30000"
                  onChange={(event) => setPrice(event.target.value)}
               />
            </StyledDiv>

            <StyledH4>양도 거래 보증금</StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 30000"
                  onChange={(event) => setDeposit(event.target.value)}
               />
            </StyledDiv>

            <StyledContainer>
               <Chip label="거래완료" color="success" variant="outlined" sx={{ float: 'right' }}
                  onClick={CreateTrade}>
               </Chip >
            </StyledContainer>
         </Box>
      </Container>
   )
}

export default TradeSuccess