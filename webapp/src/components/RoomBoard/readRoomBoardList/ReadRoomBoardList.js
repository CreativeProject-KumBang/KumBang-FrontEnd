import React, { useState } from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MapIcon from '@mui/icons-material/Map';
import { Box, TextField, Hidden } from '@mui/material';
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

   // 옵션 사항
   const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
   const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
   const startDateFormat = dayjs(startDate).format("YYYY-MM-DD");
   const endDateFormat = dayjs(endDate).format("YYYY-MM-DD");

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

   return (
      <div>
         <Box>
            <StyledImg alt="icon" src={require("img/금방_수요자.png")} />
            <StyledH2>방 찾기</StyledH2>
         </Box>
         <Box sx={{ marginBottom: 3 }}>
            <Box>
               검색창
               <FilterAltIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} />
               <SearchIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} />
               <Hidden mdUp>
                  <MapIcon sx={{ fontSize: 30 }} style={{ marginRight: '1%' }} ></MapIcon>
               </Hidden>
            </Box>

            <Box
               sx={{ display: 'inline-block', marginRight: 5 }}
            >
               <StyledH1>시작일 : </StyledH1>
               <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ marginTop: 2 }}>
                  <DesktopDatePicker
                     value={startDate}
                     inputFormat={"yyyy-MM-dd"}
                     mask={"____-__-__"}
                     onChange={date => setStartDate(date)}
                     renderInput={(params) => <TextField {...params} />}
                  />
               </LocalizationProvider>
            </Box>
            <Box
               sx={{ display: 'inline-block' }}
            >
               <StyledH1>종료일 : </StyledH1>
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
            </Box>
         </Box>
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