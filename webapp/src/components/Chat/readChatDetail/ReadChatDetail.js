import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Box, Button, TextField, Divider, Container, Grid, Hidden, Menu, MenuItem } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import { createStyles, makeStyles } from "@mui/styles";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import Api from "API/Api";
import { base_url } from "API/Url"

var stompClient = null;

const useStyles = makeStyles((theme) =>
   createStyles({
      container: {
         display: "flex",
         alignItems: "center",
         justifyContent: "center"
      },
      paper: {
         width: "100%",
         // height: "80vh",
         display: "flex",
         flexDirection: "column", // flex 배치 방향
         alignItems: "center",
         position: "relative"
      },
      wrapForm: {
         display: "flex",
         justifyContent: "center",
         // width: "95%",
         // margin: "0 auto",
         // position: 'fix',
         bottom: 0
      },
      wrapText: {
         width: "100%"
      },
      button: {
         //margin: theme.spacing(1),
      },
      messagesBody: {
         // width: "80%",
         // margin: 10,
         overflowY: "scroll",
         // height: "calc( 100% - 100px )"
         height: "500px"
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
   const [createdAt, setCreatedAt] = useState([]);

   const [myId, setMyId] = useState(); // 나의 id

   const response = async () => await Api.getMyInfo();
   const resChatHistory = async () => await Api.getChatContents(location.state.roomId);

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };


   // 메세지 전송 시 보낼 데이터
   const chatData = {
      roomId: roomId,
      content: message,
      sender: { id: myId }
   };

   // 입력한 키가 Enter일 경우 가입하기 버튼 클릭한 것과 동일한 동작 실행
   const onCheckEnter = (e) => {
      e.preventDefault();
      if (e.key === 'Enter') {
         sendMessage()
      }
   }

   async function showHistory() {
      const resHistory = await resChatHistory();
      console.log(resHistory);
      const history_data = resHistory.data.response[0].content.reverse();
      history_data.forEach(element => {
         setGreetings(greetings => [...greetings, element.sender.id]);
         setMessages(messages => [...messages, element.content]);
         setCreatedAt(createdAt => [...createdAt, element.createdAt]);
      })
   }

   async function connect(data, myId) {
      var socket = new SockJS(base_url + '/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
         console.log('Connected: ' + frame);
         showHistory();

         stompClient.subscribe(`/user/` + data + `/queue/messages`, function (greeting) {
            const greeting_data = JSON.parse(greeting.body);

            setGreetings(greetings => [...greetings, greeting_data.sender.id]); //list
            setMessages(messages => [...messages, greeting_data.content]); // list
            setCreatedAt(createdAt => [...createdAt, greeting_data.createdAt]);

            const textfield = document.getElementById("standard-text");
            textfield.value = "";

            // TODO: 내가 남의 걸 읽음을 알려주는 요청
            if (greeting_data.sender.id != myId) {
               console.log(greeting_data.sender.id, "  ==  ", myId);
               const res = Api.postChatIsRead(greeting_data.id);
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

         await connect(location.state.roomId, resBody.data.response[0].id); // 채팅 연결
      }
      getData();
   }, []);

   return (
      <>
         <Hidden mdDown>
            <Container maxWidth="sm">
               <Box>
                  <Grid container spacing={2}>
                     <Grid item xs={12} md={9}>
                        <Box>{opponent} | {boardTitle}</Box>
                     </Grid>
                     <Grid item xs={0} md={3}>
                        <Box>
                           <HelpOutlineIcon
                              sx={{ paddingTop: "4px" }}
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}></HelpOutlineIcon>
                           <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                 'aria-labelledby': 'basic-button',
                              }}
                           >
                              <span onClick={handleClose}>채팅을 통해 거래 여부를 확인하고 거래를 위한 약속 시간 및 장소를 잡으세요!</span>
                           </Menu>
                           {/* <ArticleOutlinedIcon sx={{ paddingTop: "4px" }}></ArticleOutlinedIcon> */}
                           <Link to={{ pathname: `/chat/room/${roomId}` }} style={{ textDecoration: "none", color: "black" }}>
                              <Button sx={{ paddingLeft: "4px" }}>방 정보</Button>
                           </Link>
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
               <Box id="style-1" sx={{ bgcolor: '#cfe8fc', height: '70vh', overflowY: "scroll" }} >
                  {greetings.map((row, id) => (
                     (greetings[id] === myId) ?
                        (<>
                           <MessageRight message={messages[id]} createdAt={createdAt[id]}></MessageRight>

                        </>) : (<>
                           <MessageLeft message={messages[id]} createdAt={createdAt[id]}></MessageLeft>

                        </>)
                  ))}
               </Box>
               <Box sx={{ height: '10vh' }} >
                  <form className={classes.wrapForm} noValidate autoComplete="off" onKeyPress={onCheckEnter}>
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
                  </form>
               </Box>
            </Container>
         </Hidden>

         <Hidden mdUp>
            <Container maxWidth="sm">
               <Box>
                  <Grid container spacing={2}>
                     <Grid item xs={12} md={9}>
                        <Box>{opponent} | {boardTitle}</Box>
                     </Grid>
                     <Grid item xs={0} md={3}>
                        <Box>
                           <HelpOutlineIcon sx={{ paddingTop: "4px" }}></HelpOutlineIcon>
                           <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                 'aria-labelledby': 'basic-button',
                              }}
                           >
                              <span onClick={handleClose}>채팅을 통해 거래 여부를 확인하고 거래를 위한 약속 시간 및 장소를 잡으세요!</span>
                           </Menu>
                           {/* <ArticleOutlinedIcon sx={{ paddingTop: "4px" }}></ArticleOutlinedIcon> */}
                           <Button sx={{ paddingLeft: "4px" }}>방 정보</Button>
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
               <Box id="style-1" sx={{ bgcolor: '#cfe8fc', height: '64vh', overflowY: "scroll" }} >
                  {greetings.map((row, id) => (
                     (greetings[id] === myId) ?
                        (<>
                           <MessageRight message={messages[id]} createdAt={createdAt[id]}></MessageRight>

                        </>) : (<>
                           <MessageLeft message={messages[id]} createdAt={createdAt[id]}></MessageLeft>

                        </>)
                  ))}
               </Box>
               <Box sx={{ height: '9vh' }} >
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
                     <Button id="chatbutton" variant="contained" color="primary" className={classes.button}
                        sx={{ float: "bottom" }} onClick={sendMessage}>
                        <SendSharpIcon />
                     </Button>
                  </form>
               </Box>
            </Container>
         </Hidden>

      </>
   )
}

export default ReadChatDetail