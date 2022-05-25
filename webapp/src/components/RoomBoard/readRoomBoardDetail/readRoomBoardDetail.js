import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import BoardDetail from 'components/RoomBoard/readRoomBoardDetail/BoardDetail'
import SkeletonBoardDetail from 'components/RoomBoard/readRoomBoardDetail/SkeletonBoardDetail'
import Api from 'API/Api';

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const ReadRoomBoardDetail = () => {
  //const board_id = useLocation().state.boardId;

  const [board, setBoard] = useState([]); // board
  const [myId, setMyId] = useState(); // 나의 id
  const [writerId, setWriterId] = useState(); // 작성자의 id
  const [bookmark, setBookmark] = useState(false); // bookmark
  //const [likes, setlikes] = useState(like);
  const [isImage, setIsImage] = useState(true); // 이미지 존재 여부 확인해서 변수에 담고 렌더링

  // 방 양도 글 상세조회 API
  const response = async () => await Api.getRoomBoard(board_id);
  const resMyId = async () => await Api.getMyInfo();
  
  /**************************************dummycode*********************************************/
  const board_id = 2; // dummycode
  /*const board = {
    "title": "test title",
    "content": "test content",
    "user": { "id": "1" },
    "durationStart": "2022-04-25",
    "durationEnd": "2022-04-28",
    "location": "구미시 대학로 61길", // 주소 입력받는 api등으로 정확한 주소 필요(좌표계산에 필요함)
    "locationDetail": "디지털관 337호",
    "contractDeposit": "1000000", // 방 원래 주인이 계약한 보증금
    "contractMonthlyFee": "250000", // 방 원래 주인이 계약한 월세
    "price": "5000",  // 양도가격
    "priceType": "DAILY", // 양도가격 타입 "DAILY" or "FULL
    "deposit": "100000", // 양도 보증금
    "fixedOption": [1, 1, 0, 0, 1, 0, 1, 0],
    "additionalOption": "선풍기 1, 건조기 1, 드라이기 1",
    "details": {
      "parking": "지하주차장",
      "elevator": "있음",
      "roomStructure": "미니투룸",
      "managementFee": "전기세",
      "containManageFee": "수도세, 가스비",
      "areaSize": "15평"
    },
    "files": ["urls"]
  };*/


  useEffect(() => {
    const getData = async () => {
      const resBody = await response();
      const myInfo = await resMyId();

      console.log(resBody);
      console.log(myInfo);

      setBoard(resBody.data.response[0]);
      setMyId(myInfo.data.response[0].id); // myId 정보 획득
      setWriterId(resBody.data.response[0].user.id)

      if (board.image === undefined) {
        setIsImage(false);
      }
    }
    getData();
  }, []);

  /* dummy code
    //const response = useState(); // front
    //const back = useState();

      useEffect(() => {
          setTimeout(async () => {
            console.log("load");
            response = async () => await Api.getRoomBoard(board_id);
            back = async () => await Api.getBoardIsLike(id);
            const data = await response.json();
            console.log(data);
            setBoard(data);
          }, 5000);
  
          if (sessionStorage.getItem('user_token')) {
              const getdata = async () => {
                const data = await back();
                setBookmark(data.data.isLike);
              };
              getdata();
            } else {
              setBookmark(false);
            }
        }, []);
  */

  return (

    <div>
      <StyledDiv>
        <BoardDetail boardId={board_id} board={board} myId={myId} writerId={writerId}> </BoardDetail>
      </StyledDiv>
    </div>
  )
}

export default ReadRoomBoardDetail