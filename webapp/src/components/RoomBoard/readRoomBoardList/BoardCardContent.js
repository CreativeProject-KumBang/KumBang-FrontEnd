import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const token = sessionStorage.getItem('user_token');

const BoardCardContent = (props) => {
  const { id, title, image, price, startDate, endDate } = props;

  return (
    <>
      <Grid key={id} item lg={12} md={12} sm={12} xs={12}>
        <Card
          sx={{
            boxShadow: 5,
            height: 350,
          }}
        >
          <CardContent>
            <Link
              to={{
                pathname: `/map/RoomBoardDetail/${id}`,
                state: { index: id }
              }}
            >
              <Box
                sx={{
                  marginBottom: 3,
                  height: '80%'
                }}
              >
                <Grid item xs={3} >
                <img
                  src={image}
                  alt="profile"
                  style={{
                    width: '100%',
                    height: 200
                  }}
                />

                </Grid>
                
                <div>
                  <h3>{title}</h3>
                  <h4>양도 가격: {price}</h4>
                  <h4>{startDate} ~ {endDate}</h4>
                </div>
              </Box>
            </Link>
            <Box
              sx={{
                p: 2
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default BoardCardContent;