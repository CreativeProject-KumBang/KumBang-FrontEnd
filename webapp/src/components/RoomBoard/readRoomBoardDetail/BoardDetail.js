import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import moment, { locale } from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Divider from '@mui/material/Divider';

const StyledH3 = styled.h3`
  padding: 4px 15px;
`;

const StyledH = styled.h4`
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
  const board = props.board;

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
  
  return (
      <div>
        
          <StyledH5>이미지 슬라이드</StyledH5>
          <StyledDiv>
              {board.imageList.map((image, id) => (
              <StyledDiv  key={id}>
                  <img src={image} alt={`${image}-${id}`} />
              </StyledDiv>
              ))}
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
            <RemoveRedEyeIcon
              sx={{
                display: 'inline-block',
                marginLeft: 2,
                fontSize: 40
              }}
            />
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
                    <StyledH>옵션</StyledH>
                    <Divider variant="middle" />
                    <StyledH4>{board.fixedOption}</StyledH4> 

                    <StyledH>추가옵션</StyledH>
                    <Divider variant="middle" />
                    <StyledH4>{board.additionalOption}</StyledH4>
                  </StyledDiv>
              </StyledDiv>
          </StyledDiv>
          
      </div>
  )
}

export default BoardDetail