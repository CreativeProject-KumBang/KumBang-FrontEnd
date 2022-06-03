import * as React from 'react';
import styled from "styled-components";
import { Container, Box, Chip } from '@mui/material'
import Api from 'API/Api';

const StyledH4 = styled.h4``;
const StyledContainer = styled.div`
   overflow:auto;
   padding: 20px 5px 0px 0px;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const DeleteContents = (props) => {
    const title = props.title;
    const boardId = props.boardId;
    const setOpen = props.setOpen;

    const DeleteRoom = async () => {
        let response = await Api.deleteRoomBoard(boardId); // API
        
        console.log(response);
        
        if (response.data.status) {
           alert('삭제되었습니다.', response.data.status);
           setOpen(false);
           window.location.href = "/mypage/post";
        } else {
           alert('삭제 실패하였습니다.', response.data.status);
        }
    }

    const handleClose = () => setOpen(false);

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 2,
                marginRight: 2,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <StyledH4>"{title}"</StyledH4>
                <StyledH4>게시글을 정말 삭제하시겠습니까?</StyledH4>
                <StyledContainer>
                    <Chip label="삭제" color="success" variant="outlined"
                        onClick={DeleteRoom} sx={{ float: 'right', marginLeft: "10px" }}>
                    </Chip >
                    <Chip label="취소" color="success" variant="outlined"
                        onClick={handleClose} sx={{ float: 'right' }}>
                    </Chip >
                </StyledContainer>
            </Box>
        </Container>
    )
}

export default DeleteContents