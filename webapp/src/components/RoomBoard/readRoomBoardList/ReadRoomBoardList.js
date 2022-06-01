import React, { ReactDOM, useEffect, useState } from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MapIcon from '@mui/icons-material/Map';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Divider, IconButton, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Link, Box, Button, TextField, Hidden, Grid, Container } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from "dayjs";
import Api from 'API/Api';
import Header from 'components/Layout/Header/header';
import Map from 'components/Map/Map';
import ReadRoomBoardDetail from 'components/RoomBoard/readRoomBoardDetail/readRoomBoardDetail';
import { Outlet, useOutletContext } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from 'components/SignIn/Login';


const theme = createTheme({
   palette: {
      primary: {
         main: '#ffca00',
         
      },
      secondary: {
         main: '#ffb000',
     },
      info: {
         main: '#000000'
      },
   },
   typography: {
      poster: {
        color: '#1565c0',
      },
    },
});

const ReadRoomBoardList = () => {
   const [x, setX] = useState(128.41015);
   const [y, setY] = useState(36.13654);
   const [level, setLevel] = useState(5);

   //날짜 캘린더
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
   const endDateFormat = (endDate === null) ? startDateFormat : dayjs(endDate).format("YYYY-MM-DD");
   const handleDate = (dates) => {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
   };

   //장단기 라디오버튼
   const [type, setType] = useState('all');
   const handlePeriod = (event, value) => {
      setType(event.target.value);
   }

   //가격 슬라이더
   const [value, setValue] = useState([0, 101000]);
   const handlePrice = (event, newValue) => {
      setValue(newValue);
   };

   //조건 검색 버튼
   const [isFilter, setIsFilter] = useState(false);
   function showFilter() {
      setIsFilter(isFilter => !isFilter);
   }
   //조건 검색 객체
   const filter = {
      x: x,
      y: y,
      level: level,
      startDate: startDateFormat,
      endDate: endDateFormat,
      durationType: type,
      priceStart: value[0],
      priceEnd: value[1]
   }
   //조건 검색한 결과 매물 담기는 곳
   const [getBody, setGetBody] = useState([]);
   //조건 검색 버튼 클릭 이벤트
   const handleFilter = async () => {
      let resBody = await Api.getAllRoomBoard(filter);
      setGetBody(resBody.data.response[0].content);
   };

   //매물 상세정보 펼치기
   const [isDetail, setIsDetail] = useState(false);
   function showDetail() {
      setIsDetail(isDetail => !isDetail);
   }

   //매물 상세 좌표값
   const [cordX, setCordX] = useState(128.41015);
   const [cordY, setCordY] = useState(36.13654);

   return (
      <ThemeProvider theme={theme}>
         <Box pt={'80px'}>
            <Header />
            <Box>
               <Grid container >
                  <Grid container lg={4} md={4} sm={12} xs={12} sx={{position:'relative', overflow:'hidden'}} >
                     <Container component="main" maxWidth={'100%'} sx={{position:'absolute', overflowY: "scroll", height: "calc(100vh - 80px)" }}>
                        <Box alignContent={'center'}>
                           <img src={require("img/금방_수요자.png")} style={{ width: '30px', marginTop: '20px', objectFit: 'contain'}} />
                           <h2 style={{display:'inline-block', marginLeft:'10px'}}>방 찾기</h2>
                        </Box>
                        <Box >
                           <Box>
                              <h3>날짜</h3>
                              <Grid container spacing={1} >
                                 <Grid item sx={{ width: '240px' }}>
                                    <DatePicker
                                       selected={startDate}
                                       onChange={handleDate}
                                       startDate={startDate}
                                       endDate={endDate}
                                       selectsRange
                                       locale={'ko'}
                                       dateFormat="yyyy.MM.dd"
                                       showPopperArrow={false}
                                       customInput={<TextField fullWidth InputProps={{ endAdornment: <DateRangeIcon /> }} />}
                                    />
                                 </Grid>
                                 <Grid item >
                                    <Button
                                       variant="contained"
                                       color="grey"
                                       size='large'
                                       onClick={handleFilter}
                                       style={{ padding: "15px 0px" }}
                                    >
                                       <SearchIcon />
                                    </Button>
                                 </Grid>
                              </Grid>
                              <Divider sx={{ marginTop: '22px', marginRight: '10px' }} />
                              <h3>조건 검색 <IconButton onClick={showFilter}><FilterAltIcon sx={{ fontSize: 30 }} color='primary' /></IconButton> </h3>
                              {isFilter &&
                                 <Box mr={3} >
                                    <h4>양도 기간</h4>
                                    <FormControl sx={{ marginLeft: 1, marginBottom: 1 }}>
                                       <RadioGroup
                                          row
                                          aria-labelledby="demo-radio-buttons-group-label"
                                          defaultValue="all"
                                          name="radio-buttons-group"
                                       >
                                          <FormControlLabel value="all" control={<Radio />} label="전체" onClick={handlePeriod} />
                                          <FormControlLabel value="short" control={<Radio />} label="단기" onClick={handlePeriod} />
                                          <FormControlLabel value="long" control={<Radio />} label="장기" onClick={handlePeriod} />
                                       </RadioGroup>
                                    </FormControl>
                                    <h4>가격
                                       <Typography variant="poster" sx={{ marginLeft: 3 }}>{value[0] === 0 ? '제한없음' : value[0] + '원'} ~ {value[1] === 101000 ? '제한없음' : value[1] + '원'}</Typography>
                                    </h4>
                                    <Box sx={{ marginLeft: 2, marginBottom: 1, width: 260 }}>
                                       <Slider
                                          value={value}
                                          onChange={handlePrice}
                                          valueLabelDisplay="off"
                                          step={1000}
                                          min={0}
                                          max={101000}
                                       />
                                    </Box>
                                    <Button
                                       fullWidth
                                       variant="contained"
                                       color="primary"
                                       sx={{ mt: 2, mb: 1 }}
                                       onClick={handleFilter}
                                    >
                                       검색
                                    </Button>
                                 </Box>
                              }
                           </Box>
                        </Box>
                        <Divider sx={{ marginTop: '22px', marginRight: '10px', marginBottom: '22px' }} />
                        <BoardCard getBody={getBody} setIsDetail={setIsDetail}></BoardCard>
                     </Container>
                     {isDetail && 
                        <Container component="main"  maxWidth={'100%'} sx={{ position:'absolute', backgroundColor:'white', overflowY: "scroll", height: "calc(100vh - 80px)" }}>
                           <IconButton onClick={showDetail} color="info" sx={{marginTop:'20px'}}><ArrowBackIosIcon/></IconButton>
                           <ReadRoomBoardDetail setX={setCordX} setY={setCordY}/>
                        </Container>
                     }
                  </Grid>
                  <Grid lg={8} md={8} sx={{ height: 'calc(100vh - 80px)' }} >
                     <Map filter={filter} cordX={cordX} cordY={cordY} getBody={getBody} setGetBody={setGetBody} setX={setX} setY={setY} setL={setLevel} />
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </ThemeProvider>
   )
}

export default ReadRoomBoardList