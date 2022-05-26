import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import Api from 'API/Api';
import { base_url } from 'API/Url';

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
  const [postBody, setPostBody] = useState([]);
  const response = async () => await Api.getMyPost();

  const [isImage, setIsImage] = useState(true);
  
  useEffect(() => {
    const getData = async() => {
      const resBody = await response();
      setPostBody(resBody.data.response[0].content);
    }
    getData();
  }, []);

  return (
    <StyledBox>
      <StyledTop>
        <h2>내가 쓴 글</h2>
      </StyledTop>
      <Divider />
      <List>
        {
          postBody.map(row => (
            <>
              <Item key={row.id}>
                <a href={'/mypage/post/' + row.id}>
                  <div id={row.id + '-row-image'}
                    style={{
                      float: 'left',
                      width: '20%',
                      height: '100%',
                    }}>
                    {(row.thumbnail != null)? 
                      <img
                        src={"http://jueleejue.iptime.org:80"+row.thumbnail.path}
                        width="100px" height="100px"
                      /> : 
                      <img 
                        //src = "http://192.168.227.255:8080/image/bf8354c1-6156-4ba1-8b48-b4028c614f61.png" 
                        alt="profile"
                        width="100px" height="100px"
                      />
                    }
                  </div>
                  <div
                    style={{
                      display: 'block',
                      width: '80%',
                      height: '100%'
                    }}>
                    <div id={row.id + '-row-title'}>
                      <span>{row.title}</span>
                    </div>
                    <div id={row.id + '-row-date'}>
                      <span style={{ fontSize: 16 }}>{row.updatedAt}</span>
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