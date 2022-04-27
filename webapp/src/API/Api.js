import axios from 'axios';

const api = 'http://ip주소:port번호/api';

const getRequest = async(path, params = {}) => {
    try {
        const token = sessionStorage.getItem('user_token');
        const response = await axios.get(api + path, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: '*/*'
            },
            params
        });
        return response;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormReqest = async(path, body) => {
    try {
        const token = sessionStorage.getItem('user_token');
        const { data } = await axios.post(api + path, body, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

const postJsonReqest = async(path, body) => {
    try {
        const token = sessionStorage.getItem('user_token');
        if (token) {
            const { data } = await axios.post(api + path, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } else {
            const { data } = await axios.post(api + path, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const putJsonReqest = async(path, body) => {
    try {
        const token = sessionStorage.getItem('token');
        if (token) {
            const { data } = await axios.put(api + path, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } else {
            const { data } = await axios.put(api + path, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteJsonReqest = async(path) => {
    try {
        const token = sessionStorage.getItem('user_token');
        if (token) {
            const { data } = await axios.delete(api + path, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } else {
            const { data } = await axios.delete(api + path, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        }
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
        return await getRequest('/auth/email', { email });
    },
    // 이메일 인증 번호 확인
    postEmail: async(emailId, authStr) => {
        return await postJsonReqest('/auth/email', { emailId, authStr });
    },

    // 방 양도 글 등록
    postRoomBoard: async(RoomBoard) => {
        return await postJsonReqest('/roomboard', { RoomBoard });
    }


};

export default Api;