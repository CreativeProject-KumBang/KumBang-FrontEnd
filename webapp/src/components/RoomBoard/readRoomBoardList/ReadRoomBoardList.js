import React, { ReactDOM, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MapIcon from '@mui/icons-material/Map';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Divider, IconButton, Paper, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Link, Box, Button, TextField, Hidden, Grid, InputBase } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from "dayjs";
import Api from 'API/Api';
import Header from 'components/Layout/Header/header';
import Map from 'components/Map/Map';
import ReadRoomBoardDetail from 'components/RoomBoard/readRoomBoardDetail/readRoomBoardDetail';
import { useOutletContext } from 'react-router-dom';

const StyledImg = styled.img`
    width: 10%;
    max-width: 50px;
    min-width: 30px;
    padding: 8px 8px 0px 4px;
    object-fit: contain;
`;

const StyledH2 = styled.h2`
    display: inline-block;
`;

const ReadRoomBoardList = () => {
   const [x, setX] = useState(128.41015);
   const [y, setY] = useState(36.13654);
   const [level, setLevel] = useState(5);

   //조건 검색 버튼
   const [isFilter, setIsFilter] = useState(false);
   function showFilter(){
      setIsFilter(isFilter=>!isFilter);
   }

   //날짜 캘린더
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
   const endDateFormat = (endDate === null)? startDateFormat : dayjs(endDate).format("YYYY-MM-DD");
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
   const handleFilter = async () => {
      let resBody = await Api.getAllRoomBoard(filter);
      setGetBody(resBody.data.response[0].content);
      console.log(resBody)
   };
   
   const response = async () => await Api.getAllRoomBoard(filter);
   const [getBody, setGetBody] = useState([]);
   
   useEffect(() => {
      console.log(filter)
      const getData = async() => {
         const resBody = await response();
         console.log(resBody);

         setGetBody(resBody.data.response[0].content);
      }
      getData();
   }, []);

   return (
      <Box pt={'80px'}>
         <Header />
         <Box>
            <Grid container >
               <Grid lg={4} md={4} sm={12} xs={12} >
                  <Box sx={{ marginLeft: 0.5, paddingLeft: '10px', overflowY: "scroll", height: "calc(100vh - 80px)" }}>
                     <Box>
                        <StyledImg alt="icon" src={require("img/금방_수요자.png")} />
                        <StyledH2>방 찾기</StyledH2>
                     </Box>
                     <Box >
                        <Box>
                           <h3>날짜</h3>
                           <DatePicker
                              selected={startDate}
                              onChange={handleDate}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              locale={'ko'}
                              dateFormat="yyyy.MM.dd"
                              showPopperArrow={false}
                              customInput={<TextField sx={{ width: '240px' }} InputProps={{ endAdornment: <DateRangeIcon /> }} />}
                           />
                           <Divider sx={{ marginTop: '22px', marginRight: '22px' }} />
                           <h3>조건 검색 <IconButton onClick={showFilter}><FilterAltIcon sx={{ fontSize: 30 }} color='primary' /></IconButton> </h3>
                           {isFilter &&
                           <Box mr={3}>
                              <h4>양도 기간</h4>
                              <FormControl>
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
                                 <span style={{ marginLeft: 10, color: 'deeppink' }}>{value[0] === 0 ? '제한없음' : value[0] + '원'} ~ {value[1] === 101000 ? '제한없음' : value[1] + '원'}</span>
                              </h4>
                              <Box sx={{ marginLeft: 2, marginBottom: 3, width: 260 }}>
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
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleFilter}
                                 >
                                    검색
                                 </Button>
                              
                           </Box>
                           }
                        </Box>
                     </Box>
                     <Divider sx={{ marginTop: '22px', marginRight: '22px', marginBottom: '22px' }} />
                     <BoardCard getBody={getBody}></BoardCard>
                  </Box>
               </Grid>
               <Grid lg={8} md={8} sx={{ height: 'calc(100vh - 80px)' }} >
                  <Map filter={filter} getBody={getBody} setX={setX} setY={setY} setL={setLevel} />
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}

export default ReadRoomBoardList