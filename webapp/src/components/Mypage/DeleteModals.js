import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Modal, Button, Hidden } from '@mui/material'
import DeleteContents from "components/Mypage/DeleteContents"
import dayjs from "dayjs";
import Api from 'API/Api';

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

const DeleteModals = (props) => {
    const navigate = useNavigate();
    const title = props.title;
    const boardId = props.boardId;

    // 모달 관련 변수, 함수 정의
    const [open, setOpen] = React.useState(false);
    async function handleOpen() {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button id={boardId} color="success" variant="outlined" size="small" sx={{float: "right"}}onClick={(event) => handleOpen()}>삭제</Button>
            <Hidden smDown>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <DeleteContents title={title} boardId={boardId} setOpen={setOpen}></DeleteContents>
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
                        <DeleteContents title={title} boardId={boardId} setOpen={setOpen}></DeleteContents>
                    </Box>
                </Modal>
            </Hidden>

        </>
    )
}

export default DeleteModals