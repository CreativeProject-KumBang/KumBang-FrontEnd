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

const Wishlists = (props) => {
    const { id, title, image, date } = props;
    const postBody = {
        item: [
            {
                "boardId": 1,
                "title": "옥계중쪽 미투 양도합니다.",
                "userId": "집돌이",
            },
            {
                "boardId": 2,
                "title": "옥계중 앞 CU쪽 미투 양도요!",
                "userId": "나는야헬창",
            }
        ]
    };

    return (
        <StyledBox>
            <StyledTop>
                <h2>찜 내역</h2>
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
                                        <div id={row.boardId + '-row-date'}>
                                            <span style={{ fontSize: 16 }}>{row.userId}</span>
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

export default Wishlists