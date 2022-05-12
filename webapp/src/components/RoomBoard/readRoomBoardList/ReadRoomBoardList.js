import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';
import Divider from '@mui/material/Divider';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import dayjs from "dayjs";
import { Button, TextField } from '@material-ui/core'
import Api from 'API/Api';

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const StyledImg = styled.img`
    width: 10%;
    max-width: 50px;
    padding: 8px 8px 0px 4px;
    object-fit: contain;
    @media only screen and (max-width: 768px) {
        width: 40px;
        text-align: center;
    }
`;

const StyledH2 = styled.h2`
    display: inline-block;
    @media only screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

const StyledDate = styled.div`
    display: inline-block;
    padding: 6px 20px;
    overflow:auto;
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
            <StyledDiv>
                <StyledImg alt="icon" src={require("img/금방_수요자.png")} />
                <StyledH2>방 찾기</StyledH2>
            </StyledDiv>
            <Divider variant="middle" />
            <StyledDiv>
                <StyledDate>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={startDate}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            onChange={date => setStartDate(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </StyledDate>
                    ~
                    <StyledDate>
                    <LocalizationProvider  dateAdapter={AdapterDateFns}>  
                        <DesktopDatePicker 
                            value={endDate}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            onChange={date => setEndDate(date)}
                            required
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </StyledDate>
                <StyledDiv>

                </StyledDiv>
            </StyledDiv>
            <Divider variant="middle" />
            <StyledDiv>
                <BoardCard></BoardCard>
            </StyledDiv>
            
            <div>
                <div id='latitude'></div>
                <div id='longitude'></div>
                <div id='level'></div>
            </div>
        </div>  
    )
}

export default ReadRoomBoardList