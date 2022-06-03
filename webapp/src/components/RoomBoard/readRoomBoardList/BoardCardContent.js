import { Box, Card, CardContent, Grid, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { base_url } from 'API/Url';

const default_url = base_url + "/image/notfound.png";

const BoardCardContent = (props) => {
  const { id, title, writer, image, price, deposit, durationStart, durationEnd, isDetail } = props;

  return (

    <Grid key={id} item lg={12} md={12} sm={12} xs={12}>
      <Card>
        <CardContent
          sx={{
            fontSize: "22px"
          }}>
          <Link //링크여야함. a태그 href시 리랜더링 되기 때문.
            onClick={isDetail(true)}
            to={{
              pathname: `/map/detail/${id}`,
              state: { boardId: id }
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Hidden mdDown>
              <div id={id + '-row-image'}
                style={{
                  float: 'left',
                  width: '30%',
                  height: '100%',
                  display: "grid",
                }}>
                {(image != null) ?
                  <img
                    src={base_url + image}
                    style={{
                      width: "100px",
                      height: "150px",
                      objectFit: "cover"
                    }}
                  /> :
                  <img
                    src={default_url}
                    style={{
                      width: "100px",
                      height: "150px",
                      objectFit: "cover"
                    }}
                  />
                }
              </div>
              <div
                style={{
                  display: 'block',
                  height: '100%'
                }}>
                <div id={id + '-row-title'}>
                  <span style={{ fontSize: "75%", fontWeight: "bold" }}>{title}</span>
                </div>
                <div id={id + '-row-writer'}>
                  <span style={{ fontSize: "70%" }}>작성자 | {writer}</span>
                </div>
                <div id={id + '-row-deposit'}>
                  <span style={{ fontSize: "70%" }}>보증금 | {deposit} 원</span>
                </div>
                <div id={id + '-row-price'}>
                  <span style={{ fontSize: "70%" }}>금액   | {price} 원/1박</span>
                </div>
                <div id={id + '-row-date'}>
                  <span style={{ fontSize: "70%" }}>{durationStart} ~ {durationEnd}</span>
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              <div id={id + '-row-image'}
                style={{
                  float: 'left',
                  width: '30%',
                  height: '100%',
                  display: "grid",
                }}>
                {(image != null) ?
                  <img
                    src={base_url + image}
                    style={{
                      width: "75px",
                      height: "150px",
                      objectFit: "cover"
                    }}
                  /> :
                  <img
                    src={default_url}
                    style={{
                      width: "75px",
                      height: "150px",
                      objectFit: "cover"
                    }}
                  />
                }
              </div>
              <div
                style={{
                  display: 'block',
                  height: '100%'
                }}>
                <div id={id + '-row-title'}>
                  <span style={{ fontSize: "70%", fontWeight: "bold" }}>{title}</span>
                </div>
                <div id={id + '-row-writer'}>
                  <span style={{ fontSize: "65%" }}>작성자 | {writer}</span>
                </div>
                <div id={id + '-row-deposit'}>
                  <span style={{ fontSize: "65%" }}>보증금 | {deposit} 원</span>
                </div>
                <div id={id + '-row-price'}>
                  <span style={{ fontSize: "65%" }}>금액   | {price} 원/1박</span>
                </div>
                <div id={id + '-row-date'}>
                  <span style={{ fontSize: "65%" }}>{durationStart} ~ {durationEnd}</span>
                </div>
              </div>

            </Hidden>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BoardCardContent;