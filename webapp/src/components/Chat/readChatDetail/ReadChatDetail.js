import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Box, Paper, Button, TextField, Divider } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import { createStyles, makeStyles } from "@mui/styles";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TextInput from "components/Chat/readChatDetail/TextInput"
import Api from "API/Api";

const socketurl = "http://192.168.237.100:8080";
var stompClient = null;

const useStyles = makeStyles((theme) =>
   createStyles({
      container: {
         display: "flex",
         alignItems: "center",
         justifyContent: "center"
      },
      paper: {
         width: "80vh",
         height: "80vh",
         display: "flex",
         flexDirection: "column", // flex 배치 방향
         alignItems: "center",
         position: "relative"
      },
      wrapForm: {
         display: "flex",
         justifyContent: "center",
         width: "95%",
         margin: "0 auto",
         position: 'fix',
         bottom: 0
      },
      wrapText: {
         width: "100%"
      },
      button: {
         //margin: theme.spacing(1),
      },
      messagesBody: {
         width: "calc( 100% - 20px )",
         margin: 10,
         overflowY: "scroll",
         //height: "calc( 100% - 100px )"
         height: "90%"
      },

      test: {
         backgroundColor: "orange"
      }
   })
);


const ReadChatDetail = () => {
   const location = useLocation();
   const classes = useStyles();

   // 채팅방 목록 데이터를 location 사용해서 저장함.
   const [roomId, setRoomId] = useState();
   const [boardId, setBoardId] = useState();
   const [boardTitle, setBoardTitle] = useState();
   const [opponent, setOpponent] = useState();

   const [message, setMessage] = useState(); // sender가 작성한 하나의 message
   const [messages, setMessages] = useState([]); // sender가 보낸 message를 ui에 띄우기 위해 저장하는 list
   const [greetings, setGreetings] = useState([]); // sender의 id 값 저장

   const [myId, setMyId] = useState([]); // 나의 id

   const response = async () => await Api.getMyInfo();
   const resChatHistory = async () => await Api.getChatContents(location.state.roomId);
   const resIsRead = async () => await Api.postChatIsRead();

   // 메세지 전송 시 보낼 데이터
   const chatData = {
      roomId: roomId,
      content: message,
      sender: { id: myId }
   };

   async function showHistory() {
      const resHistory = await resChatHistory();
      console.log(resHistory);
      const history_data = resHistory.data.response[0].content.reverse();
      history_data.forEach(element => {
         setGreetings(greetings => [...greetings, element.sender.id]);
         setMessages(messages => [...messages, element.content]); 
      })
   }

   async function connect(data) {
      var socket = new SockJS(socketurl + '/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
         console.log('Connected: ' + frame);
         showHistory();

         stompClient.subscribe(`/user/` + data + `/queue/messages`, function (greeting) {
            const greeting_data = JSON.parse(greeting.body);
            
            setGreetings(greetings => [...greetings, greeting_data.sender.id]); //list
            setMessages(messages => [...messages, greeting_data.content]); // list

            const textfield = document.getElementById("standard-text");
            textfield.value = "";

            // TODO: 내가 남의 걸 읽음을 알려주는 요청
            if (greeting_data.sender.id != myId) {
               resIsRead(greeting_data.message.id);
            }

         });
      });
   }

   function sendMessage() {
      console.log(stompClient);
      console.log(chatData);
      // message가 없는 경우, send 요청을 하지 않음.
      if (!(message === '')) {
         stompClient.send("/broadcast/publish", {}, JSON.stringify(chatData));
         setMessage('');
      }

   }

   useEffect(() => {
      const getData = async () => {
         // 채팅 목록 조회에서 얻어온 기본 정보
         setRoomId(location.state.roomId);
         setBoardId(location.state.boardId);
         setBoardTitle(location.state.boardTitle);
         setOpponent(location.state.opponent);

         const resBody = await response();
         setMyId(resBody.data.response[0].id); // myId 정보 획득

         connect(location.state.roomId); // 채팅 연결
      }
      getData();
   }, []);

   return (
      <div className={classes.container}>
         <Paper className={classes.paper}>

            <Box sx={{ paddingTop: "4px", height: "50px" }}>
               <Box>
                  {opponent} | {boardTitle}
               </Box>

               <Box sx={{ float: "right" }}>
                  <HelpOutlineIcon sx={{ paddingTop: "4px" }}></HelpOutlineIcon>
                  <ArticleOutlinedIcon sx={{ paddingTop: "4px" }}></ArticleOutlinedIcon>
                  <Button sx={{ paddingLeft: "4px" }}>방 정보</Button>
               </Box>
            </Box>
            <Divider />
            <Box className={classes.paper} zDepth={2}>
               <Box id="style-1" className={classes.messagesBody} >
                  {greetings.map((row, id) => (
                     (greetings[id] === myId) ?

                        (<>
                           <MessageRight message={messages[id]}></MessageRight>

                        </>) : (<>
                           <MessageLeft message={messages[id]}></MessageLeft>

                        </>)
                  ))

                  }
               </Box>

            </Box>
            {/* <form className={classes.wrapForm} noValidate autoComplete="off">
               <TextField
                  id="standard-text"
                  label=""
                  className={classes.wrapText}

                  onChange={(event) => setMessage(event.target.value)}
                  sx={{
                     height: "100%",
                     margin: "normal"
                  }}
               />
               <Button id="chatbutton" variant="contained" color="primary" className={classes.button}
                  sx={{ float: "bottom" }} onClick={sendMessage}>
                  <SendSharpIcon />
               </Button>
            </form> */}
            <TextInput message={message} setMessage={setMessage}></TextInput>
         </Paper>
      </div>
   )
}

export default ReadChatDetail