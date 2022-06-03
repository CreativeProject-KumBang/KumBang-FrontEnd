import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Hidden } from '@mui/material';
import { base_url } from 'API/Url';

const default_url = base_url + "/image/notfound.png";

const ChatCardContent = (props) => {
    const { roomId, boardId, title, image, opponent, date, isNew, lastMsg, isCompleted, isRemoved } = props;
    const [isImage, setIsImage] = useState(true); // 이미지 존재 여부 확인해서 변수에 담고 렌더링

    return (
        <div>
            <Link
                to={{ pathname: `/chat/detail` }}
                state={{
                    roomId: roomId,
                    boardId: boardId,
                    boardTitle: title,
                    opponent: opponent
                }}
            >
                <Hidden mdDown>
                <div id={roomId + '-row-image'}
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
                        height: "100px",
                        objectFit: "cover"
                      }}
                    /> :
                    <img
                      src={default_url}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover"
                      }}
                    />
                  }
                </div>
                </Hidden>
                <Hidden mdUp>
                <div id={roomId + '-row-image'}
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
                        height: "75px",
                        objectFit: "cover"
                      }}
                    /> :
                    <img
                      src={default_url}
                      style={{
                        width: "75px",
                        height: "75px",
                        objectFit: "cover"
                      }}
                    />
                  }
                </div>
                </Hidden>

                <div
                    style={{
                        display: 'block',
                        width: '70%',
                        height: '100%'
                    }}>
                    <div id={roomId + '-row-board-title'}>
                        <span style={{ fontSize: "70%" }}>{title}</span>
                        <div style={{ fontSize: "70%", color: "blue" }}>{isCompleted}{isRemoved}</div>
                    </div>
                    <div id={roomId + '-row-user'}>
                        <span style={{ fontSize: "65%" }}>{opponent}</span>
                    </div>
                    <div id={roomId + '-row-date'}>
                        <span style={{ fontSize: "65%" }}>{date}</span>
                    </div>
                    <div id={roomId + '-row-isRead'}>
                        <span style={{ color: "grey", fontSize: "60%" }}>{lastMsg}</span>
                        {(isNew === true) ? (
                            <NotificationsActiveIcon style={{ color: "red", float: "right" }}></NotificationsActiveIcon>
                        ) : (
                            <> </>
                        )}
                    </div>
                </div>

            </Link>
        </div>
    )

}

export default ChatCardContent