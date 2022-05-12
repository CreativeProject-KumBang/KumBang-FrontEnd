import React, { useEffect } from 'react';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import Api from 'API/Api';

const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const StyledTop = styled.div`
    display: block;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 50px;
    font-size: 22px;
`;

const List = styled.ul`
  list-style: none;
  margin: auto;
  padding: 0;
`;

const Item = styled.li`
  padding: 12px 12px; /* 마우스 클릭영역 확보 */

  a {
    display: flex;
    position: relative;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;

const Transaction = () => {
  // const transId = 1;
  // const [postBody, setPostBody] = useState([]);
  // const response = async () => Api.getTransaction(transId);
  
  // useEffect(() => {
  //     const data = response();
  //     setPostBody(data);
  // }, []); 

  const postBody = {
    item: [{
      "boardId": 1,
      "title": "신옥계 롯데리아 뒤 양도",
      "image": "image1",
      "userId": "북극곰",
      "startDate": "2022-01-25",
      "endDate": "2022-02-25"
    }, {
      "boardId": 2,
      "title": "옥계중 근처 양도!",
      "image": "image2",
      "userId": "모나리자",
      "startDate": "2021-07-01",
      "endDate": "2021-08-30"
    }]
  };

  return (
    <StyledBox>
      <StyledTop>
        <h2>거래 내역</h2>
      </StyledTop>
      <Divider />
      <List>
        {
          postBody.item.map(row => (
            <>
              <Item key={row.boardId}>
                <a href={'/mypage/post/' + row.boardId}>
                  <div id={row.boardId + '-row-image'}
                    style={{
                      float: 'left',
                      width: '20%',
                      height: '100%'
                    }}>
                    <img
                      src={row.image}
                      alt="profile"
                    />
                  </div>
                  <div
                    style={{
                      display: 'block',
                      width: '80%',
                      height: '100%'
                    }}>
                    <div id={row.boardId + '-row-title'}>
                      <span>{row.title}</span>
                    </div>
                    <div id={row.boardId + '-row-user'}>
                      <span style={{ fontSize: 16 }}>{row.userId}</span>
                    </div>
                    <div id={row.boardId + '-row-period'}>
                      <span style={{ fontSize: 16 }}>{row.startDate}~{row.endDate}</span>
                    </div>
                  </div>
                </a>
              </Item>
              <Divider />
            </>
          ))
        }
      </List>
    </StyledBox>
  );
};

export default Transaction