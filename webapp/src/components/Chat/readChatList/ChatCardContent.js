import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material'

const ChatCardContent = (props) => {
    const { roomId, boardId, title, image, opponent, date } = props;
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
                <div id={roomId + '-row-image'}
                    style={{
                        float: 'left',
                        width: '20%',
                        height: '100%'
                    }}>
                    <img
                        src={image}
                        alt="profile"
                    />
                </div>
                <div
                    style={{
                        display: 'block',
                        width: '80%',
                        height: '100%'
                    }}>
                    <div id={roomId + '-row-board-title'}>
                        <span>{title}</span>
                    </div>
                    <div id={roomId + '-row-user'}>
                        <span style={{ fontSize: 18 }}>{opponent}</span>
                    </div>
                    <div id={roomId + '-row-date'}>
                        <span style={{ fontSize: 16 }}>{date}</span>
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default ChatCardContent