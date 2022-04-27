import React from 'react';
import styled from "styled-components";
import BoardWriteComponent from 'components/RoomBoard/createRoomBoard/BoardWriteComponent';

const StyledH2 = styled.h2`
    display: inline-block;
`;

const StyledImg = styled.img`
    width: 3%;
    padding: 8px 8px 0px 4px;
    object-fit: contain;
`;

const CreateRoomBoard = () => {
    return (
        <div>
            <div>
                <StyledImg alt="icon" src={require("img/금방_공급자.png")} />
                <StyledH2>방 내놓기</StyledH2>
            </div>
            
            <BoardWriteComponent> </BoardWriteComponent>
        </div>
        
    )
}

export default CreateRoomBoard