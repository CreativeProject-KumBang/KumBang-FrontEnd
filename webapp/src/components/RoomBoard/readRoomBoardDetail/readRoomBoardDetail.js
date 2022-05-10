import React from 'react';
import styled from "styled-components";
import BoardDetail from 'components/RoomBoard/readRoomBoardDetail/BoardDetail'
import SkeletonBoardDetail from 'components/RoomBoard/readRoomBoardDetail/SkeletonBoardDetail'

const StyledDiv = styled.div`
    padding: 6px 20px;
    overflow:auto;
`;

const ReadRoomBoardDetail = () => {
    const [isLoad, setIsLoad] = useState(false); // skeleton 

    const [board, setBoard] = useState(null);
    const [likes, setlikes] = useState(like);
    const [bookmark, setBookmark] = useState(false);

    const response = useState();
    const back = useState();

    /*const board_id = location.href
                .split('/')
                [location.href.split('/').length - 1].split('.')[0];*/

    useEffect(() => {
        setTimeout(async () => {
          console.log("load");
          response = async () => await Api.getRoomBoard(board_id);
          back = async () => await Api.getBoardIsLike(id);
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


    return (
        <div>
            <StyledDiv>
            {isLoad ? (
                <BoardDetail board={board}> </BoardDetail> // 로딩 완료 후
            ) : (
                <SkeletonBoardDetail></SkeletonBoardDetail> // 로딩 완료 전:Skeleton
            )}   
                
            </StyledDiv>
        </div>
    )
}

export default ReadRoomBoardDetail