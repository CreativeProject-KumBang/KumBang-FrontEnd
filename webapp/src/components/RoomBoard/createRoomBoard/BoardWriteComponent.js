import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Button, TextField, Container, Divider } from '@mui/material'
import dayjs from "dayjs";
import Api from 'API/Api';
import Images from 'components/RoomBoard/createRoomBoard/Images'
import DaumPost from 'components/RoomBoard/createRoomBoard/DaumPost'
import CheckboxList from 'components/RoomBoard/createRoomBoard/CheckboxList';
import Box from '@mui/material/Box';
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
   padding: 30px 10px 30px 0px;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const BoardWriteComponent = () => {
   const navigate = useNavigate();

   const [id, setId] = useState('');
   const [title, setTitle] = useState(''); // 제목
   const [content, setContent] = useState(''); // 내용
   const [location, setLocation] = useState(''); // 양도 매물 주소 - 주소
   const [location_detail, setLocation_detail] = useState(''); // 양도 매물 주소 - 상세 주소
   // 양도 기간(duraion)
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
   const endDateFormat = dayjs(endDate).format("YYYY-MM-DD");
   // 양도 거래금액
   const [price, setPrice] = useState('');
   const [deposit, setDeposit] = useState('');
   // 원 계약보증금/월세
   const [contract_deposit, setContract_deposit] = useState('');
   const [contractMonthlyFee, setContractMonthlyFee] = useState('');
   // 매물 정보 HomeInfo
   const [park, setPark] = useState(''); // 주차
   const [elevator, setElevator] = useState(''); // 엘리베이터
   const [structure, setStructure] = useState(''); // 구조
   const [admin_expense, setAdmin_expense] = useState(''); // 관리비
   const [area, setArea] = useState(''); // 면적
   const [contain_admin_expense, setContain_admin_expense] = useState(''); // 관리비 포함 항목

   // 옵션 사용 가능 정보
   const checkList = ["에어컨", "냉장고", "세탁기", "가스레인지", "전자레인지", "책상", "책장", "옷장", "신발장"];
   const [checked, setChecked] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
   const [options, setOptions] = useState(''); // 에어컨, 냉장고, 세탁기, 가스레인지, 전자레인지, 책상, 책장, 옷장, 신발장
   const [add_options, setAdd_options] = useState(''); // 옵션 사용 가능 정보 - 추가

   // 이미지 - 컴포넌트 연결
   const [pk_id, setPk] = useState([]);

   /* !--------------------------------API--------------------------------! */
   const postBody = {
      title: title,
      content: content,
      user: { "id": id },
      location: location,
      locationDetail: location_detail,
      durationStart: startDateFormat,
      durationEnd: endDateFormat,
      price: price, // 양도 거래 금액
      deposit: deposit, // 양도 거래 보증금
      contractDeposit: contract_deposit, // 방 원래 주인이 계약한 보증금
      contractMonthlyFee: contractMonthlyFee, // 방 원래 주인이 계약한 월세
      contractDeposit: contract_deposit,
      contractMonthlyFee: contractMonthlyFee,
      fixedOption: checked,
      additionalOption: add_options,
      details: {
         "parking": park,
         "elevator": elevator,
         "roomStructure": structure,
         "managementFee": admin_expense,
         "containManageFee": contain_admin_expense,
         "areaSize": area
      },
      files: pk_id[0]
   };


   async function emptyCheck() {
      if (title.trim() === '') {
         alert('제목을 입력해주세요');
         return false;
      } else if (location.trim() === '') {
         alert('주소를 입력해주세요');
         return false; 
      } else if (price.trim() === '') {
         alert('양도 거래 가격을 입력해주세요');
         return false;
      } else if (deposit.trim() === '') {
         alert('양도 거래 보증금을 입력해주세요');
         return false;
      } else if (contract_deposit.trim() === '') {
         alert('원 계약보증금을 입력해주세요');
         return false;
      // } else if (contractMonthlyFee.trim() === '') {
      //    alert('원 월세를 입력해주세요');
      //    return false;
      }
      return true;
   }

   const CreateRoomBoard = async () => {

      const isEmpty = await emptyCheck();
      if (isEmpty === false) {
         return;
      } else {
         console.log(postBody);
         let response = await Api.postRoomBoard(postBody); // API
   
         console.log(response);
   
         if (response.data.status) {
            alert('등록되었습니다.', response.data.status);
            navigate('/');
         } else {
            alert('등록 실패하였습니다.', response.data.status);
         }
      }
   }

   return (
      <Container component="main" maxWidth="xs">
         <Box sx={{
            marginTop: 8,
            marginRight: 2,
            flexDirection: 'column',
            alignItems: 'center',
         }}>
            <StyledH4>제목<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수)</span></StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="제목"
                  onChange={(event) => setTitle(event.target.value)}
               />
            </StyledDiv>

            <StyledH4>내용</StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="내용"
                  multiline
                  rows={5}
                  onChange={(event) => setContent(event.target.value)}
               />
            </StyledDiv>

            <br></br>
            <Divider variant="middle" />
            <br></br>

            <StyledH4>주소<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수)</span></StyledH4>
            <StyledDiv>
               <DaumPost setLocation={setLocation}></DaumPost>
               <StyledH5>{location}</StyledH5>
            </StyledDiv>

            <StyledH4>상세주소</StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="상세 주소"
                  onChange={(event) => setLocation_detail(event.target.value)}
               />
            </StyledDiv>
            
            <br></br>
            <br></br>
            <Divider variant="middle" />
            <br></br>

            <StyledH4>양도 기간<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수)</span></StyledH4>

            <StyledH5>시작일 : </StyledH5>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DesktopDatePicker
                  value={startDate}
                  inputFormat={"yyyy-MM-dd"}
                  mask={"____-__-__"}
                  onChange={date => setStartDate(date)}
                  renderInput={(params) => <TextField {...params} />}
               />
            </LocalizationProvider>

            <StyledH5>종료일 : </StyledH5>
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

            <br></br>
            <br></br>
            <br></br>
            <Divider variant="middle" />
            <br></br>

            <StyledH4>양도 거래 보증금<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수)</span></StyledH4>
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

            <StyledH4>양도 거래금액 / 1박<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수)</span></StyledH4>
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

            <br></br>
            <Divider variant="middle" />
            <br></br>

            <StyledH4>원 계약보증금<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수)</span></StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="계약보증금"
                  onChange={(event) => setContract_deposit(event.target.value)}
               />
            </StyledDiv>

            <StyledH4>원 월세<span style={{ fontSize: "12px", color: "red"}}>&emsp;(필수, 전세일 경우 월세 입력이 필수가 아닙니다)</span></StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="월세"
                  onChange={(event) => setContractMonthlyFee(event.target.value)}
               />
            </StyledDiv>

            <br></br>
            <Divider variant="middle" />
            <br></br>

            <h4>매물 정보</h4>

            <StyledH5>주차</StyledH5>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 1대 가능"
                  onChange={(event) => setPark(event.target.value)}
               />
            </StyledDiv>

            <StyledH5>엘리베이터</StyledH5>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 없음"
                  onChange={(event) => setElevator(event.target.value)}
               />
            </StyledDiv>

            <StyledH5>구조</StyledH5>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 오픈형 원룸(욕실 1개)"
                  onChange={(event) => setStructure(event.target.value)}
               />
            </StyledDiv>

            <StyledH5>관리비</StyledH5>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 4만원 관리비 외 사용따라 부과"
                  onChange={(event) => setAdmin_expense(event.target.value)}
               />
            </StyledDiv>

            <StyledH5>면적</StyledH5>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 19.78m2"
                  onChange={(event) => setArea(event.target.value)}
               />
            </StyledDiv>

            <StyledH4>관리비 포함 항목</StyledH4>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="ex) 0만원(전기, 가스 별도)
                    ex) 4만원(전기, 가스 별도) - wifi, 수도세, 티비"
                  onChange={(event) => setContain_admin_expense(event.target.value)}
               />
            </StyledDiv>

            <br></br>
            <Divider variant="middle" />
            <br></br>

            <StyledH4>옵션 사용 가능 정보</StyledH4>
            <StyledDiv>
               <CheckboxList checked={checked} setChecked={setChecked}></CheckboxList>
            </StyledDiv>

            <StyledH5>추가 옵션 가능 정보</StyledH5>
            <StyledDiv>
               <TextField
                  fullWidth
                  hiddenLabel
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                  placeholder="추가 옵션 가능 정보"
                  onChange={(event) => setAdd_options(event.target.value)}
               />
            </StyledDiv>

            <div>
               <StyledH4>이미지 첨부</StyledH4>
               <StyledDiv>
                  <Images pk_id={pk_id} setPk={setPk} />
               </StyledDiv>
            </div>

            <StyledContainer>
            <ThemeProvider theme={theme}>
               <Button variant="contained" color="primary" sx={{ float: 'right' }}
                  onClick={CreateRoomBoard}>
                  등록
               </Button>
            </ThemeProvider>
            </StyledContainer>
         </Box>
      </Container>
   )
}

export default BoardWriteComponent