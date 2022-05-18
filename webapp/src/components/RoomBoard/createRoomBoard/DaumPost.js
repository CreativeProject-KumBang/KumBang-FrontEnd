import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PopupDom from 'components/RoomBoard/createRoomBoard/PopupDom'
import PopupPostCode from 'components/RoomBoard/createRoomBoard/PopupPostCode'
import Button from '@mui/material/Button';

const StyledBtn = styled.button`
    display: inline-block;
    max-width: 500px;
`;

const DaumPost = (props) => {
    const setLocation = props.setLocation;

	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    const postCodeStyle = {
        width: "95%",
    };

    const divStyle = {
        padding: "10px 0px 10px 0px"
    };
 
    return(
        <div>
            <div style={divStyle}>
                <Button variant="outlined" onClick={openPostCode} style={postCodeStyle}>우편번호 검색</Button>
            </div>

            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode setLocation={setLocation} onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
        </div>
    )
}

export default DaumPost;