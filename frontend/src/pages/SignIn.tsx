import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    return (
        <div className = "flex flex-col items-center justify-center h-screen bg-gray-50">
            <form className="p-6 bg-white rounded shadow-md" onSubmit = {handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">로그인</h2>
                <div className="form-control">
                    <label className="form-label" htmlFor="id">
                        아이디 
                    </label>
                    <input className="form-input" 
                    type="id"
                    id = "id" 
                    value = {id}
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
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Link to="/signup">회원가입</Link>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        로그인
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;