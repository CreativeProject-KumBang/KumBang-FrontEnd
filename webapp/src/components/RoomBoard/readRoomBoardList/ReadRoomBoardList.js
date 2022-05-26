import React, { useState } from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MapIcon from '@mui/icons-material/Map';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Divider, IconButton, Paper, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import { Box, Button, TextField, Hidden, Grid, InputBase } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from "dayjs";
import Api from 'API/Api';

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

const StyledH1 = styled.h3`
`;

const ReadRoomBoardList = () => {
   // const [x, setX] = useState();
   // const [y, setY] = useState();
   // const [level, setLevel] = useState();
   /*
      function setMapData(latitude, longitude, level_map) {
   
         if (latitude === null || longitude === null || level === null) {
            console.log("latitude === null || longitude === null || level === null");
         } else {
            setX(latitude.innerText);
            setY(longitude.innerText);
            setLevel(level_map.innerText);
            useEffect(() => {
               console.log(x, y, level);
            });
         }
   
         let response = Api.getAllRoomBoard(x, y, level);
         console.log(response);
      }
   */
//   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
//   const endDateFormat = dayjs(endDate).format("YYYY-MM-DD");

   // 옵션 사항
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜

   const onChange = (dates) => {
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

   const [postBody, setPostBody] = useState({
      x: 128.41015,
      y: 36.13654,
      level: 5,
      durationType: type,
      durationStart: dayjs(startDate).format("YYYY-MM-DD"),
      durationEnd: dayjs(endDate).format("YYYY-MM-DD"),
      priceStart: value[0],
      priceEnd: value[1]
    });

   const filterSearch = async () => {
      let response = await Api.getAllRoomBoard(postBody);
      console.log(response);
   };

   return (
      <div style={{ paddingLeft: '10px' }}>
         <Box>
            <StyledImg alt="icon" src={require("img/금방_수요자.png")} />
            <StyledH2>방 찾기</StyledH2>
         </Box>
         <Box >
            {/* <Box>
               검색창
               <FilterAltIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} />
               <SearchIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} />
               <Hidden mdUp>
                  <MapIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} ></MapIcon>
               </Hidden>
            </Box> */}

            <Box>
               <h3>날짜</h3>
               <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  locale={'ko'}
                  dateFormat="yyyy.MM.dd"
                  showPopperArrow={false}
                  customInput={<TextField sx={{ width: '240px' }} InputProps={{endAdornment: <DateRangeIcon />}} />}
               />
               <Divider sx={{ marginTop: '22px', marginRight: '22px'}}/>
               <Box mr={3}>
                  <h3>조건 검색 <IconButton><FilterAltIcon sx={{ fontSize: 30 }} color='primary' /></IconButton> </h3>
                  <h4>양도 기간</h4>
                  <FormControl>
                     <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="all"
                        
                        name="radio-buttons-group"
                     >
                        <FormControlLabel value="all" control={<Radio />} label="전체" onClick={handlePeriod}/>
                        <FormControlLabel value="short" control={<Radio />} label="단기" onClick={handlePeriod}/>
                        <FormControlLabel value="long" control={<Radio />} label="장기" onClick={handlePeriod}/>
                     </RadioGroup>
                  </FormControl>
                  <h4>가격
                     <span style={{ marginLeft: 10, color: 'deeppink' }}>{value[0]===0?'제한없음':value[0]+'원'} ~ {value[1]===101000?'제한없음':value[1]+'원'}</span>
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
                     onClick={filterSearch}
                  >
                     검색
                  </Button>
               </Box>
            </Box>
         </Box>
         <Divider sx={{ marginTop: '22px', marginRight: '22px', marginBottom: '22px' }}/>
         <BoardCard></BoardCard>

         <Box>
            <Box id='latitude'></Box>
            <Box id='longitude'></Box>
            <Box id='level'></Box>
         </Box>
      </div>
   )
}

export default ReadRoomBoardList