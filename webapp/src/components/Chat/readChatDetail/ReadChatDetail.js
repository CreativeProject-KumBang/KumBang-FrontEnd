import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Paper, Button, TextField, Grid } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import TextInput from "components/Chat/readChatDetail/TextInput"
import { createStyles, makeStyles } from "@mui/styles";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import $ from "jquery";
import Api from "API/Api";
import * as ReactDOM from 'react-dom';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const api = "http://jueleejue.iptime.org:80/api";
const socketurl = "http://jueleejue.iptime.org:80";

var stompClient = null;

// Grid 써서 조절하면 될 것 같음

const useStyles = makeStyles((theme) =>
   createStyles({

      paper: {
         width: "80vw",
         height: "80vh",
         maxWidth: "500px",
         maxHeight: "700px",
         display: "flex",
         alignItems: "center",
         flexDirection: "column",
         position: "relative"
      },
      paper2: {
         width: "80vw",
         maxWidth: "500px",
         display: "flex",
         alignItems: "center",
         flexDirection: "column",
         position: "relative"
      },
      wrapForm: {
         display: "flex",
         justifyContent: "center",
         width: "95%",
         margin: "0 auto",
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
         height: "calc( 100% - 88px )"
      },
      container: {
         width: "100vw",
         height: "100vh",
         display: "flex",
         alignItems: "center",
         justifyContent: "center"
      },
      test: {
         backgroundColor: "orange"
      }
   })
);


const ReadChatDetail = () => {
   const location = useLocation();
   const [postBody, setPostBody] = useState([]);
   const [myId, setMyId] = useState([]); // 나의 id

   // 채팅방 목록 데이터를 location 사용해서 저장함.
   const [roomId, setRoomId] = useState();
   const [boardId, setBoardId] = useState();
   const [boardTitle, setBoardTitle] = useState();
   const [opponent, setOpponent] = useState();

   const classes = useStyles();
   const [message, setMessage] = useState();
   const [messages, setMessages] = useState([]); // sender가 보낸 message
   const [chatlist, setChatlist] = useState([]);
   const [greetings, setGreetings] = useState([]); // sender의 id 값 저장

   const response = async () => await Api.getMyInfo();


   function setConnected(connected) {

   }

   function connect(data) {
      var socket = new SockJS(socketurl + '/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
         setConnected(true);
         console.log('Connected: ' + frame);
         console.log(data);
         stompClient.subscribe(`/user/` + data + `/queue/messages`, function (greeting) {
            const greeting_data = JSON.parse(greeting.body);
            setGreetings([...greetings, greeting_data.sender.id]);
            setMessages([...messages, greeting_data.content]);
            /* TODO: 내가 남의 걸 읽음을 알려주는 요청

            if (greeting.body.sender.id != myId) {
               `api/chat/isread`, greeting.body.id
            }

            */
            //showMessage(JSON.parse(greeting.body).content);
         });
      });
   }

   function showGreeting(message) {
      $("#style-1").append("<tr><td>" + message + "</td></tr>");
   }

   function Welcome(message) {
      return <MessageRight message={message}></MessageRight>;
   }

   function showMessage(message) {

      // if 내가 sender 라면?
      // else 남이 sender 라면?
   }

   const chatData = {
      roomId: roomId,
      content: message,
      sender: { id: myId }
   };

   function sendMessage() {
      console.log(stompClient);
      stompClient.send("/broadcast/publish", {}, JSON.stringify(chatData));
   }

   useEffect(() => {
      const getData = async () => {

         setRoomId(location.state.roomId);
         setBoardId(location.state.boardId);
         setBoardTitle(location.state.boardTitle);
         setOpponent(location.state.opponent);

         const resBody = await response();
         setMyId(resBody.data.response[0].id);


         console.log("connet");

         connect(location.state.roomId);
      }
      getData();
   }, []);



   return (
      <div className={classes.container}>
         <Paper>
            <Paper zDepth={2} >
               <Box sx={{ paddingTop: "4px", height: "50px" }}>
                  <Grid container>
                     <Grid lg={8} md={8} sm={8} xs={12}>
                        <Box>
                           {opponent} | {boardTitle}
                        </Box>
                     </Grid>
                     <Grid lg={4} md={4} sm={4} xs={0}>
                        <Box sx={{ float: "right" }}>
                           <HelpOutlineIcon sx={{ paddingTop: "4px" }}></HelpOutlineIcon>
                           <ArticleOutlinedIcon sx={{ paddingTop: "4px" }}></ArticleOutlinedIcon>
                           <Button sx={{ paddingLeft: "4px" }}>방 정보</Button>
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
            </Paper>
            <Paper className={classes.paper} zDepth={2}>
               <Paper id="style-1" className={classes.messagesBody} >
                  {greetings.map(row => (
                     (greetings[row] === myId) ?
                        (<>
                           <MessageRight message={messages[row]}></MessageRight>

                        </>) : (<>
                           <MessageLeft message={messages[row]}></MessageLeft>

                        </>)
                  ))

                  }

               </Paper>
               <form className={classes.wrapForm} noValidate autoComplete="off">
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
                  <Button variant="contained" color="primary" className={classes.button}
                     sx={{ float: "bottom" }} onClick={sendMessage}>
                     <SendSharpIcon />
                  </Button>
               </form>
            </Paper>
         </Paper>
      </div>
   )
}

export default ReadChatDetail