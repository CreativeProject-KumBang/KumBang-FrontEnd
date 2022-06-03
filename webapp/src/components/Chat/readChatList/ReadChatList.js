import React, { useState } from 'react';
import styled from "styled-components";
import { Hidden, Divider } from '@mui/material'
import ChatCard from 'components/Chat/readChatList/ChatCard';


const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const StyledTop = styled.div`
    display: block;
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const StyledTopSmall = styled.div`
    display: block;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const ReadChatList = () => {


   return (
      <StyledBox>
         <Hidden smDown>
            <StyledTop>
               <span style={{ fontSize: "20px", fontWeight: "bold" }}>채팅 내역</span>
            </StyledTop>
         </Hidden>

         <Hidden smUp>
            <StyledTopSmall>
               <span style={{ fontSize: "100%", fontWeight: "bold" }}>채팅 내역</span>
            </StyledTopSmall>
         </Hidden>

         <Divider />
         <ChatCard></ChatCard>
      </StyledBox>
   );
}

export default ReadChatList