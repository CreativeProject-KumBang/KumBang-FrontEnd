import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import BoardWriteComponent from 'components/RoomBoard/updateRoomBoard/BoardWriteComponent';
import Divider from '@mui/material/Divider';

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const UpdateRoomBoard = () => {
    const board_id = 1; // dummycode
    const board = {
        "title":"test title",
        "content":"test content",
        "user":{"id":"1"},
        "durationStart":"2022-04-25",
        "durationEnd":"2022-04-28",
        "location":"구미시 대학로 61길", // 주소 입력받는 api등으로 정확한 주소 필요(좌표계산에 필요함)
        "locationDetail":"디지털관 337호",
        "contractDeposit":"1000000", // 방 원래 주인이 계약한 보증금
        "contractMonthlyFee":"250000", // 방 원래 주인이 계약한 월세
        "price":"5000",  // 양도가격
        "priceType":"DAILY", // 양도가격 타입 "DAILY" or "FULL
        "deposit":"100000", // 양도 보증금
        "fixedOption":"1,1,0,0,1,0,1,0",
        "additionalOption":"선풍기 1, 건조기 1, 드라이기 1",
        "details":{
            "parking":"지하주차장",
            "elevator":"있음",
            "roomStructure":"미니투룸",
            "managementFee":"전기세",
            "containManageFee":"수도세, 가스비",
            "areaSize":"15평"
        },
        "images": ["url_1", "url_2"]
    };
    /*
    const board_id = useLocation().state.boardId;

    const [board, setBoard] = useState(); // board

    useEffect(() => {
        setTimeout(async () => {
          console.log("load");
          response = async () => await Api.getRoomBoard(board_id);
          const data = await response.json();
          console.log(data);
          setBoard(data);
          setIsLoad(true); // skeleton api 데이터 받아와서 load 완료
        }, 5000);

        if (sessionStorage.getItem('user_token')) {
            const getdata = async () => {
              const data = await back();
              setBookmark(data.data.isLike);
            };
            getdata();
          } else {
            setBookmark(false);
          }
      }, []);
*/
    return (
        <div>
            <StyledDiv>
                <h4>내가 쓴 글 | 수정</h4>
                <Divider variant="middle" />
            </StyledDiv>
            <StyledDiv>
                <BoardWriteComponent board={board}> </BoardWriteComponent>
            </StyledDiv>
        </div>
    )
}

export default UpdateRoomBoard