import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import BoardCard from 'components/RoomBoard/readMyRoomBoard/BoardCard';
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

const ReadMyRoomBoardList = () => {

    return (
        <div>
            <StyledDiv>
                <StyledImg alt="icon" src={require("img/금방_수요자.png")} />
                <StyledH2>내가 쓴 글</StyledH2>
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

export default ReadMyRoomBoardList