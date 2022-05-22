import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const token = sessionStorage.getItem('user_token');

const BoardCardContent = (props) => {
  const { id, title, writer, image, price, deposit, durationStart, durationEnd } = props;
  const [isImage, setIsImage] = useState(true); // 이미지 존재 여부 확인해서 변수에 담고 렌더링

  return (
    <>
      <Grid key={id} item lg={12} md={12} sm={12} xs={12}>
        <Card
          sx={{
            boxShadow: 5,
            height: 280,
          }}
        >
          <CardContent>
            <Link
              to={{
                pathname: `/map/detail/${id}`,
                state: { boardId: id }
              }}

            >
              <Box
                sx={{
                  marginBottom: 3,
                  height: '80%'
                }}
              >
                <Grid item xs={3}
                  sx={{
                    color: "black",
                  }}>
                  <div id={id + '-row-image'}
                    style={{
                      float: 'left',
                      width: '20%',
                      height: '100%'
                    }}>
                    {isImage ?
                      (<img
                        src={"http://192.168.227.255:8080" + image}
                        alt="profile"
                      />) : (
                      <img src="http://192.168.227.255:8080/image/bf8354c1-6156-4ba1-8b48-b4028c614f61.png" alt="profile" />
                    )}
                  </div>
                </Grid>

                <div
                  style={{
                    display: 'block',
                    width: '80%',
                    height: '100%',
                    textDecoration: "none",
                    color: "black",
                    float: 'right',
                  }}>
                  <h3>{title}</h3>
                  <span>작성자 | {writer}</span>
                  <span>보증금 | {deposit} 원</span>
                  <span>금액   | {price} 원/1박</span>
                  <span>{durationStart} ~ {durationEnd}</span>
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