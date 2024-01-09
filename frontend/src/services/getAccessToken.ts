import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface RefreshTokenResponse { 
    access : string;
}

// async 함수의 내용물을 쓰려면, 이 함수를 쓰는 부분에서 await를 쓰면 된다.
export const getAccessToken = async (): Promise<string | null> => {
    let access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const backend = 'http://localhost:8000/'

    if (!access || !refresh) { return null; }
    try {
        const decodedToken = jwtDecode(access); // 토큰의 payload 부분만 보여줌
        

        // 현재 Access Token의 유효 기간 만료
        if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
            const response = await axios.post<RefreshTokenResponse>(backend + 'api/user/token-refresh/', {
                refresh : refresh
            })
            access = response.data.access;
            localStorage.setItem('accessToken', access)
            console.log(access)
            return access
        } else { 
            return access 
        }
    } catch (e) {
        console.error("리프레시 토큰을 불러오는 중 에러 발생 : " + e)
        return null;
    }
}