import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import BoardDetail from 'components/RoomBoard/readRoomBoardDetail/BoardDetail'
import SkeletonBoardDetail from 'components/RoomBoard/readRoomBoardDetail/SkeletonBoardDetail'

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const ReadRoomBoardDetail = () => {
  const board_id = 1; // dummycode
  //const board_id = useLocation().state.boardId;

  const [isLoad, setIsLoad] = useState(true); // skeleton 

  const [board, setBoard] = useState(null); // board
  const [bookmark, setBookmark] = useState(false); // bookmark
  //const [likes, setlikes] = useState(like);

  const response = useState(); // front
  const back = useState();

/*
    useEffect(() => {
        setTimeout(async () => {
          console.log("load");
          response = async () => await Api.getRoomBoard(board_id);
          back = async () => await Api.getBoardIsLike(id);
          const data = await response.json();
          console.log(data);
          setBoard(data);
          setIsLoad(true); // skeleton api 데이터 받아와서 load 완료

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
              {isLoad ? (
                  <BoardDetail board={board}> </BoardDetail> // 로딩 완료 후
              ) : (
                  <SkeletonBoardDetail></SkeletonBoardDetail> // 로딩 완료 전:Skeleton
              )}   
                
            </StyledDiv>

            <div id='latitude'></div>
            <div id='longitude'></div>
            <div id='level'></div>
        </div>
    )
}

export default ReadRoomBoardDetail