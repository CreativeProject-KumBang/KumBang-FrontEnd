import React, { useState } from 'react';
import styled from "styled-components";
import { Box, Divider } from '@mui/material'
import ChatCard from 'components/Chat/readChatList/ChatCard';


const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const StyledTop = styled.div`
    display: block;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 50px;
    font-size: 22px;
`;

const List = styled.ul`
  list-style: none;
  margin: auto;
  padding: 0;
`;

const Item = styled.li`
  padding: 8px 12px; /* 마우스 클릭영역 확보 */

  a {
    display: flex;
    position: relative;
    margin: 10px 15px;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;

const ReadChatList = () => {


   return (
      <StyledBox>
         <StyledTop>
            <h2>채팅 내역</h2>
         </StyledTop>
         <Divider />
         <ChatCard></ChatCard>
      </StyledBox>
   );
}

export default ReadChatList