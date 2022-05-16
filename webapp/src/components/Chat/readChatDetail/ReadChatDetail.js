import React, { useState } from 'react';
import { Box, Paper } from '@mui/material'
import { MessageLeft, MessageRight } from "components/Chat/readChatDetail/Message"
import TextInput from "components/Chat/readChatDetail/TextInput"

const ReadChatDetail = () => {

   return (
      <div >
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