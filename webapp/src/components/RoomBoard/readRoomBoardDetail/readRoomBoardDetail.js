import React from 'react';
import styled from "styled-components";
import BoardDetail from 'components/RoomBoard/readRoomBoardDetail/BoardDetail'

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const ReadRoomBoardDetail = () => {
    return (
        <div>
            <StyledDiv>
                <BoardDetail> </BoardDetail>
            </StyledDiv>
        </div>
        
    )
}

export default ReadRoomBoardDetail