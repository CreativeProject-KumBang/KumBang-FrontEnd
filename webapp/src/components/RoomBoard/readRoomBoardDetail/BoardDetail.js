import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Api from 'API/Api';
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

const BoardDetail = () => {
  const board_id = 1;
  /*const[postBody, setPostBody] = useState();

  const response = async () => await Api.getRoomBoard(board_id);
  useEffect(() => {
    const getdata = async () => {
      const data = await response();
      setPostBody(data);
    };
  }, []);
*/
    /*const board_id = location.href
                    .split('/')
                    [location.href.split('/').length - 1].split('.')[0];
    const[postBody, setPostBody] = useState({
        title: title,
        user: { "id" : id },
        location: location,
        location_detail: location_detail,
        durationStart: startDate,
        durationEnd: endDate,
        price: price,
        contract_deposit: contract_deposit,
        contractMonthlyFee: contractMonthlyFee,
        fixedOption: options,
        additionalOption: add_options,
        details : {
            "parking": park,
            "elevator":elevator,
            "roomStructure":structure,
            "managementFee": admin_expense,
            "containManageFee": contain_admin_expense,
            "areaSize": area
        }
    });*/

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
      "additionalOption":"선풍기 1, 건조기 1, 드라이기 1",
      "details":{
          "parking":"지하주차장",
          "elevator":"있음",
          "roomStructure":"미니투룸",
          "managementFee":"전기세",
          "containManageFee":"수도세, 가스비",
          "areaSize":"15평"
      }
  });
  
  /*
    useEffect(async () => {
        const list = [];
        let response = await Api.getRoomBoard(board_id);
        // setPostBody(response.data);
      }, []);
      */
    /*
    const [likes, setlikes] = useState(like);
    const [bookmark, setBookmark] = useState(false);

    const front = async () => await Api.getRoomBoard(id);
    const back = async () => await Api.getBoardIsLike(id);
    useEffect(() => {
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
  
    const handleBookmark = async (id) => {
      if (sessionStorage.getItem('user_token')) {
        if (bookmark === false) {
          await Api.getBoardLike(id);
          const getdata = async () => {
            const data = await front();
            setlikes();
          };
          getdata();
        } else {
          await Api.getBoardUnlike(id);
          const getdata = async () => {
            const data = await front();
            setlikes();
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
            {/*
            <StyledH5>이미지 슬라이드</StyledH5>
            <StyledDiv>
                {showImages.map((image, id) => (
                <StyledDiv  key={id}>
                    <img src={image} alt={`${image}-${id}`} />
                </StyledDiv>
                ))}
            </StyledDiv>
                */}
            <StyledH3>제목</StyledH3>
            <Divider variant="middle" />
            <StyledDiv>
              <StyledH4>{postBody.title}</StyledH4>
            </StyledDiv>
              
            {/*
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
              <StyledH4 style={{ display: 'inline-block' }}>
                &nbsp;
                {hit}
              </StyledH4>
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
              <StyledH4 style={{ display: 'inline-block' }}>
                &nbsp;
                {likes}
              </StyledH4>
            </Box>
            */}
            <StyledH3>양도 매물 주소</StyledH3>
            <Divider variant="middle" />
            <StyledDiv>
                <StyledH4>{postBody.location}</StyledH4>
                <StyledH4>{postBody.locationDetail}</StyledH4>
            </StyledDiv>

            <StyledH3>양도 기간</StyledH3>
            <Divider variant="middle" />
            <StyledDiv>
              <StyledH4>
                시작날짜: {moment(postBody.durationStart).format("YYYY-MM-DD")} ~  
                종료날짜: {moment(postBody.durationEnd).format("YYYY-MM-DD")} 
              </StyledH4>
            </StyledDiv>

            <StyledH3>양도 거래금액</StyledH3>
            <Divider variant="middle" />
            <StyledDiv>
                <StyledH4>{postBody.price}</StyledH4>
            </StyledDiv>

            <StyledH3>원 계약보증금/월세</StyledH3>
            <Divider variant="middle" />
            <StyledDiv>
              <StyledH4>계약보증금: {postBody.contractDeposit}</StyledH4>
              <StyledH4>월세: {postBody.contractMonthlyFee}</StyledH4>
            </StyledDiv>

            <StyledH3>매물 정보</StyledH3>
            <Divider variant="middle" />
            <div>
                <StyledDiv>
                  <StyledH4>주차: {postBody.details.parking}</StyledH4>

                  <StyledH4>엘리베이터: {postBody.details.elevator}</StyledH4>

                  <StyledH4>구조: {postBody.details.roomStructure}</StyledH4>

                  <StyledH4>관리비: {postBody.details.managementFee}</StyledH4>

                  <StyledH4>관리비 포함 항목: {postBody.details.containManageFee}</StyledH4>

                  <StyledH4>면적: {postBody.details.areaSize}</StyledH4>
                </StyledDiv>
            </div>

            <StyledH3>옵션 사용 가능 정보</StyledH3>
            <Divider variant="middle" />
            <StyledDiv>
                <StyledDiv>
                    <StyledDiv>
                      <StyledH>옵션</StyledH>
                      <Divider variant="middle" />
                      <StyledH4>{postBody.fixedOption}</StyledH4>

                      <StyledH>추가옵션</StyledH>
                      <Divider variant="middle" />
                      <StyledH4>{postBody.additionalOption}</StyledH4>
                    </StyledDiv>
                </StyledDiv>
            </StyledDiv>
            
        </div>
    )
}

export default BoardDetail