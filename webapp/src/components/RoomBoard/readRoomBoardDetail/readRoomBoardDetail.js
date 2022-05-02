import React from 'react';
import styled from "styled-components";
import BoardDetail from 'components/RoomBoard/readRoomBoardDetail/BoardDetail'

const StyledH2 = styled.h2`
    display: inline-block;
`;

const StyledImg = styled.img`
    width: 3%;
    padding: 8px 8px 0px 4px;
    object-fit: contain;
`;

const ReadRoomBoardDetail = () => {
    return (
        <div>
            <BoardDetail> </BoardDetail>
        </div>
        
    )
}

export default ReadRoomBoardDetail