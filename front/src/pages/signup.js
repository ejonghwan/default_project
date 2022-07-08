import React, { useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput, useInputRadio } from '../components/common/hooks/index.js'

// components
import Input from '../components/common/form/Input.js'
import Label from '../components/common/form/Label.js'
import LoginForm from '../components/user/LoginForm.js'
import axios from 'axios';

// context & request 
import { signupUser } from '../reducers/UserRequest.js'
import { UserContext } from '../context/UserContext.js'


// 회원가입 시 메일인증
// https://lakelouise.tistory.com/240
// (https://nodemailer.com/about/)
// https://velog.io/@neity16/NodeJs-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84nodemailer
// 메일 구독 등 도메인으로 메일보내고 싶을떄.. https://www.peterkimzz.com/custom-email-service-for-free-forever/

// https://charming-kyu.tistory.com/6


// https://velog.io/@tkdfo93/Email-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84-Final-Project-Skill <- 이거로 하자
// 구글 OAuth https://velog.io/@tkdfo93/%EA%B5%AC%EA%B8%80-OAuth2.0-Final-Project
// 카카오 네이버 Oauth https://tyrannocoding.tistory.com/49



// 카카오 네이버 로그인 추가 
// https://lts0606.tistory.com/489

// 로봇인증 추가

// 2시간 지나면 로그아웃되는 로직 추가


