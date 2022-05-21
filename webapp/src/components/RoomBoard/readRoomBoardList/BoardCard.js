import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
import Api from 'API/Api';
import BoardCardContent from 'components/RoomBoard/readRoomBoardList/BoardCardContent';
import { Box, Card, Grid } from '@mui/material';

const BoardCard = (props) => {
	//const [postBody, setPostBody] = useState([]);
	const [isImage, setIsImage] = useState(true); // 이미지 존재 여부 확인해서 변수에 담고 렌더링
/*	const response = async () => await Api.getAllRoomBoard();

	useEffect(() => {
		const getData = async() => {
		  const resBody = await response();
		  console.log(resBody);
		  setPostBody(resBody.data.response[0].content);
		  if(postBody.image === undefined){
			setIsImage(false);
		  }
		}
		  getData();
	  }, []);*/

/* !--------------------------------Body--------------------------------! */
/*{
    "content": [
        {
            "id": 1,
            "title": "test title",
            "author": {
                "id": "1",
                "email": "lichee55@gmail.com",
                "name": "최영빈",
                "role": [
                    "ROLE_USER"
                ],
                "createdAt": "2022-05-02T13:09:37.625451",
                "updatedAt": "2022-05-02T13:09:37.625451",
                "removedAt": null
            },
            "state": "OPEN",
            "hitCount": 0,
            "durationStart": "2022-04-25",
            "durationEnd": "2022-04-28",
            "location": "구미시 대학로 61길",
            "locationDetail": "디지털관 337호",
            "price": 5000,
            "deposit": 100000,
            "priceType": "DAILY",
            "cordX": "128.387881880598",
            "cordY": "36.1456315429562",
            "createdAt": "2022-05-02T13:10:46.912687",
            "updatedAt": "2022-05-02T13:10:46.912687",
            "removedAt": null,
            "distance": 0.00014366282481538747272244,
            "region": {
                "id": 4110,
                "state": "경상북도",
                "city": "구미시",
                "town": "양호동",
                "entx": "128.387881880598",
                "enty": "36.1456315429562",
                "quantity": "1"
            }
        },
}
	
	
	*/
    
    const postBody = {
		content: [{
			"id": 1,
			"author":{
				"name" : "최영빈"
			},
			"title": "test title",
			"image": "image1",
            "price": 5000,
            "deposit": 100000,
			"durationStart": "2022-04-25",
			"durationEnd": "2022-04-28"
		}, {
			"id": 2,
			"author":{
				"name" : "북극곰구하자"
			},
			"title": "test2 방 양도 합니다. 옥계중",
			"image": "image2",
            "price": 5000,
            "deposit": 100000,
			"durationStart": "2022-04-26",
			"durationEnd": "2022-04-30"
		}]
    };
	

	const { id, title, image, price, startDate, endDate } = postBody;

    return (
        <div>
            <Box >
				<Grid
					container 
					spacing={3}
					sx={{
						width: '100%'
					}}
				>
					{
						postBody.content.map(row => (<
							BoardCardContent key={row.id}
							id={row.id}
							title={row.title}
							writer={row.author.name}
							image={row.image}
                            price={row.price}
							deposit={row.deposit}
							durationStart={row.durationStart}
                            durationEnd={row.durationEnd}
						/>
						))
					}
				</Grid>
			</Box >
        </div>
    )
}

export default BoardCard