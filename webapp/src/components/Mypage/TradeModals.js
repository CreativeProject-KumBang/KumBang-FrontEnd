import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Modal, Button, Hidden } from '@mui/material'
import dayjs from "dayjs";
import Api from 'API/Api';
import TradeSuccess from "components/Mypage/TradeSuccess"

const StyledH3 = styled.h3``;
const StyledH4 = styled.h4``;

const StyledDiv = styled.div`
   overflow:auto;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const StyledContainer = styled.div`
   overflow:auto;
   padding: 20px 5px 0px 0px;
   @media only screen and (min-width: 400px) {
        width: 400px;
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

const TradeModals = (props) => {
   const navigate = useNavigate();
   const title = props.title;
   const boardId = props.boardId;
   const state = props.state;
   const [buyerList, setBuyerList] = useState([]);
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

   return (
      <>
         {(state === "CLOSED") ? (
            <Button disabled color="success" variant="outlined" size="small" >거래 완료</Button>
         ) : (
            <Button id={boardId} color="success" variant="outlined" size="small"  onClick={(event) => handleOpen(event.target.id)}>거래 완료</Button>
         )}
         <Hidden smDown>
            <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <Box sx={style}>
                  <TradeSuccess title={title} boardId={boardId} buyerList={buyerList} setOpen={setOpen}></TradeSuccess>
               </Box>
            </Modal>
         </Hidden>
         <Hidden smUp>
            <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <Box sx={styleSmall}>
                  <TradeSuccess title={title} boardId={boardId} buyerList={buyerList} setOpen={setOpen}></TradeSuccess>
               </Box>
            </Modal>
         </Hidden>

      </>
   )
}

export default TradeModals