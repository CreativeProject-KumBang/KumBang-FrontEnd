import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
import Api from 'API/Api';
import BoardCardContent from 'components/RoomBoard/readMyRoomBoard/BoardCardContent';
import { Box, Card, Grid } from '@mui/material';

const BoardCard = (props) => {
	const [page, setPage] = useState(1);
	const [count, setcount] = useState(1);
	const [array, setarray] = useState([]);
	
    const { state } = props;

/* !--------------------------------Body--------------------------------! */
    /*const[postBody, setPostBody] = useState({
        boardId: id,
        title: title,
        user: { "id" : id },
        location: location,
        location_detail: location_detail,
        durationStart: startDate,
        durationEnd: endDate,
        price: price,
    });*/
    
    const postBody = {
		item: [{
			"boardId": 1,
			"title": "test title",
			"image": "image1",
			"price": "5000",
			"startDate": "2022-04-25",
			"endDate": "2022-04-28"
		}, {
			"boardId": 2,
			"title": "test title2",
			"image": "image2",
			"price": "5000",
			"startDate": "2022-04-26",
			"endDate": "2022-04-30"
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
						postBody.item.map(row => (<
							BoardCardContent key={row.boardId}
							id={row.boardId}
							title={row.title}
							image={row.image}
                            price={row.price}
							startDate={row.startDate}
                            endDate={row.endDate}
						/>
						))
					}
				</Grid>
			</Box >
			<Grid
				item
				lg={10}
				md={10}
				sm={12}
				xs={12}
			>
				<Box
					sx={
						{
							justifyContent: 'center',
							alignItems: 'center',
							display: 'flex'
						}
					}
				>
				</Box>
			</Grid>
            
        </div>
    )
}

export default BoardCard