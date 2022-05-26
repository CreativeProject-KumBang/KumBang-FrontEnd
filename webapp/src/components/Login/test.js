// import React, { useState } from 'react';
// import { Box, TextField, Box } from '@mui/material';
// import DatePicker from 'react-datepicker';

// const DatePickerComponent = () => {
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const onChange = (dates) => {
//        setStartDate(dates[0]);
//        setEndDate(dates[1]);
//      };

//     return (
//         <Box>
//         <Box
//         sx={{ display: 'inline-block', marginRight: 5 }}
//      >
//         <StyledH1>시작일 : </StyledH1>
//         <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ marginTop: 2 }}>
//            <DesktopDatePicker
//               value={startDate}
//               inputFormat={"yyyy-MM-dd"}
//               mask={"____-__-__"}
//               onChange={date => setStartDate(date)}
//               renderInput={(params) => <TextField {...params} />}
//            />
//         </LocalizationProvider>
//      </Box>
//      <Box
//         sx={{ display: 'inline-block' }}
//      >
//         <StyledH1>종료일 : </StyledH1>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//            <DesktopDatePicker
//               value={endDate}
//               inputFormat={"yyyy-MM-dd"}
//               mask={"____-__-__"}
//               onChange={date => setEndDate(date)}
//               required
//               renderInput={(params) => <TextField {...params} />}
//            />
//         </LocalizationProvider>
//      </Box>
//      </Box>
//     );
//   };

//   export default DatePickerComponent;