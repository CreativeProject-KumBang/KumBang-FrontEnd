import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Divider } from '@mui/material'
import ChatCardContent from 'components/Chat/readChatList/ChatCardContent';
import SkeletonChatList from 'components/Chat/readChatList/SkeletonChatList';
import Api from 'API/Api';
import { base_url } from 'API/Url';

const default_imageurl = base_url + "default";

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
            const resBody = await response();
            console.log(resBody);
            setGetBody(resBody.data.response[0].content);
        }
        getData();
    }, []);

    const isRead = "true";
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
                                    (default_imageurl) : (row.roomBoard.thumbnail.path)}
                                opponent={(row.isBuyer) ?
                                    row.roomBoard.author.nickname : row.buyer.nickname}
                                date={row.updatedAt}
                                isNew={row.isNew}
                                lastMsg={
                                    (!(row.lastMessage === "null")) ?
                                        (
                                            row.lastMessage.content
                                        ) : (
                                            ""
                                        )}
                                isCompleted={
                                    (!(row.isCompleted === true)) ?
                                        (
                                            ""
                                        ) : (
                                            "(거래 완료되었습니다.)"
                                        )}
                                isRemoved={
                                    (!(row.isRemoved === true)) ?
                                        (
                                            ""
                                        ) : (
                                            "(글이 삭제되었습니다.)"
                                        )}
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