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

const ReportHistory = (props) => {
  const { id, title, image, date } = props;
  const postBody = {
    item: [{
      "reportId": 1,
      "title": "신고합니다.",
      "date": "2022-03-25",
    }]
  };

  return (
    <StyledBox>
      <StyledTop>
        <h2>신고 내역</h2>
      </StyledTop>
      <Divider />
      <List>
        {
          postBody.item.map(row => (
            <>
              <Item key={row.reportId}>
                  <a href={'/mypage/report/' + row.reportId}>
                  <div
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%'
                    }}>
                    <div id={row.reportId + '-row-title'}>
                      <span>{row.title}</span>
                    </div>
                    <div id={row.reportId + '-row-date'}>
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

export default ReportHistory