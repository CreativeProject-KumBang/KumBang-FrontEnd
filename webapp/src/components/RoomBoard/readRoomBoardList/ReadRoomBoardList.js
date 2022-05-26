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
import { Box, TextField, Hidden, Grid, InputBase } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from "dayjs";

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
   const [x, setX] = useState();
   const [y, setY] = useState();
   const [level, setLevel] = useState();
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

   // 옵션 사항
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
   const endDateFormat = dayjs(endDate).format("YYYY-MM-DD");

   const onChange = (dates) => {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
   };

   //가격 슬라이더
   const [value, setValue] = useState([1, 20]);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const filterSearch = async () => {
      let response = await Api.postLogin(postBody.email, postBody.password);
  
      if (response.data.result === "success") {
        const target = '/';
        sessionStorage.setItem('user', JSON.stringify(response.data, ['accessToken', 'refreshToken']))
        window.location.href = target;
      }
      else if(response.data.result === "fail") {
        alert('로그인 실패');
      }
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
               <Box>
                  <h3>조건 검색 <IconButton><FilterAltIcon sx={{ fontSize: 30 }} color='primary' /></IconButton> </h3>
                  <h4>양도 기간</h4>
                  <FormControl>
                     <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="전체"
                        //value={value}
                        //onChange={handleChange}
                        name="radio-buttons-group"
                     >
                        <FormControlLabel value="전체" control={<Radio />} label="전체" />
                        <FormControlLabel value="단기" control={<Radio />} label="단기" />
                        <FormControlLabel value="장기" control={<Radio />} label="장기" />
                     </RadioGroup>
                  </FormControl>
                  <h4>가격
                     <span style={{ marginLeft: 10, color: 'deeppink' }}>{value[0]}만원 ~ {value[1]}만원</span>
                  </h4>
                  <Box sx={{ marginLeft: 2, marginBottom: 3, width: 260 }}>
                     <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={1}
                        max={20}
                     />
                  </Box>
                  <Button
                     fullWidth
                     variant="contained"
                     color="secondary"
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