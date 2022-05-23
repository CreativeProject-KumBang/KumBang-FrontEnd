import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Paper, Button, TextField } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import TextInput from "components/Chat/readChatDetail/TextInput"
import { createStyles, makeStyles } from "@mui/styles";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import $ from "jquery";
import Api from "API/Api";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const api = "http://jueleejue.iptime.org:80/api";
const socket = "http://jueleejue.iptime.org:80";

const useStyles = makeStyles((theme) =>
   createStyles({
      wrapForm: {
         display: "flex",
         justifyContent: "center",
         width: "95%",
         //margin: `${theme.spacing(0)} auto`
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
         height: "calc( 100% - 80px )"
       }
   })
);

var stompClient = null;

const ReadChatDetail = () => {


   const location = useLocation();
   const [postBody, setPostBody] = useState([]);
   const [myId, setMyId] = useState([]);

   // 채팅방 목록 데이터를 location 사용해서 저장함.
   const [roomId, setRoomId] = useState();
   const [boardId, setBoardId] = useState();
   const [boardTitle, setBoardTitle] = useState();
   const [opponent, setOpponent] = useState();

   const classes = useStyles();
   const [message, setMessage] = useState();


   function setConnected(connected) {
      /*
      $("#connect").prop("disabled", connected);
      $("#disconnect").prop("disabled", !connected);
      if (connected) {
          $("#conversation").show();
      }
      else {
          $("#conversation").hide();
      }
      $("#greetings").html("");*/
   }

   function connect(data) {
      var socket = new SockJS( socket + '/ws');
      stompClient = Stomp.over(socket);
      console.log(stompClient);
      stompClient.connect({}, function (frame) {
         setConnected(true);
         console.log('Connected: ' + frame);
         console.log(data);
         stompClient.subscribe(`/user/`+ data +`/queue/messages`, function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
         });
      });
   }


   function showGreeting(message) {
      $("#style-1").append("<tr><td>" + message + "</td></tr>");
   }

   const response = async () => await Api.getMyInfo();




   useEffect(() => {
      const getData = async () => {
         
         setRoomId(location.state.roomId);
         setBoardId(location.state.boardId);
         setBoardTitle(location.state.boardTitle);
         setOpponent(location.state.opponent);

         const resBody = await response();
         setMyId(resBody.data.response[0].id);

         connect(location.state.roomId);
      }
      getData();
   }, []);

   const chatData = {
      roomId: roomId,
      content: message,
      sender: { id: myId }
   };

   function sendName() {
      console.log(stompClient);
      stompClient.send("/broadcast/publish", {}, JSON.stringify(chatData));
   }


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
         <Paper>
            <Paper zDepth={2} >
               <Box sx={{ paddingTop: "4px", height: "30px" }}>
                  {roomId} | {opponent} | {boardTitle}
                  <Button sx={{ float: "right" }}>방 정보</Button>
                  <ArticleOutlinedIcon sx={{ float: "right" }}></ArticleOutlinedIcon>
                  <HelpOutlineIcon sx={{ float: "right" }}></HelpOutlineIcon>
               </Box>
            </Paper>
            <Paper zDepth={2}>
               <Paper id="style-1">

               </Paper>
               <form className={classes.wrapForm} noValidate autoComplete="off">
                  <TextField
                     id="standard-text"
                     label=""
                     className={classes.wrapText}

                     onChange={(event) => setMessage(event.target.value)}
                     sx={{ height: "100%" }}
                  //margin="normal"
                  />
                  <Button variant="contained" color="primary" className={classes.button}
                     sx={{ float: "bottom" }} onClick={sendName}>
                     <SendSharpIcon />
                  </Button>
               </form>
            </Paper>
         </Paper>
      </div>
   )
}

export default ReadChatDetail