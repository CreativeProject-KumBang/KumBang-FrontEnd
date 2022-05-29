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

const ReadRoomBoardDetail = () => {
  const board_id = window.location.href
                      .split('/')[window.location.href.split('/').length - 1].split('.')[0];

  const [board, setBoard] = useState([]);               // 방 양도 글 정보
  const [myId, setMyId] = useState();                   // 나의 id
  const [writerId, setWriterId] = useState();           // 작성자의 id
  const [bookmark, setBookmark] = useState();           // 좋아요
  const [completeData, setCompleteData] = useState();   // 거래 완료 정보
 
  // 방 양도 글 상세조회 API
  const response = async () => await Api.getRoomBoard(board_id);
  const resMyId = async () => await Api.getMyInfo();
  const resLike = async () => await Api.getBoardIsLike(board_id);


  useEffect(() => {
    const getData = async () => {
      const resBody = await response();
      const myInfo = await resMyId();
      const Like = await resLike();

      console.log(resBody);

      setBoard(resBody.data.response[0]);
      setMyId(myInfo.data.response[0].id); // myId 정보 획득
      setWriterId(resBody.data.response[0].user.id);
      setBookmark(Like.data.response);
      setCompleteData(resBody.data.response[0].completeData);
    }
    getData();
  }, []);

  return (

    <div>
      <StyledDiv>
        <BoardDetail boardId={board_id} board={board} myId={myId} writerId={writerId} bookmark={bookmark} setBookmark={setBookmark} completeData={completeData}> </BoardDetail>
      </StyledDiv>
    </div>
  )
}

export default ReadRoomBoardDetail