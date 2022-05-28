import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Divider, Button, Hidden, Box, Chip, Modal } from '@mui/material';
import TradeSuccess from "components/Mypage/TradeSuccess"
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
  const [buyerList, setBuyerList] = useState([]);
  const [boardId, setBoardId] = useState();
  const response = async () => await Api.getMyPost();
  const resbuyerList = async () => await Api.getBuyerList(boardId);

  // 모달 관련 변수, 함수 정의
  const [open, setOpen] = React.useState(false);
  async function handleOpen(board_id) {
    const resbuyerList = await Api.getBuyerList(board_id);
    console.log(resbuyerList);
    setBuyerList(resbuyerList.data.response.content);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

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
                <div>
                  <a href={'/mypage/detail/' + row.id}>
                    <Hidden mdDown>
                      <div id={row.id + '-row-image'}
                        style={{
                          float: 'left',
                          width: '20%',
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
                    </Hidden>
                    <Hidden mdUp>
                      <div id={row.id + '-row-image'}
                        style={{
                          float: 'left',
                          width: '20%',
                          height: '100%',
                          display: "grid",
                        }}>
                        {(row.thumbnail != null) ?
                          <img
                            src={base_url + row.thumbnail.path}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover"
                            }}
                          /> :
                          <img
                            src={default_url}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover"
                            }}
                          />
                        }
                      </div>
                    </Hidden>

                    <div
                      style={{
                        display: 'block',
                        width: '80%',
                        height: '100%'
                      }}>
                      <div id={row.id + '-row-title'}>
                        <span style={{ fontSize: "75%" }}>{row.title}</span>
                      </div>
                      <div id={row.id + '-row-date'}>
                        <span style={{ fontSize: "70%" }}>{row.updatedAt}</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <Button id={row.id} color="success" variant="outlined" sx={{ float: "right" }} onClick={(event) => handleOpen(event.target.id)}>거래 완료</Button>
                  <Hidden mdDown>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <TradeSuccess title={row.title} boardId={row.id} buyerList={buyerList}></TradeSuccess>
                      </Box>
                    </Modal>
                  </Hidden>
                  <Hidden mdUp>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleSmall}>
                        <TradeSuccess title={row.title} boardId={row.id} buyerList={buyerList}></TradeSuccess>
                      </Box>
                    </Modal>
                  </Hidden>
                </div>
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