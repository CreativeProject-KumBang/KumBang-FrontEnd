import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';
import Divider from '@mui/material/Divider';
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

    return (
        <div>
            <StyledDiv>
                <StyledImg alt="icon" src={require("img/금방_수요자.png")} />
                <StyledH2>방 찾기</StyledH2>
                <Divider variant="middle" />
            </StyledDiv>
            <StyledDiv>
                <BoardCard></BoardCard>
            </StyledDiv>
            
            <div id='latitude'></div>
            <div id='longitude'></div>
            <div id='level'></div>
        </div>  
    )
}

export default ReadRoomBoardList