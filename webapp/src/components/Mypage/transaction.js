import React, { useEffect, useState } from 'react';
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
  const [postBody, setPostBody] = useState([]);
  const response = async () => await Api.getTransaction();

  useEffect(() => {
      const getData = async () => {
          const resBody = await response();
          console.log(resBody.data.response[0].content);
          setPostBody(resBody.data.response[0].content);
      }
      getData();
  }, []);

  return (
    <StyledBox>
      <StyledTop>
        <h2>거래 내역</h2>
      </StyledTop>
      <Divider />
      <List>
        {
          postBody.map(row => (
            <>
              <Item key={row.id}>
                <a href={'/rooms/' + row.board.boardId}>
                  <div id={row.id + '-row-image'}
                    style={{
                      float: 'left',
                      width: '20%',
                      height: '100%'
                    }}>
                    <img
                      src={row.board.files[0].path}
                      alt="profile"
                    />
                  </div>
                  <div
                    style={{
                      display: 'block',
                      width: '80%',
                      height: '100%'
                    }}>
                    <div id={row.id + '-row-title'}>
                      <span>{row.board.title}</span>
                    </div>
                    <div id={row.id + '-row-user'}>
                      <span style={{ fontSize: 16 }}>{row.board.user.nickname}</span>
                    </div>
                    <div id={row.id + '-row-period'}>
                      <span style={{ fontSize: 16 }}>{row.board.durationStart}~{row.board.durationEnd}</span>
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