import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readRoomBoardList/BoardCard';

const StyledDiv = styled.div`
    padding: 6px 8px;
    overflow:auto;
`;


const ReadRoomBoardList = () => {
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [level, setLevel] = useState();
    
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
        // API 통신 코드 작성
    }

    return (
        <div>
            <StyledDiv>
                <h3>방 찾기</h3>
            </StyledDiv>
            <StyledDiv>
                <BoardCard></BoardCard>
            </StyledDiv>
            <div id='latitude' onChange={setMapData}></div>
            
            <div id='longitude' onChange={setMapData}></div>
        
            <div id='level' onChange={setMapData}></div>
        </div>  
    )
}

export default ReadRoomBoardList