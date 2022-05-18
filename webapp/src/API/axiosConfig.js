import axios from 'axios';

const client = axios.create({
    baseURL: 'http://192.168.227.255:8080/api'
})

client.interceptors.request.use(
    function (config) {
        const user = localStorage.getItem('user'); // 토큰 받아오기
        // 토큰 유무 판단 코드
        if (!user) {
            config.headers["accessToken"] = null;
            config.headers["refreshToken"] = null;
            return config
        }
        const { accessToken, refreshToken } = JSON.parse(user)
        config.headers["accessToken"] = accessToken;
        config.headers["refreshToken"] = refreshToken;


        return config
    }
)

client.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
      if (error.response && error.response.status === 403) {
          try {
              const originalRequest = error.config;
              const data = await client.get('auth/refreshtoken')
              if (data) {
                  const {accessToken, refreshToken} = data.data
                  localStorage.removeItem('user')
                  localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
                  originalRequest.headers['accessToken'] = accessToken;
                  originalRequest.headers['refreshToken'] = refreshToken;
                  return await client.request(originalRequest);
                  }
          } catch (error){
              localStorage.removeItem('user');
              console.log(error);
          }
          return Promise.reject(error)
      }
      return Promise.reject(error)
    }
)

export default client;