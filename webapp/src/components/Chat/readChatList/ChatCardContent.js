import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Hidden } from '@mui/material';
import { base_url } from 'API/Url';

const ChatCardContent = (props) => {
    const { roomId, boardId, title, image, opponent, date, isNew, lastMsg } = props;
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
                        width: '20%',
                        height: '100%',
                        display: "grid",
                    }}>
                    <img
                        src={base_url + image}
                        alt="profile"
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover"
                        }}
                    />
                </div>
                </Hidden>
                <Hidden mdUp>
                <div id={roomId + '-row-image'}
                    style={{
                        float: 'left',
                        width: '20%',
                        height: '100%',
                        display: "grid",
                    }}>
                    <img
                        src={base_url + image}
                        alt="profile"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover"
                        }}
                    />
                </div>

                </Hidden>

                <div
                    style={{
                        display: 'block',
                        width: '80%',
                        height: '100%'
                    }}>
                    <div id={roomId + '-row-board-title'}>
                        <span style={{ fontSize: "75%" }}>{title}</span>
                    </div>
                    <div id={roomId + '-row-user'}>
                        <span style={{ fontSize: "70%" }}>{opponent}</span>
                    </div>
                    <div id={roomId + '-row-date'}>
                        <span style={{ fontSize: "70%" }}>{date}</span>
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