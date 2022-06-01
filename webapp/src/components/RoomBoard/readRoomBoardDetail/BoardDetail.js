import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import moment from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Divider, Box, Button } from '@mui/material';
import Slider from 'components/RoomBoard/readRoomBoardDetail/Slider';
import SkeletonBoardDetail from 'components/RoomBoard/readRoomBoardDetail/SkeletonBoardDetail'
import PriceTable from 'components/RoomBoard/readRoomBoardDetail/PriceTable';
import Api from 'API/Api';

const checkList = ["에어컨", "냉장고", "세탁기", "가스레인지", "전자레인지", "책상", "책장", "옷장", "신발장"];

const StyledH3 = styled.h3`
  padding: 2px 15px;
`;

const StyledH5 = styled.h4`
  padding: 0px 20px;
  font-weight: bolder;
`;

const StyledH4 = styled.h4`
  padding: 0px 20px;
  font-weight: normal;
`;

const StyleH4 = styled.h4`
  padding: 0px 10px;
  font-weight: normal;
`;

const StyledDiv = styled.div`
  padding: 2px 15px;
`;

const BoardDetail = (props) => {
  const navigate = useNavigate();

  const board_id = props.boardId;
  const board = props.board;
  const myId = props.myId;
  const writerId = props.writerId;
  const bookmark = props.bookmark;
  const setBookmark = props.setBookmark;
  const completeData = props.completeData;

  const postchat = async () => await Api.postChatRoom(board_id);   // 채팅방 생성 API

  //----------------------------------------
  async function createChatRoom() {
    const res = await postchat();

    console.log(res);

    navigate('/chat/detail',{
      state:{
      roomId: res.data.response[0],
      boardId: board_id,
      boardTitle: board.title,
      opponent: board.user.nickname
    }})
  }
  
  const handleBookmark = async () => {
    console.log(bookmark);
    if (bookmark === false) {
        const response = async () => await Api.getBoardLike(board_id);
        const getdata = async () => {
            const data = await response();
            console.log(data);

        };
        getdata();
    } else {
      const response = async () => await Api.getBoardUnlike(board_id);
        const getdata = async () => {
            const data = await response();
            console.log(data);
        };
        getdata();
    }
    setBookmark(!bookmark);

  };

  return (
    <div>

      {(!(board.length === 0)) ? (
        <div>
          <StyledH5>이미지 슬라이드</StyledH5>
          <StyledDiv>
            <Slider files={board.files}></Slider>
          </StyledDiv>

          <StyledDiv>
            {(!(myId === writerId)) ? (
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                onClick={() => createChatRoom()}
              >채팅하기</Button>
            ) : (
              <Button
                disabled
                variant="outlined"
                fullWidth
                color="secondary"
              >채팅하기</Button>
            )}
          </StyledDiv>

          <Box>
            <StyledH3>제목
              <Box
                sx={{
                  float: 'right'
                }}
              >
                {bookmark ? (
                  <FavoriteIcon
                    sx={{
                      display: 'inline-block',
                      marginLeft: 2,
                      color: 'red',
                      fontSize: 40,
                      cursor:'pointer'
                    }}
                    onClick={() => handleBookmark()}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      display: 'inline-block',
                      marginLeft: 2,
                      color: 'red',
                      fontSize: 40,
                      cursor:'pointer'
                    }}
                    onClick={() => handleBookmark()}
                  />
                )}
              </Box>
            </StyledH3>

          </Box>

          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>{board.title}</StyledH4>
          </StyledDiv>

          <StyledH3>설명</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>{board.content}</StyledH4>
          </StyledDiv>

          <StyledH3>양도 매물 주소</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>{board.location}</StyledH4>
            <StyledH4>{board.locationDetail}</StyledH4>
          </StyledDiv>

          <StyledH3>양도 기간</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>
              시작날짜: {moment(board.durationStart).format("YYYY-MM-DD")} ~
              종료날짜: {moment(board.durationEnd).format("YYYY-MM-DD")}
            </StyledH4>
          </StyledDiv>

          <StyledH3>양도 거래 보증금/금액</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>양도 거래 보증금: {board.deposit}</StyledH4>
            <StyledH4>양도 거래 금액: {board.price}</StyledH4>
          </StyledDiv>

          <StyledH3>원 계약보증금/월세</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>계약보증금: {board.contractDeposit}</StyledH4>
            <StyledH4>월세: {board.contractMonthlyFee}</StyledH4>
          </StyledDiv>

          <StyledH3>매물 정보</StyledH3>
          <Divider variant="middle" />
          <div>
            <StyledDiv>
              <StyledH4>주차: {board.details.parking}</StyledH4>

              <StyledH4>엘리베이터: {board.details.elevator}</StyledH4>

              <StyledH4>구조: {board.details.roomStructure}</StyledH4>

              <StyledH4>관리비: {board.details.managementFee}</StyledH4>

              <StyledH4>관리비 포함 항목: {board.details.containManageFee}</StyledH4>

              <StyledH4>면적: {board.details.areaSize}</StyledH4>
            </StyledDiv>
          </div>

          <StyledH3>옵션 사용 가능 정보</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
                <StyledH5>옵션</StyledH5>

                <Divider variant="middle" />
                <StyleH4>
                  <div>
                    {
                      board.fixedOption.map((option, id) => (
                        <StyledDiv key={id}>
                          <div>
                            {checkList[id]}   |   {option ? "O" : "X"}
                          </div>
                        </StyledDiv>
                      ))
                    }
                  </div>
                </StyleH4>

                <StyledH5>추가옵션</StyledH5>
                <Divider variant="middle" />
                <StyledH4>{(board.additionalOption === "") ?
                ( "없음" ) : ( board.additionalOption )}</StyledH4>
          </StyledDiv>

          <StyledH3>거래 가격 정보 표</StyledH3>
          <StyledDiv>
            <PriceTable completeData={completeData}></PriceTable>
          </StyledDiv>

        </div >
      ) : (
        <div><SkeletonBoardDetail>
        </SkeletonBoardDetail>
        </div>
      )}
    </div>

  )
}

export default BoardDetail