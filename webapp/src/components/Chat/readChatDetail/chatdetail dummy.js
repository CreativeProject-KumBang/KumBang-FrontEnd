import React, { useEffect, useState } from 'react';
import { Box, Paper, Button } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import TextInput from "components/Chat/readChatDetail/TextInput"
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

const ReadChatDetail = () => {
   const room_id = location.state.roomId; // location으로 데이터에 접근해서 받아온다!

   const [postBody, setPostBody] = useState([]);
   const response = async () => await Api.getMyPost();
   function connect() {
      var socket = new SockJS('/gs-guide-websocket');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
          setConnected(true);
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/greetings', function (greeting) {
              showGreeting(JSON.parse(greeting.body).content);
          });
      });
  }

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


   return (
      <div >
         <Paper zDepth={2} >
            <Box sx={{ paddingTop: "4px", height:"30px"}}>
               북극곰구하자
               <Button sx={{float:"right"}}>세부정보</Button>
               <ArticleOutlinedIcon sx={{float:"right"}}></ArticleOutlinedIcon>
               <HelpOutlineIcon sx={{float:"right"}}></HelpOutlineIcon>
            </Box>
         </Paper>
         <Paper zDepth={2}>
            <Paper id="style-1">
               <MessageLeft
                  message="안녕하세요 거래를 하고 싶어서 연락드렸습니다."
                  timestamp="MM/DD 00:00"
                  photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                  displayName="전정국"
                  avatarDisp={true}
               />
               <MessageLeft
                  message="혹시 지금 양도방 있나요? 제가 00일부터 00일까지 살고싶은데 가능할까요?"
                  timestamp="MM/DD 00:00"
                  photoURL=""
                  displayName="전정국"
                  avatarDisp={false}
               />
               <MessageRight
                  message="messageR1 가능합니다."
                  timestamp="MM/DD 00:00"
                  photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                  displayName="まさりぶ"
                  avatarDisp={true}
               />
               <MessageRight
                  message="messageR2 00일이면 00000원인데 괜찮으신가요?"
                  timestamp="MM/DD 00:00"
                  photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                  displayName="まさりぶ"
                  avatarDisp={false}
               />
            </Paper>
            <TextInput></TextInput>
         </Paper>
      </div>
   )
}

export default ReadChatDetail