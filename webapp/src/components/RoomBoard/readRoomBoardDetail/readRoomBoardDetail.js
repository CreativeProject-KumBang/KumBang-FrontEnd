import React from 'react';
import styled from "styled-components";
import BoardReadComponent from 'components/RoomBoard/readRoomBoardDetail/BoardReadComponent'

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
            <BoardReadComponent> </BoardReadComponent>
        </div>
        
    )
}

export default ReadRoomBoardDetail