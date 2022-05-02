import React from 'react';
import styled from "styled-components";
import BoardWriteComponent from 'components/RoomBoard/createRoomBoard/BoardWriteComponent';
import Divider from '@mui/material/Divider';

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

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const StyledH2 = styled.h2`
    display: inline-block;
    @media only screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

const CreateRoomBoard = () => {
    return (
        <div>
            <StyledDiv>
                <StyledImg alt="icon" src={require("img/금방_공급자.png")} />
                <StyledH2>방 내놓기</StyledH2>
                <Divider variant="middle" />
            </StyledDiv>
            <StyledDiv>
                <BoardWriteComponent> </BoardWriteComponent>
            </StyledDiv>
        </div>
        
    )
}

export default CreateRoomBoard