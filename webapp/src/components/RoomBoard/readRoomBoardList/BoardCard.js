import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment, { locale } from 'moment';
import Api from 'API/Api';
import BoardCardContent from 'components/RoomBoard/readRoomBoardList/BoardCardContent';
import { Box, Card, Grid, Paper } from '@mui/material';
import { base_url } from 'API/Url';

const default_imageurl = base_url + "default";

const BoardCard = (props) => {
   const getBody = props.getBody;
   const isDetail = () => props.setIsDetail;

   return (
      <Box pb={2}>
         <Grid
            container
            spacing={2}
            sx={{
               width: '100%',
               height: '100%',
            }}
         >
            {
               getBody.map(row => (<
                  BoardCardContent key={row.id}
                  isDetail={isDetail}
                  id={row.id}
                  title={row.title}
                  writer={row.author.name}
                  image={(row.thumbnail === null) ?
                     (default_imageurl) : (row.thumbnail.path)}
                  price={row.price}
                  deposit={row.deposit}
                  durationStart={row.durationStart}
                  durationEnd={row.durationEnd}
               />
               ))
            }
         </Grid>
      </Box >
   )
}

export default BoardCard