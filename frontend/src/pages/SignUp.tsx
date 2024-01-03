import React, { useState } from "react";

const SignUp = () => {
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const validatePassword = (password) => {
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 12;
        return hasLowerCase && hasUpperCase && hasSpecialChar && isValidLength;
    }

    const validateEmail = (email) => {
        emailRegex = /^[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(Email)
    }

    const  validateNickname = (nickname) => {
        return nickname.length >= 3 && nickname.length <= 15;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <div className = 'flex flex-col items-center justify-center h-screen bg-gray-50'>
            <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">회원 가입</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        이메일:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
                        닉네임:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        비밀번호:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    회원 가입
                </button>
                <p className="text-sm text-gray-600 mt-4">회원 가입 시, 확인 이메일이 발송됩니다. 이메일을 확인하여 계정을 활성화해 주세요.</p>
            </form>
        </div>
    )
}

export default SignUp;