// phoneNumber gender birthday 추가
const Signup = () => {

    const [userId, handleUserId] = useInput('') 
    const [userPassword, handlePassword] = useInput('') 
    const [userPasswordCheck, handlePasswordCheck] = useInput('') 
    const [passwordIsChecked, setPasswordIsChecked] = useState(false) 
    const [userEmail, handleUserEmail] = useInput('') 
    const [userName, handleUserName] = useInput('') 
    const [qeustionType, setQeustionType] = useState(null)
    const [result, handleResult] = useInput('') 
    const [terms, setTerms] = useState(false) ;
    const [submitActive, setSubmitActive] = useState(false);
    const [phoneNumber, handlePhoneNumber] = useInput('') 
    const [gender, handleGender] = useInput('') 
    const [birthday, handleBirthday] = useInput('')
  
    const { state, dispatch } = useContext(UserContext)
    
    const questionData = [
        { questionType: 0, question: '질문1' },
        { questionType: 1, question: '질문2' },
        { questionType: 2, question: '질문3' },
        { questionType: 3, question: '질문4' },
        { questionType: 4, question: '질문5' },
        { questionType: 5, question: '질문6' },
        { questionType: 6, question: '질문7' },
        { questionType: 7, question: '질문8' },
        { questionType: 8, question: '질문9' },
    ]

    const handleTerms = useCallback(e => {
        // setTerms({
        //     ...terms,
        //     [e.target.name]: e.target.checked
        // })
        setTerms(e.target.checked)
    }, [setTerms])


    const handleQeustion = useCallback(e => {
        setQeustionType(e.target.value)
    }, [qeustionType, setQeustionType])

    
  
    // 요청
    const handleSubmit = useCallback(async e => {
        try {   
            e.preventDefault();
            if(!userId && !userPassword && !userEmail && !userName && !passwordIsChecked && !terms && !qeustionType && !result && !phoneNumber && !gender && !birthday) return;

            await dispatch({ type: "LOADING", loadingMessage: "회원가입 중.." })
            const user = await signupUser({
                id: userId, 
                password: userPassword, 
                email: userEmail, 
                name: userName,
                qeustion: { qeustionType, result },
                phoneNumber, 
                gender, 
                birthday,
       
            });
            dispatch({ type: "USER_SIGNUP_SUCCESS" })
            
            // 비밀번호 강화 로직 아직안함


        } catch(err) {
            dispatch({ type: "USER_SIGNUP_FAILUE", data: err.err })
            console.error(err)
        }
    }, [userId, userPassword, userEmail, userName, passwordIsChecked, terms, qeustionType, result, phoneNumber, gender, birthday])


    useEffect(() => {
        userPassword === userPasswordCheck ? setPasswordIsChecked(true) : setPasswordIsChecked(false);
    }, [userPasswordCheck])


    useEffect(() => {
        if(userId && userPassword && userEmail && userName && passwordIsChecked && terms && qeustionType && result &&phoneNumber && gender && birthday) setSubmitActive(true);
    }, [userId, userEmail, userName, passwordIsChecked, terms, userPassword, userPasswordCheck, qeustionType, result, phoneNumber, gender, birthday])




    return (
        // id, password, email, name
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="userId" content="아이디" classN="label_t1"/>
                    <Input  
                        id="userId" 
                        type="text" 
                        required={true} 
                        placeholder="id" 
                        classN="input_text_t1" 
                        name="userId" 
                        value={userId} 
                        evt="onChange" 
                        onChange={handleUserId} 
                    />
                </div>
                <div>
                    <Label htmlFor="userPassword" content="비밀번호" classN="label_t1"/>
                    <Input  
                        id="userPassword" 
                        type="password" 
                        required={true} 
                        placeholder="password" 
                        classN="input_text_t1"
                        name="userPassword" 
                        value={userPassword} 
                        evt="onChange" 
                        onChange={handlePassword} 
                    />
                    <button type="button">view password</button>
                </div>
                <div>
                    <Label htmlFor="userPasswordCheck" content="비밀번호 체크" classN="label_t1"/>
                    <Input 
                        id="userPasswordCheck" 
                        type="password" 
                        required={true} 
                        placeholder="password" 
                        classN="input_text_t1" 
                        name="userPasswordCheck" 
                        value={userPasswordCheck} 
                        evt="onChange" 
                        onChange={handlePasswordCheck} 
                    />
                    <button type="button">view password</button>
                    { userPasswordCheck && (
                        <div>
                            {passwordIsChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)}
                        </div>
                    ) }
                </div>
                <div>
                    <Label htmlFor="userEmail" content="이메일" classN="label_t1"/>
                    <Input 
                        id="userEmail" 
                        type="email" 
                        required={true} 
                        placeholder="userEmail" 
                        classN="input_text_t1" 
                        name="userEmail" 
                        value={userEmail} 
                        evt="onChange" 
                        onChange={handleUserEmail} 
                    />
                </div>
                <div>
                    <Label htmlFor="userName" content="이름" classN="label_t1"/>
                    <Input 
                        id="userName" 
                        type="text" 
                        required={true} 
                        placeholder="userName" 
                        classN="input_text_t1" 
                        name="userName" 
                        value={userName} 
                        evt="onChange" 
                        onChange={handleUserName} 
                    />
                </div>
                <div>
                    <Label htmlFor="phoneNumber" content="전화번호" classN="label_t1"/>
                    <Input 
                        id="phoneNumber" 
                        type="text" 
                        required={true} 
                        placeholder="phoneNumber" 
                        classN="input_text_t1" 
                        name="phoneNumber" 
                        value={phoneNumber} 
                        evt="onChange" 
                        onChange={handlePhoneNumber} 
                    />
                </div>
                <div>
                    성별:
                    <span>
                        <Label htmlFor="man" content="남자" classN="label_t1"/>
                        <Input 
                            id="man" 
                            type="radio" 
                            required={true} 
                            classN="" 
                            name="gender" 
                            value="남" 
                            evt="onChange" 
                            onChange={handleGender} 
                        />
                    </span>
                    <span>
                        <Label htmlFor="woman" content="여자" classN="label_t1"/>
                         <Input 
                            id="woman" 
                            type="radio" 
                            required={true} 
                            classN="" 
                            name="gender" 
                            value="여" 
                            evt="onChange" 
                            onChange={handleGender} 
                        />
                    </span>
                </div>
                <div>
                    <Label htmlFor="birthday" content="생년월일" classN="label_t1"/>
                    <Input 
                        id="birthday" 
                        type="text" 
                        required={true} 
                        placeholder="19870907 8자리" 
                        classN="input_text_t1" 
                        name="birthday" 
                        value={birthday} 
                        evt="onChange" 
                        onChange={handleBirthday} 
                    />
                </div>
                <div>
                    <Label htmlFor="qeustion" content="질문" classN="label_t1"/>
                    <select name="qeustion" onChange={handleQeustion}>
                        {   
                            questionData && questionData.map((data, idx) => {
                                return <option key={idx} value={data.questionType}>{data.question}</option>
                            })
                        }
                    </select>
               
                     <Label htmlFor="result" content="답" classN="label_t1"/>
                    <Input 
                        id="result" 
                        type="text" 
                        required={true} 
                        placeholder="result" 
                        classN="input_text_t1" 
                        name="result" 
                        value={result} 
                        evt="onChange" 
                        onChange={handleResult} 
                    />
                </div>
                <div>
                    <Label htmlFor="userTerms" content="가입 동의?" classN="label_t1"/>
                    <Input 
                        id="userTerms" 
                        type="checkbox"  
                        classN="input_check_t1"
                        onChange={handleTerms}
                        name="hoho"
                    />
                    {terms ? (<span>동의허심</span>) : (<span>동의는 필수</span>)}
                </div>
                <button type="submit" className={submitActive ? 'checked' : 'none'} disabled={submitActive ? false : true}>회원가입</button>
            </form>
            <br />
            <br />
            <br />
            test
            <LoginForm />
        </div>
    );
};

export default Signup;