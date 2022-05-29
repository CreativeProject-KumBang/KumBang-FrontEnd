import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Divider, Button, Hidden, Box, Chip, Modal } from '@mui/material';
import TradeSuccess from "components/Mypage/TradeSuccess"
import Modals from "components/Mypage/Modals"
import Api from 'API/Api';
import { base_url } from 'API/Url';

const default_url = base_url + "/image/bf8354c1-6156-4ba1-8b48-b4028c614f61.png";

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
  display: flex;

  a {
    display: flex;
    position: relative;
    margin: 10px 15px;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;

const style = {
  overflowY: 'scroll',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleSmall = {
  overflow: 'scroll',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyPost = (props) => {
  const [postBody, setPostBody] = useState([]);
  const [boardId, setBoardId] = useState();
  const response = async () => await Api.getMyPost();

  useEffect(() => {
    const getData = async () => {
      const resBody = await response();
      console.log(resBody);
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
              <Item key={row.id} style={{ display: "block" }}>
                <div style={{ width: "100%", position: "relative" }}>
                  <a href={'/mypage/detail/' + row.id}>

                    <Hidden mdDown>
                      <div id={row.id + '-row-image'}
                        style={{
                          float: 'left',
                          width: '30%',
                          height: '100%',
                          display: "grid",
                        }}>
                        {(row.thumbnail != null) ?
                          <img
                            src={base_url + row.thumbnail.path}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover"
                            }}
                          /> :
                          <img
                            src={default_url}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover"
                            }}
                          />
                        }
                      </div>
                      <div
                        style={{
                          display: 'block',
                          width: '70%',
                          height: '100%'
                        }}>
                        <div id={row.id + '-row-title'}>
                          <span style={{ fontSize: "75%" }}>{row.title}</span>
                        </div>
                        <div id={row.id + '-row-date'}>
                          <span style={{ fontSize: "70%" }}>{row.updatedAt}</span>
                        </div>
                      </div>
                    </Hidden>

                    <Hidden mdUp>
                      <div id={row.id + '-row-image'}
                        style={{
                          float: 'left',
                          width: '30%',
                          height: '100%',
                          display: "grid",
                        }}>
                        {(row.thumbnail != null) ?
                          <img
                            src={base_url + row.thumbnail.path}
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "cover"
                            }}
                          /> :
                          <img
                            src={default_url}
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "cover"
                            }}
                          />
                        }
                      </div>
                      <div
                        style={{
                          display: 'block',
                          width: '70%',
                          height: '100%'
                        }}>
                        <div id={row.id + '-row-title'}>
                          <span style={{ fontSize: "70%" }}>{row.title}</span>
                        </div>
                        <div id={row.id + '-row-date'}>
                          <span style={{ fontSize: "65%" }}>{row.updatedAt}</span>
                        </div>
                      </div>
                    </Hidden>

                  </a>
                </div>
                <Hidden mdDown>
                  <div style={{ marginLeft: "25px" }}>
                    <Modals title={row.title} boardId={row.id} state={row.state}></Modals>
                  </div>

                </Hidden>
                <Hidden mdUp>
                  <div style={{ marginLeft: "10px" }}>
                    <Modals title={row.title} boardId={row.id} state={row.state}></Modals>
                  </div>

                </Hidden>


                {/* <a href={'/mypage/detail/' + row.id}>
                    <div
                      style={{
                        display: 'block',
                        width: '80%',
                        height: '100%'
                      }}>
                      <div id={row.id + '-row-title'}>
                        <span style={{ fontSize: "75%" }}>{row.title}|{row.id}</span>
                      </div>
                      <div id={row.id + '-row-date'}>
                        <span style={{ fontSize: "70%" }}>{row.updatedAt}</span>
                      </div>
                    </div>
                  </a> */}


              </Item>
              <Divider />
            </>
          ))
        }
      </List>
    </StyledBox >
  );
};

export default MyPost