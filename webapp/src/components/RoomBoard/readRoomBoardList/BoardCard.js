import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
import Api from 'API/Api';
import BoardCardContent from 'components/RoomBoard/readRoomBoardList/BoardCardContent';
import { Box, Card, Grid, Paper } from '@mui/material';

const BoardCard = (props) => {
	//const [postBody, setPostBody] = useState([]);
	const [isImage, setIsImage] = useState(true); // 이미지 존재 여부 확인해서 변수에 담고 렌더링

/*	//-------------------API CODE----------------------

	const response = async () => await Api.getAllRoomBoard();

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
    
    const postBody = {
		content: [{
			"id": 1,
			"author":{
				"name" : "최영빈"
			},
			"title": "test1 영빈님 팝니다.",
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