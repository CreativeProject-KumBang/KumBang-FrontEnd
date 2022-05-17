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
  const user_id = 3;
  const [postBody, setPostBody] = useState([]);
  const response = async () => await Api.getMyPost(user_id);
  
  useEffect(() => {
    const getData = async() => {
      const resBody = await response();
      setPostBody(resBody.data.response[0].content);
    }
      getData();
  }, []);

  const myPromise = new Promise( (resolve, reject) => { //콜백함수
    // 구현..
    // resolve(값) or reject(값)
  })
   
  myPromise
     .then(n => {}) //성공하면 콜백함수 실행. 인자 n은 resolve의 값. 리턴값은 Promise객체 (체이닝 가능)
     .catch(n => {}); //실패하면 콜백함수 실행. 인자 n은 reject의 값. 리턴값은 Promise객체 (체이닝 가능)


  const array = {
    "status": true,
    "response": [
        {
            "content": [
                {
                    "id": 2,
                    "title": "test title",
                    "author": {
                        "id": "3",
                        "email": "lichee55@gmail.com",
                        "nickname": "nicknametest",
                        "phoneNumber": "010-6346-2579",
                        "birthDate": "1998-12-19",
                        "password": null,
                        "name": "최영빈",
                        "role": [],
                        "createdAt": "2022-05-17T16:17:34.181294",
                        "updatedAt": "2022-05-17T16:17:34.181294",
                        "removedAt": null
                    },
                    "state": "OPEN",
                    "hitCount": 0,
                    "durationStart": "2022-04-25",
                    "durationEnd": "2022-04-28",
                    "durationTerm": "SHORT",
                    "location": "구미시 대학로 61길",
                    "locationDetail": "디지털관 337호",
                    "price": 5000,
                    "deposit": 100000,
                    "priceType": "DAILY",
                    "cordX": "128.387881880598",
                    "cordY": "36.1456315429562",
                    "createdAt": "2022-05-17T16:21:16.690901",
                    "updatedAt": "2022-05-17T16:21:16.690901",
                    "removedAt": null,
                    "distance": null,
                    "region": {
                        "id": 4110,
                        "state": "경상북도",
                        "city": "구미시",
                        "town": "양호동",
                        "entx": "128.3878818806",
                        "enty": "36.1456315430",
                        "quantity": "1",
                        "price": "5000.00"
                    },
                    "thumbnail": null
                },
                {
                    "id": 3,
                    "title": "test title",
                    "author": {
                        "id": "3",
                        "email": "lichee55@gmail.com",
                        "nickname": "nicknametest",
                        "phoneNumber": "010-6346-2579",
                        "birthDate": "1998-12-19",
                        "password": null,
                        "name": "최영빈",
                        "role": [],
                        "createdAt": "2022-05-17T16:17:34.181294",
                        "updatedAt": "2022-05-17T16:17:34.181294",
                        "removedAt": null
                    },
                    "state": "OPEN",
                    "hitCount": 0,
                    "durationStart": "2022-04-25",
                    "durationEnd": "2022-04-28",
                    "durationTerm": "SHORT",
                    "location": "구미시 옥계북로 51",
                    "locationDetail": "양포도서관",
                    "price": 5000,
                    "deposit": 100000,
                    "priceType": "DAILY",
                    "cordX": "128.423119048813",
                    "cordY": "36.1387768598911",
                    "createdAt": "2022-05-17T16:22:06.554445",
                    "updatedAt": "2022-05-17T16:22:06.554445",
                    "removedAt": null,
                    "distance": null,
                    "region": {
                        "id": 4112,
                        "state": "경상북도",
                        "city": "구미시",
                        "town": "옥계동",
                        "entx": "128.4231190488",
                        "enty": "36.1387768599",
                        "quantity": "1",
                        "price": "5000.00"
                    },
                    "thumbnail": null
                }
            ],
            "pageable": {
                "sort": {
                    "empty": true,
                    "sorted": false,
                    "unsorted": true
                },
                "offset": 0,
                "pageNumber": 0,
                "pageSize": 20,
                "paged": true,
                "unpaged": false
            },
            "last": true,
            "totalPages": 1,
            "totalElements": 2,
            "number": 0,
            "first": true,
            "size": 20,
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "numberOfElements": 2,
            "empty": false
        }
    ]
}

// const postBody = call.response[0].content;
// console.log(postBody);

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
                      height: '100%'
                    }}>
                    <img
                      src={row.thumbnail}
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