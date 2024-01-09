import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/authActions';
import axios from 'axios';


const SignIn = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const backendServer = 'http://localhost:8000/'
    const navigate = useNavigate()
    const dispatch = useDispatch();



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(backendServer + 'api/user/login', {
                'username' : id,
                'password' : password
            })

            if (response.status === 200) {
                alert('로그인에 성공했습니다.')

                dispatch(loginUser(response.data.nickname, response.data.token));
                localStorage.setItem('nickname', response.data.nickname);
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                navigate(-1)
            }
            else { alert('로그인에 실패했습니다.') }
        } catch (e) {
            alert('서버에 오류가 발생했습니다 : ' + e)
        }
    }

    return (
        <div className = "flex flex-col items-center justify-center h-screen bg-gray-50">
            <form className="p-6 w-1/3 bg-white rounded shadow-md" onSubmit = {handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">로그인</h2>
                <div className="form-control">
                    <label className="form-label" htmlFor="id">
                        아이디 
                    </label>
                    <input className="form-input" 
                    type="id"
                    id = "id" 
                    placeholder='아이디'
                    value = {id}
                    maxLength={14}
                    onChange = {(e) => setId(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="form-label" htmlFor="password">
                        비밀번호
                    </label>
                    <input className="form-input" 
                    type="password"
                    id = "password" 
                    placeholder='비밀번호'
                    value = {password}
                    maxLength={16}
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button>
                    <Link to="/signup">회원가입</Link>
                    </button>
                    <button className="submit-button" 
                    type="submit">
                        로그인
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;