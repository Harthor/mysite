import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import axios from 'axios';

const SignUp = () => {
    const [id, setId] = useState('');
    const [idAvailable, setIdAvailable] = useState(0)
    const [idCheckExists, setIdCheckExists] = useState(0)
    const [nickname, setNickname] = useState('')
    const [nicknameAvailable, setNicknameAvailable] = useState(0)
    const [nicknameCheckExists, setNicknameCheckExists] = useState(0)
    const [password, setPassword] = useState('')
    const [emailUsername, setEmailUsername] = useState('')
    const [emailDomain, setEmailDomain] = useState('')
    const backendSite = 'http://localhost:8000/'
    const [verificationCode, setVerificationCode] = useState('')
    const [emailAvailable, setEmailAvailable] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [showVerificationInput, setShowVerificationInput] = useState(false)

    const navigate = useNavigate();

    
    const canSubmit = () => {
        return idAvailable === 2 && idCheckExists === 2 && 
                nicknameAvailable === 2 && nicknameCheckExists === 2 &&
                validatePassword(password) && emailAvailable
    }

    const validateId = (id) => {
        const validId = /[a-z0-9]{6,14}/.test(id)
        return validId
    }

    const validateNickname = (nickname) => {
        const validNickname = /^[\p{L}\p{N}]{2,6}$/u.test(nickname);
        return validNickname
    };

    const validatePassword = (password) => {
        const hasCharCase = /[a-zA-Z]/.test(password);
        const hasNumberCase = /[0-9]/.test(password);
        const isValidLength = password.length >= 8 && password.length <= 16;
        return  hasCharCase && hasNumberCase && isValidLength;
    }

    const validateEmailUsername = (emailUsername) => {
        const validateEmailUsername = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
        return validateEmailUsername.test(emailUsername)
    }

    const validateEmailDomain = (emailDomain) => {
        const validateEmailDomain = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return validateEmailDomain.test(emailDomain)
    }

    const handleValidateEmail = async (event) => {
        event.preventDefault();

        const emailAddress = `${emailUsername}@${emailDomain}`

        try {

            const response = await axios.post(backendSite + 'api/user/check-send-email/', 
                                                {'email' : emailAddress })

            if (response.status === 200) {
                alert('작성한 메일로 인증 코드가 발송되었습니다.')
                setShowVerificationInput(true)
            }

        } catch (e) {
            if (e.response) { // 요청 O 및 서버가 2xx 이외 코드로 응답
                alert('요청 성공 그러나 에러 발생 : ' + JSON.stringify(e.response.data.error))
            } else { // 요청이 제대로 이뤄지지 않음
                alert('요청 실패 에러 발생 :' + e.message)
            }
        }

    }

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const emailAddress = `${emailUsername}@${emailDomain}`

            const response = await axios.post(backendSite + 'api/user/verify-email',
                                            {'email' : emailAddress,
                                            'code' : verificationCode})
            
            if (response.status === 200) {
                alert('이메일 인증이 완료되었습니다.')
                setEmailAvailable(true)
            } else {
                alert("인증 코드가 일치하지 않습니다.")
                setEmailAvailable(true)
            } 
        } catch (e) {
            alert("이메일 인증 중 에러가 발생했습니다 : " + e)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailAddress = `${emailUsername}@${emailDomain}`
        
  

        const userData = {
            username: id,
            nickname: nickname,
            password: password,
            email: emailAddress,
        }

        try {
            const response = await axios.post(backendSite + 'api/user/register',
                                              userData)
            if (response.status === 201) {
                alert('회원 가입이 완료되었습니다.')
                navigate('/signin')
            } else {
                alert(response.data.error);
            }
        } catch (e) {
            alert("Error : " + e)
        }
    }

    const handleIdChange = (e) => {
        const newId = e.target.value;
        setId(newId);
    
        const isValid = validateId(newId);
        setIdAvailable(isValid ? 2 : 1);
        setIdCheckExists(0);  // 닉네임이 변경되었으므로 중복 체크 상태 초기화
    };

    const handleIdExist = async (event) => {

        event.preventDefault(); // 이벤트 핸들러의 페이지 새로고침 방지

        try {
            const response = await axios.post(backendSite + 'api/user/check-userid', 
                                            { 'id': id })
            
            if (response.data.isAvailable) {
                setIdCheckExists(2)
            } else {
                setIdCheckExists(1)
            }

        } catch (e) {
            console.error('중복 확인 에러 발생', e)
        }
    }

    const handleNicknameChange = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
    
        const isValid = validateNickname(newNickname);
        setNicknameAvailable(isValid ? 2 : 1);
        setNicknameCheckExists(0);  // 닉네임이 변경되었으므로 중복 체크 상태 초기화
    };

    const handleNicknameExist = async (event) => {

        event.preventDefault(); // 이벤트 핸들러의 페이지 새로고침 방지

        try {
            const response = await axios.post(backendSite + 'api/user/check-nickname', 
                                            { 'nickname': nickname })
            
            if (response.data.isAvailable) {
                setNicknameCheckExists(2)
            } else {
                setNicknameCheckExists(1)
            }

        } catch (e) {
            console.error('중복 확인 에러 발생' + e)
        }
    }



    useEffect(() => {
        setEmailAvailable(false);
        setShowVerificationInput(false);
    }, [emailUsername, emailDomain])

    return (
        <div className = 'flex flex-col items-center justify-center h-screen bg-gray-50'>
            <form className="p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">회원 가입</h2>
                <div className='mb-10'>
                    <h3 className="text-md text-red-600 font-semibold">주의</h3>
                    <p className="text-sm text-gray-600 mt-1">회원 가입을 하더라도 할 수 있는 기능은 거의 없습니다!</p>
                </div>
                <div className='space-y-12'>
                <div className="mt-4 form-control h-12">
                    <div className='flex flex-row items-center h-full'>
                        <label className="form-label" htmlFor="id">
                            아이디
                        </label>
                        <input
                            className={`form-input flex-grow ${ idAvailable === 2 && idCheckExists === 2 ? 'form-input-valid' :
                                                                idAvailable === 1 || idCheckExists === 1 ? 'form-input-invalid' :
                                                                ''}`}
                            type="text"
                            id="id"
                            placeholder="아이디 (6~14자, 영소문자와 숫자 사용 가능)"
                            maxLength={14}
                            value={id}
                            onChange={handleIdChange}
                        />
                        <button
                        className={`ml-2 text-xs  max-h-12 whitespace-nowrap ${idAvailable === 2 ? 'bg-blue-500' : 'bg-gray-300'} 
                        text-white font-bold p-2 rounded`}
                        disabled={idAvailable === 0}
                        onClick = {handleIdExist}>
                            중복 확인
                        </button>
                    </div>
                    <div>
                        {idAvailable === 2 && idCheckExists === 2 ? <span className='text-xs text-green-400'>사용 가능한 아이디입니다.</span> :
                        idAvailable === 2 && idCheckExists === 1 ? <span className='text-xs text-red-400'>중복된 아이디입니다.</span> :
                        idAvailable === 1 ? <span className='text-xs text-gray-400'>아이디는 6~14자, 소문자와 숫자를 쓸 수 있습니다.</span> : 
                        ''}
                    </div>
                </div>
                <div className="form-control h-12">
                    <div className='flex flex-row items-center h-full'>
                        <label className="form-label" htmlFor="nickname">
                            닉네임
                        </label>
                        <input
                            className={`form-input ${ nicknameAvailable === 2 && nicknameCheckExists === 2 ? 'form-input-valid' :
                                                      nicknameAvailable === 1 || nicknameCheckExists === 1 ? 'form-input-invalid' :
                                                        ''}`}
                            type="text"
                            id="nickname"
                            placeholder="닉네임 (2~6자, 특수문자 제외한 문자와 숫자 사용 가능)"
                            maxLength={6}
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                        <button
                        className={`ml-2 text-xs max-h-12 whitespace-nowrap ${nicknameAvailable === 2 ? 'bg-blue-500' : 'bg-gray-300'} 
                        text-white font-bold p-2 rounded`}
                        disabled={nicknameAvailable === 0}
                        onClick = {handleNicknameExist}>
                            중복 확인
                        </button>
                    </div>
                    <div>
                        {nicknameAvailable === 2 && nicknameCheckExists === 2 ? <span className='text-xs text-green-400'>사용 가능한 닉네임입니다.</span> :
                        nicknameAvailable === 2 && nicknameCheckExists === 1 ? <span className='text-xs text-red-400'>중복된 닉네임입니다.</span> :
                        nicknameAvailable === 1 ? <span className='text-xs text-gray-400'>닉네임은 2~6글자의 한글, 영어, 숫자를 쓸 수 있습니다.</span> : 
                        ''}
                    </div>
                </div>
                <div className="form-control h-12">
                    <div className="relative flex items-center h-full">
                        <label className="form-label" htmlFor="password">
                            비밀번호
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
                        <span onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
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
                <div className="form-control h-12 relative">
                    <label className="form-label" htmlFor="email">
                        이메일
                    </label>
                    <div className="flex flex-row items-center h-full">
                        <input
                        className={`form-input ${!emailUsername ? '' : validateEmailUsername(emailUsername) ? 'form-input-valid' : 'form-input-invalid'}`}
                        type="text"
                        id="emailUsername"
                        value={emailUsername}
                        maxLength={30}
                        placeholder="1q2w3e4r"
                        onChange={(e) => setEmailUsername(e.target.value)}
                        />
                        <span className='flex items-center'>@</span>
                        <input
                        className={`form-input ${!emailDomain ? '' : validateEmailDomain(emailDomain) ? 'form-input-valid' : 'form-input-invalid'}`}
                        type="text"
                        id="emailDomain"
                        maxLength={20}
                        placeholder="example.com"
                        value={emailDomain}
                        onChange={(e) => setEmailDomain(e.target.value)}
                        />
                        <button
                        className={`ml-2 text-xs max-h-12 whitespace-nowrap ${validateEmailDomain(emailDomain) && validateEmailUsername(emailUsername) ? 'bg-blue-500' : 'bg-gray-300'} 
                        text-white font-bold p-2 rounded`}
                        disabled={!validateEmailDomain(emailDomain) && !validateEmailUsername(emailUsername)}
                        onClick = {handleValidateEmail}
                        >
                            인증
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">확인 이메일이 발송됩니다. 이메일을 확인하여 인증을 진행해주세요.</p>
                </div>

                {
                    // 인증 코드 입력란이 표시되는 조건 (예: 이메일 전송 성공 후)
                    showVerificationInput && (
                        <div className="flex">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="6자리 숫자 인증 코드"
                            maxLength={6}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <button
                            type='button'
                            className="ml-2 text-xs whitespace-nowrapbg-blue-500 text-white font-bold p-2 rounded"
                            onClick={handleVerifyCode}>
                            인증 확인
                        </button>
                        </div>
                    )
                }
                </div>
                <button 
                disabled={!canSubmit}
                className={`mt-10 float-right whitespace-nowrap ${!canSubmit() ? "bg-gray-300 hover:appearance-none" :"bg-blue-500 hover:bg-blue-700"} text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline`} 
                onClick={handleSubmit}
                type="submit">
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default SignUp;