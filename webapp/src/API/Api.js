
import client from 'API/axiosConfig';

const getRequest = async(path, params = {}) => {
    try {
        console.log(client.getUri);
        const data = await client.get(path);
        return
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormReqest = async(path, body) => {
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

const postJsonReqest = async(path, body) => {
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

const putJsonReqest = async(path, body) => {
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

const deleteJsonReqest = async(path) => {
    try {
        const data = await client.delete(path, body, {
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
    postLogin: async(user_login_id, user_password) => {
        return await postJsonReqest('/auth/login', {
            user_login_id,
            user_password
        });
    },
    // 로그아웃
    getLogout: async() => {
        return await getRequest('/auth/logout');
    },
    // 이메일 인증 번호 전송
    getEmail: async(email) => {
        return await getRequest('/auth/email', email);
    },
    // 이메일 인증 번호 확인
    postEmail: async(emailId, authStr) => {
        return await postJsonReqest('/auth/email', { emailId, authStr });
    },

    // Mypage--------------------------------------------------------------------------------
    // 내 정보 조회
    getMyInfo: async(userId) => {
        return await getRequest(`/mypage/${userId}`);
    },
    // 내 정보 수정
    postUpdateMyInfo: async(userId, user) => {
        return await postJsonReqest(`/mypage/${userId}`, user);
    },
    // 내가 쓴 글 조회
     getMyPost: async(boardId) => {
        return await getRequest(`/mypage/post/${boardId}`);
    },
    // 거래 내역 조회
    getTransaction: async(transId) => {
        return await getRequest(`/mypage/trans/${transId}`);
    },

    // RoomBoards--------------------------------------------------------------------------------

    // 방 양도 글 등록
    postRoomBoard: async(board) => {
        return await postJsonReqest('/board/new', board);
    },
    // 방 양도 글 수정
    postUpdateRoomBoard: async(boardId, board) => {
        return await postJsonReqest(`/roomboard/${boardId}`, board);
    },
    // 방 양도 글 상세조회
    getRoomBoard: async(userId) => {
        return await getRequest(`/board/${userId}`);
    },
    // 방 양도 글 전체조회
    getAllRoomBoard: async(x, y, level) => {
        return await getRequest(`/board/list?x=${x}&y=${y}&level=${level}`);
    },
    // 방 양도 글 삭제
    deleteRoomBoard: async(boardId) => {
        return await deleteJsonReqest(`/roomboard/${boardId}`);
    },

    // likes------------------------------------------------------------------------------------
    // 좋아요 여부 확인
    getBoardIsLike: async(boardId) => {
        return await getRequest('/board/isLike', boardId);
    },
    // 좋아요
    getBoardLike: async(boardId) => {
        return await getRequest('/board/like', boardId);
    },
    // 좋아요 취소
    getBoardUnlike: async(boardId) => {
        return await getRequest('/board/unlike', boardId);
    },
    // 사용자의 좋아요한 양도 글 리스트 조회
    getLikedProject: async(userId, pageNum, pageCount) => {
        return await getRequest(`/user/${userId}/like-boards`, {
            pageNum,
            pageCount
        });
    },

    // Files--------------------------------------------------------------------------------------
    getReadFile: async(fileData) => {
        return await postFormReqest(`/file/upload`, fileData);
    },

    deleteFile: async(pk_id) => {
        return await deleteJsonReqest(`/file/${pk_id}`);
    },

    // Maps--------------------------------------------------------------------------------------
    postLocation: async(locationData) => {
        return await postJsonReqest(`/location`, locationData);
    }
};

export default Api;