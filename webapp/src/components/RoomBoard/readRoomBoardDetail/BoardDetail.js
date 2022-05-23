import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import moment from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Divider, Box } from '@mui/material';
import Slider from 'components/RoomBoard/readRoomBoardDetail/Slider';
import SkeletonBoardDetail from 'components/RoomBoard/readRoomBoardDetail/SkeletonBoardDetail'
import PriceTable from 'components/RoomBoard/readRoomBoardDetail/PriceTable';

const StyledH3 = styled.h3`
  padding: 4px 15px;
`;

const StyledH5 = styled.h4`
  padding: 0px 20px;
  font-weight: bolder;
`;

const StyledH4 = styled.h4`
  padding: 0px 20px;
  font-weight: normal;
`;

const StyledDiv = styled.div`
  padding: 2px 15px;
`;

const BoardDetail = (props) => {
  let board = props.board;
  const [bookmark, setBookmark] = useState(false);
  const checkList = ["에어컨", "냉장고", "세탁기", "가스레인지", "전자레인지", "책상", "책장", "옷장", "신발장"];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const prices = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const handleBookmark = async (id) => {};

  /*
    const handleBookmark = async (id) => {
      if (sessionStorage.getItem('user_token')) {
          if (bookmark === false) {
              await Api.getBoardLike(id);
              const getdata = async () => {
                  const data = await response(); // 우려 사항: 이거 필요없을 수도 있음
                  setlikes(true);
              };
              getdata();
          } else {
              await Api.getBoardUnlike(id);
              const getdata = async () => {
                  const data = await response(); // 우려 사항: 이거 필요없을 수도 있음
                  setlikes(false);
              };
              getdata();
          }
          setBookmark(!bookmark);
      } else {
          alert('로그인이 필요합니다');
      }
    };
    */
  return (
    <div>

      {(!(board.length===0)) ? (
        <div>
          <StyledH5>이미지 슬라이드</StyledH5>
          <StyledDiv>
            <Slider files={board.files}></Slider>
          </StyledDiv>

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
                  fontSize: 40
                }}
                onClick={() => handleBookmark(id)}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  display: 'inline-block',
                  marginLeft: 2,
                  color: 'red',
                  fontSize: 40
                }}
                onClick={() => handleBookmark(id)}
              />
            )}
          </Box>
          <StyledH3>제목</StyledH3>
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
            <StyledDiv>
              <StyledDiv>
                <StyledH5>옵션</StyledH5>

                <Divider variant="middle" />
                <StyledH4>
                  <div>
                    {
                      board.fixedOption.map((option, id) => (
                        <StyledDiv key={id}>
                          <div>
                            {checkList[id]} : {option ? "O" : "X"}
                          </div>
                        </StyledDiv>
                      ))
                    }
                  </div>
                </StyledH4>

                <StyledH5>추가옵션</StyledH5>
                <Divider variant="middle" />
                <StyledH4>{board.additionalOption}</StyledH4>
              </StyledDiv>
            </StyledDiv>
          </StyledDiv>

          <StyledH3>거래 가격 정보 표</StyledH3>
          <StyledDiv>
            <PriceTable prices={prices}></PriceTable>
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