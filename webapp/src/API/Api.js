
import client from 'API/axiosConfig';
import qs from "qs";


const getRequest = async (path, params = {}) => {
    try {
        params = qs.stringify(params);
        console.log(client.getUri());
        const data = await client.get(path + params);
        console.log(path+params);
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormReqest = async (path, body) => {
    try {
        const data = await client.post(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const postJsonReqest = async (path, body) => {
    try {
        const data = await client.post(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const putJsonReqest = async (path, body) => {
    try {
        const data = await client.put(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteJsonReqest = async (path) => {
    try {
        const data = await client.delete(path, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const Api = {
    // 이메일 인증코드 저장
    emailCode: null,

    // 한 페이지당 보여줄 컨텐츠 개수
    pageCount: 3,

    // 로그인
    postLogin: async (email, password) => {
        return await postJsonReqest('/auth/login', {
            email,
            password
        });
    },
    // 로그아웃
    postLogout: async () => {
        return await postJsonReqest('/auth/logout', null);
    },
    // 이메일 인증 번호 전송
    postEmail: async (email) => {
        return await postJsonReqest('/auth/sendmail', { email }
        );
    },
    // 이메일 인증 번호 확인
    postAuthEmail: async (email, authkey) => {
        console.log(email, authkey)
        return await postJsonReqest('/auth/authmail', { email, authkey });
    },
    // 회원가입
    postSignup: async (info) => {
        return await postJsonReqest('/auth/signup', info);
    },
    // 회원탈퇴
    getWithdrawal: async () => {
        return await deleteJsonReqest('/user');
    },
    // Mypage--------------------------------------------------------------------------------
    // 내 정보 조회
    getMyInfo: async (userId) => {
        return await getRequest(`/mypage/${userId}`);
    },
    // 내 정보 수정
    postUpdateMyInfo: async (userId, user) => {
        return await postJsonReqest(`/mypage/${userId}`, user);
    },
    // 내가 쓴 글 조회
    getMyPost: async () => {
        return await getRequest(`/mypage/post`);
    },
    // 거래 내역 조회
    getTransaction: async (transId) => {
        return await getRequest(`/mypage/trans/${transId}`);
    },

    // RoomBoards--------------------------------------------------------------------------------

    // 방 양도 글 등록
    postRoomBoard: async (board) => {
        return await postJsonReqest('/board/new', board);
    },
    // 방 양도 글 수정
    postUpdateRoomBoard: async (boardId, board) => {
        return await postJsonReqest(`/roomboard/${boardId}`, board);
    },
    // 방 양도 글 상세조회
    getRoomBoard: async (board_id) => {
        return await getRequest(`/board/${board_id}`);
    },
    // 방 양도 글 전체조회 {장단기,날짜선택,가격(시작, 끝, 둘다 null)}
    getAllRoomBoard: async (data) => {
        return await getRequest(`/board/list?`, data);
    },
    // 방 양도 글 삭제
    deleteRoomBoard: async (boardId) => {
        return await deleteJsonReqest(`/roomboard/${boardId}`);
    },

    // likes------------------------------------------------------------------------------------
    // 좋아요 여부 확인
    getBoardIsLike: async (boardId) => {
        return await getRequest('/board/isLike', boardId);
    },
    // 좋아요
    getBoardLike: async (boardId) => {
        return await getRequest('/board/like', boardId);
    },
    // 좋아요 취소
    getBoardUnlike: async (boardId) => {
        return await getRequest('/board/unlike', boardId);
    },
    // 사용자의 좋아요한 양도 글 리스트 조회
    getLikedProject: async (userId, pageNum, pageCount) => {
        return await getRequest(`/user/${userId}/like-boards`, {
            pageNum,
            pageCount
        });
    },

    // Files--------------------------------------------------------------------------------------
    getReadFile: async (fileData) => {
        return await postFormReqest(`/file/upload`, fileData);
    },

    deleteFile: async (pk_id) => {
        return await deleteJsonReqest(`/file/delete/${pk_id}`);
    },

    // Maps--------------------------------------------------------------------------------------
    getLocation: async (data) => {
        console.log(data);
        return await getRequest(`/region/average?`, data);
    },

    // Chatting--------------------------------------------------------------------------------------
    // 채팅을 위한 내 정보 요청(프론트가 알아야 해서)
    getMyInfo: async () => {
        return await getRequest(`/whoami`);
    },

    // 채팅방 생성(게시물 정보)
    postChatRoom: async (board_id) => {
        return await postJsonReqest(`/chat/${board_id}`);
    },

    // 내 정보를 주고 채팅방 목록(매물정보 포함) 요청
    getChatList: async () => {
        return await getRequest(`/chat/rooms`);
    },

    // 내 정보를 주고 채팅방의 History 조회
    getChatContents: async (room_id) => {
        return await getRequest(`/chat/history/${room_id}`);
    },

    // 내가 쓴 채팅 내용 전송
    postChatContent: async () => {
        return await postJsonReqest(`/broadcast`,);
    },

    // 채팅 읽음 
    postChatIsRead: async (msg_id) => {
        return await postJsonReqest(`/chat/read`, msg_id);
    },

};

export default Api;