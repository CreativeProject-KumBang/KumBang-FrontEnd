import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Api from 'API/Api';


const StyledH5 = styled.h5`
`;

const StyledDiv = styled.div`
    padding: 6px 8px;
`;


const BoardDetailContent = (props) => {

    const board_id = 1;
    let response = await Api.getRoomBoard(board_id);
    const postBody = response;
    
    const[postBody, setPostBody] = useState({
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
      "priceType":"DAILY", // 양도가격 타입 "DAILY" or "FULL"
      "deposit":"100000", // 양도 보증금
      "fixedOption":"1,1,0,0,1,0,1,0",
      "additionalOption":"선풍기 1|건조기 1|드라이기 1",
      "details":{
          "parking":"지하주차장",
          "elevator":"있음",
          "roomStructure":"미니투룸",
          "managementFee":"전기세",
          "containManageFee":"수도세, 가스비",
          "areaSize":"15평"
      }
  });
  
 
    return (
        <div>
            
            <StyledH5>이미지 슬라이드</StyledH5>
            <StyledDiv>
                {showImages.map((image, id) => (
                <StyledDiv  key={id}>
                    <img src={image} alt={`${image}-${id}`} />
                </StyledDiv>
                ))}
            </StyledDiv>
            
            <StyledH5>제목</StyledH5>
            <StyledDiv>
                <h4>{postBody.title}</h4>
            </StyledDiv>

            <StyledH5>양도 매물 주소</StyledH5>
            <StyledDiv>
                <h4>{postBody.location}</h4>
            </StyledDiv>
            <StyledDiv>
                <h4>{postBody.locationDetail}</h4>
            </StyledDiv>

            <StyledH5>양도 기간</StyledH5>
            <StyledDiv>
                <StyledDiv className="text-gray-500 mt-4">
                    시작날짜: {moment(postBody.durationStart).format("YYYY-MM-DD")} ~  
                    종료날짜: {moment(postBody.durationEnd).format("YYYY-MM-DD")} 
                </StyledDiv>
            </StyledDiv>

            <StyledH5>양도 거래금액</StyledH5>
            <StyledDiv>
                <h4>{postBody.price}</h4>
            </StyledDiv>

            <StyledH5>원 계약보증금/월세</StyledH5>
            <StyledDiv>
              <h4>계약보증금 {postBody.contractDeposit}</h4>
            </StyledDiv>
            <StyledDiv>
              <h4>월세 {postBody.contractMonthlyFee}</h4>
            </StyledDiv>

            <StyledH5>매물 정보</StyledH5>
            <div>
                <StyledDiv>
                  <h4>주차 {postBody.details.parking}</h4>
                </StyledDiv>
                <StyledDiv>
                  <h4>엘리베이터 {postBody.details.elevator}</h4>
                </StyledDiv>
                <StyledDiv>
                  <h4>구조 {postBody.details.roomStructure}</h4>
                </StyledDiv>
                <StyledDiv>
                  <h4>관리비 {postBody.details.managementFee}</h4>
                </StyledDiv>
                <StyledDiv>
                  <h4>관리비 포함 항목 {postBody.details.containManageFee}</h4>
                </StyledDiv>
                <StyledDiv>
                  <h4>면적 {postBody.details.areaSize}</h4>
                </StyledDiv>
            </div>

            <StyledH5>관리비 포함 항목</StyledH5>
            <StyledDiv>
                <StyledInput id="outlined-basic"
                    type="text"
                    placeholder="ex) 0만원(전기, 가스 별도)
                    ex) 4만원(전기, 가스 별도) - wifi, 수도세, 티비"
                    onChange={(event) => setContain_admin_expense(event.target.value)}
                />
            </StyledDiv>

            <StyledH5>옵션 사용 가능 정보</StyledH5>
            <StyledDiv>
                <StyledDiv>
                    <StyledDiv>옵션
                      <h4>{postBody.details.additionalOption}</h4>
                    </StyledDiv>
                    <StyledDiv>추가옵션
                      <h4>{postBody.details.additionalOption}</h4>
                    </StyledDiv>
                </StyledDiv>
            </StyledDiv>
            
        </div>
    )
}

export default BoardDetailContent