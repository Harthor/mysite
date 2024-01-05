import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import axios from 'axios';

const SignUp = () => {
    const [id, setId] = useState('');
    const [idAvailable, setIdAvailable] = useState(false)
    const [idCheckExists, setIdCheckExists] = useState(0)
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [emailUsername, setEmailUsername] = useState('')
    const [emailDomain, setEmailDomain] = useState('')
    
    const canSubmit = () => {
        return idAvailable && idCheckExists === 2 && validatePassword(password) && validateEmailDomain(emailDomain) && validateEmailUsername(emailUsername)
    }

    const validateId = (id) => {
        const isId = /[a-z0-9]/.test(id)
        if (isId && id.length >= 6 && id.length <= 14) {
            setIdAvailable(true)
        } else {
            setIdAvailable(false)
        }
    }

    const validatePassword = (password) => {
        const hasCharCase = /[a-zA-Z]/.test(password);
        const hasNumberCase = /[0-9]/.test(password);
        const isValidLength = password.length >= 8 && password.length <= 16;
        return hasCharCase && hasNumberCase && isValidLength;
    }

    const  validateNickname = (nickname) => {
        const isValidLength = nickname.length >= 2 && nickname.length <= 8;
        const validNickname = /^[A-Za-z0-9가-힣]+$/.test(nickname);

        return validNickname && isValidLength;
    }

    const validateEmailUsername = (emailUsername) => {
        const validateEmailUsername = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
        return validateEmailUsername.test(emailUsername)
    }

    const validateEmailDomain = (emailDomain) => {
        const validateEmailDomain = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return validateEmailDomain.test(emailDomain)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleMouseDown = () => {
        setShowPassword(true)
    }

    const handleMouseUp = () => {
        setShowPassword(false)
    }

    const handleIdExist = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/check-userid/', { 'id': id })
            
            if (response.data.isAvailable) {
                setIdCheckExists(2)
            } else {
                setIdCheckExists(1)
            }
        } catch (e) {
            console.error('중복 확인 에러 발생', e)
        }
    }
    return (
        <div className = 'flex flex-col items-center justify-center h-screen bg-gray-50'>
            <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">회원 가입</h2>
                <h3 className="text-md text-red-600 font-semibold">주의</h3>
                <p className="text-sm text-gray-600 mt-1">회원 가입을 하더라도 할 수 있는 기능은 거의 없습니다!</p>

                <div className="mt-4 form-control">
                    <div className='flex flex-row'>
                        <label className="form-label" htmlFor="id">
                            아이디*
                        </label>
                        <input
                            className={`form-input flex-grow ${ idAvailable && idCheckExists === 2 ? 'form-input-valid' :
                                                                'form-input-invalid'}`}
                            type="text"
                            id="id"
                            placeholder="아이디 (6~14자, 영소문자와 숫자 사용 가능)"
                            maxLength={14}
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value)
                                validateId(e.target.value)
                                setIdCheckExists(0)
                            }}
                        />
                        <button
                        className={`ml-2 text-xs ${idAvailable ? 'bg-blue-500' : 'bg-gray-500'} text-white font-bold py-2 px-4 rounded`}
                        disabled={!idAvailable}
                        onClick = {handleIdExist}>
                            중복 확인
                        </button>
                    </div>
                    <div>
                        {idAvailable && idCheckExists === 2 ? <span className='text-xs text-green-400'>이용 가능한 아이디입니다.</span> :
                        idAvailable && idCheckExists === 1 ? <span className='text-xs text-red-400'>중복된 아이디입니다.</span> :
                        <span className='text-xs text-red-400'>아이디는 6~14자, 소문자와 숫자를 쓸 수 있습니다.</span>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="form-label" htmlFor="nickname">
                        닉네임
                    </label>
                    <input
                        className={`form-input ${!nickname ? '': validateNickname(nickname) ? 'form-input-valid' : 'form-input-invalid'}`}
                        type="text"
                        id="nickname"
                        placeholder="닉네임 (2~8자, 한글과 영어 대소문자 및 숫자 사용 가능)"
                        maxLength={8}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
            
                    <span className={`text-xs text-gray-400`}>입력하지 않을 시 아이디로 설정됩니다.</span>
                    <br />
                    {nickname && (
                        <span 
                        className={`text-xs ${validateNickname(nickname) ? 'text-white' : 'text-red-600' }`}> 
                            {validateNickname(nickname) ? '히히 안보이지' : '닉네임은 2글자 이상, 한글과 영어 대소문자와 숫자만 가능합니다.'}
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <div className="relative flex items-center">
                        <label className="form-label" htmlFor="password">
                            비밀번호*
                        </label>
                        <input
                            className={`form-input ${!password ? '': validatePassword(password) ? 'form-input-valid' : 'form-input-invalid'}`}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="비밀번호 (8~16자, 영문자와 숫자 각각 1글자 이상 포함)"
                            maxLength={16}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {showPassword ? (
                                <IoIosEye size="24"/>
                            ) : (
                                <IoIosEyeOff size="24" />
                            )}
                            </svg>
                        </span>
                    </div>
                    {password && (
                            <span 
                            className={`text-xs ${validatePassword(password) ? '' : 'text-red-600' }`}> 
                                {validatePassword(password) ? '' : '문자와 숫자를 1자씩 포함해 총 8~16글자를 입력하세요'}
                            </span>
                    )}
                </div>
                <div className="form-control relative">
                    <label className="form-label" htmlFor="email">
                        이메일*
                    </label>
                    <div className="flex">
                        <input
                        className={`form-input ${!emailUsername ? '' : validateEmailUsername(emailUsername) ? 'form-input-valid' : 'form-input-invalid'}`}
                        type="text"
                        id="emailUsername"
                        value={emailUsername}
                        placeholder="1q2w3e4r"
                        onChange={(e) => setEmailUsername(e.target.value)}
                        />
                        <span className='flex items-center'>@</span>
                        <input
                        className={`form-input ${!emailDomain ? '' : validateEmailDomain(emailDomain) ? 'form-input-valid' : 'form-input-invalid'}`}
                        type="text"
                        id="emailDomain"
                        placeholder="example.com"
                        value={emailDomain}
                        onChange={(e) => setEmailDomain(e.target.value)}
                        />
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">회원 가입 시, 확인 이메일이 발송됩니다. 이메일을 확인하여 계정을 활성화해 주세요.</p>

                <button 
                disabled={!canSubmit()}
                className={`mt-4 float-right ${!canSubmit() ? "bg-gray-500 hover:appearance-none" :"bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit">
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default SignUp;