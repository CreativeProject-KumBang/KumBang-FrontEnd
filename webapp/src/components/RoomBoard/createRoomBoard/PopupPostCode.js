import React from 'react';
import DaumPostcode from "react-daum-postcode";
import Button from '@mui/material/Button';
 
const PopupPostCode = (props) => {
    const setLocation = props.setLocation;
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        setLocation(fullAddress);
        props.onClose();
    }
 
    const postCodeStyle = {
        display: "block",
        //top: "50%",
        width: "95%",
        minHeight: "500px",
        padding: "10px",
    };

    return(
        <div>
            <Button onClick={() => {props.onClose()}} className='postCode_btn' 
              variant="outlined" sx={{float: 'right'}}>닫기</Button>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
        </div>
    )
}
 
export default PopupPostCode;