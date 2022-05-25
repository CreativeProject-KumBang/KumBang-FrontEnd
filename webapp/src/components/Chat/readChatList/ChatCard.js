import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Divider } from '@mui/material'
import ChatCardContent from 'components/Chat/readChatList/ChatCardContent';
import SkeletonChatList from 'components/Chat/readChatList/SkeletonChatList';
import Api from 'API/Api';

const default_imageurl = "default";

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

const ChatCard = () => {
    const [getbody, setGetBody] = useState([]);
    const response = async () => await Api.getChatList();
    
    useEffect(() => {
        const getData = async () => {
            //const resBody2 = await response2();
            //console.log(resBody2);
            const resBody = await response();
            console.log(resBody);
            setGetBody(resBody.data.response[0].content);
        }
        getData();
    }, []);

    return (
        <div>
            {(!(getbody.length === 0)) ? (

                <List>
                    <Item>
                        {getbody.map(row => (<>

                                <
                                    ChatCardContent key={row.chatRoomId}
                                    roomId={row.chatRoomId}
                                    boardId={row.roomBoard.id}
                                    title={row.roomBoard.title}
                                    image={(row.roomBoard.thumbnail === null) ?
                                        (imageurl) : (row.roomBoard.thumbnail)}
                                    opponent={(row.isBuyer) ?
                                        row.roomBoard.author.nickname : row.buyer.nickname}
                                    date={row.updatedAt}
                                />
                                <Divider />
                        </>
                        ))}
                    </Item>
                </List>
            ) : (
                <SkeletonChatList></SkeletonChatList>
            )}
        </div >
    )

}

export default ChatCard