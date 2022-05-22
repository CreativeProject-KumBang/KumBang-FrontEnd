import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Paper, Button } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import TextInput from "components/Chat/readChatDetail/TextInput"
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';


const ReadChatDetail = () => {
   const location = useLocation();
   const [postBody, setPostBody] = useState([]);

   // 채팅방 목록 데이터를 location 사용해서 저장함.
   const [roomId, setRoomId] = useState();
   const [boardId, setBoardId] = useState();
   const [boardTitle, setBoardTitle] = useState();
   const [opponent, setOpponent] = useState();


   useEffect(() => {
      const getData = async() => {
         setRoomId(location.state.roomId);
         setBoardId(location.state.boardId);
         setBoardTitle(location.state.boardTitle);
         setOpponent(location.state.opponent);
      }
        getData();
    }, []);


/*
   const response = async () => await Api.getMyPost();
   useEffect(() => {
      const getData = async() => {
        const resBody = await response();
        console.log(resBody);
        setPostBody(resBody.data.response[0].content);
        if(postBody.thumbnail === undefined){
          setIsImage(false);
        }
      }
        getData();
    }, []);
*/

   return (
      <div >
         <Paper zDepth={2} >
            <Box sx={{ paddingTop: "4px", height:"30px"}}>
               {opponent} | {boardTitle}
               <Button sx={{float:"right"}}>방 정보</Button>
               <ArticleOutlinedIcon sx={{float:"right"}}></ArticleOutlinedIcon>
               <HelpOutlineIcon sx={{float:"right"}}></HelpOutlineIcon>
            </Box>
         </Paper>
         <Paper zDepth={2}>
            <Paper id="style-1">

            </Paper>
            <TextInput></TextInput>
         </Paper>
      </div>
   )
}

export default ReadChatDetail