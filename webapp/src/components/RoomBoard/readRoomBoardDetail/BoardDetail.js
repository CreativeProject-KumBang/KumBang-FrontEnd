import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import moment from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Divider, Box } from '@mui/material';

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
  // const board = props.board; // props로 board 데이터를 전달 받아서 씀. (필요)
  const [bookmark, setBookmark] = useState(true);

  const board = {
    "title":"test title",
    "content":"test content",
    "user":{"id":"1"},
    "durationStart":"2022-04-25",
    "durationEnd":"2022-04-28",
    "location":"구미시 대학로 61길", // 주소 입력받는 api등으로 정확한 주소 필요(좌표계산에 필요함)
    "locationDetail":"디지털관 337호",
    "contractDeposit":"1000000", // 방 원래 주인이 계약한 보증금
    "contractMonthlyFee":"250000", // 방 원래 주인이 계약한 월세
    "price":"5000",  // 양도가격
    "priceType":"DAILY", // 양도가격 타입 "DAILY" or "FULL
    "deposit":"100000", // 양도 보증금
    "fixedOption":"1,1,0,0,1,0,1,0",
    "additionalOption":"선풍기 1, 건조기 1, 드라이기 1",
    "details":{
        "parking":"지하주차장",
        "elevator":"있음",
        "roomStructure":"미니투룸",
        "managementFee":"전기세",
        "containManageFee":"수도세, 가스비",
        "areaSize":"15평"
    },
    "images": ["url_1", "url_2"]
};
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
        
          <StyledH5>이미지 슬라이드</StyledH5>
          <StyledDiv>
              {/*board.imageList.map((image, id) => (
              <StyledDiv  key={id}>
                  <img src={image} alt={`${image}-${id}`} />
              </StyledDiv>
              ))*/}
          </StyledDiv>
          <StyledH3>제목</StyledH3>
          <Divider variant="middle" />
          <StyledDiv>
            <StyledH4>{board.title}</StyledH4>
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
                    <StyledH4>{board.fixedOption}</StyledH4> 

                    <StyledH5>추가옵션</StyledH5>
                    <Divider variant="middle" />
                    <StyledH4>{board.additionalOption}</StyledH4>
                  </StyledDiv>
              </StyledDiv>
          </StyledDiv>
          
      </div>
  )
}

export default BoardDetail