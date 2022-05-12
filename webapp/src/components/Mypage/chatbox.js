import React from 'react';
import styled from "styled-components";
import Divider from '@mui/material/Divider';

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
  padding: 8px 12px; /* 마우스 클릭영역 확보 */

  a {
    display: flex;
    position: relative;
    margin: 10px 15px;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;

const MyPost = (props) => {
  const { id, title, image, date } = props;
  const postBody = {
    demandedItem: [
      {
        "boardId": 1,
        "title": "옥계중쪽 미투 양도합니다.",
        "userId": "집돌이",
        "date": "2022/03/28 15:28"
      }, 
      {
        "boardId": 2,
        "title": "옥계중 앞 CU쪽 미투 양도요!",
        "userId": "나는야헬창",
        "date": "2022/03/27 10:45"
      }
    ],
    providedItem: [{
      "boardId": 1,
      "title": "옥계중쪽 미투 양도",
      "image": "image1",
      "date": "2022-03-25",
    }, {
      "boardId": 2,
      "title": "옥계중 앞 CU 쪽 미투 양도요!",
      "image": "image2",
      "date": "2022-04-26",
    }]
  };

  return (
    <StyledBox>
      <StyledTop>
        <h2>채팅 내역</h2>
      </StyledTop>
      <Divider />
      <List>
        {
          postBody.demandedItem.map(row => (
            <>
              <Item key={row.boardId}>
                <a href={'/mypage/chatbox/' + row.boardId}>
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
                      <span style={{ fontSize: 18 }}>{row.userId}</span>
                    </div>
                    <div id={row.boardId + '-row-date'}>
                      <span style={{ fontSize: 16 }}>{row.date}</span>
                    </div>
                  </div>
                </a>
              </Item>
              <Divider />
            </>
          ))
        }
      </List>
      <p>내가 쓴 글</p>
      <Divider />
      <List>
        {
          postBody.providedItem.map(row => (
            <>
              <Item key={row.boardId}>
                <a href={'/mypage/chatbox/post/' + row.boardId}>
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
                    <div id={row.boardId + '-row-date'}>
                      <span style={{ fontSize: 16 }}>{row.date}</span>
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

export default MyPost