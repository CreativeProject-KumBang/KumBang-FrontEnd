import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import BoardDetail from 'components/RoomBoard/readRoomBoardDetail/BoardDetail'
import SkeletonBoardDetail from 'components/RoomBoard/readRoomBoardDetail/SkeletonBoardDetail'
import Api from 'API/Api';
import { base_url } from 'API/Url';

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const ReadRoomBoardDetail = (props) => {
  const board_id = window.location.href
                      .split('/')[window.location.href.split('/').length - 1].split('.')[0];

  const [board, setBoard] = useState([]); // board
  const [myId, setMyId] = useState(); // 나의 id
  const [writerId, setWriterId] = useState(); // 작성자의 id
  const [isLike, setIsLike] = useState();
  const [bookmark, setBookmark] = useState();
 
  // 방 양도 글 상세조회 API
  const response = async () => await Api.getRoomBoard(board_id);
  const resMyId = async () => await Api.getMyInfo();
  const resLike = async () => await Api.getBoardIsLike(board_id);
  
  useEffect(() => {
    const getData = async () => {
      const resBody = await response();
      const myInfo = await resMyId();
      const Like = await resLike();
      
      // console.log(resBody);
      // console.log(myInfo);
      // console.log(Like);

      setBoard(resBody.data.response[0]);
      setMyId(myInfo.data.response[0].id); // myId 정보 획득
      setWriterId(resBody.data.response[0].user.id);
      setIsLike(Like.data.response[0]);
      setBookmark(Like.data.response);
      props.setX(resBody.data.response[0].cordX);
      props.setY(resBody.data.response[0].cordY);
    }
    getData();
  }, []);

  return (

    <div>
      <StyledDiv>
        <BoardDetail boardId={board_id} board={board} myId={myId} writerId={writerId} bookmark={bookmark} setBookmark={setBookmark}> </BoardDetail>
      </StyledDiv>
    </div>
  )
}

export default ReadRoomBoardDetail