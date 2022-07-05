import React, { useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../components/common/hooks/index.js'

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

// 카카오 네이버 로그인 추가 
// https://lts0606.tistory.com/489

// 2시간 지나면 로그아웃되는 로직 추가

const Signup = () => {

    const [userId, handleUserId] = useInput('') 
    const [userPassword, handlePassword] = useInput('') 
    const [userPasswordCheck, handlePasswordCheck] = useInput('') 
    const [passwordChecked, setPasswordChecked] = useState(false) 
    const [userEmail, handleUserEmail] = useInput('') 
    const [userName, handleUserName] = useInput('') 
    const [qeustionType, setQeustionType] = useState(null)
    const [result, handleResult] = useInput('') 
    const [terms, setTerms] = useState(false) ;
    const [submitActive, setSubmitActive] = useState(false);

    const { state, dispatch } = useContext(UserContext)
    

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
            if(!userId && !userPassword && !userEmail && !userName && !passwordChecked && !terms && !qeustionType && !result) return;

            await dispatch({ type: "LOADING", loadingMessage: "회원가입 중.." })
           
            const user = await signupUser({
                id: userId, 
                password: userPassword, 
                email: userEmail, 
                name: userName,
                qeustion: { qeustionType, result },
       
            });
            dispatch({ type: "USER_SIGNUP_SUCCESS" })
            
            // 비밀번호 강화 로직 아직안함


        } catch(err) {
            dispatch({ type: "USER_SIGNUP_FAILUE", data: err.err })
            console.error(err)
        }
    }, [userId, userPassword, userEmail, userName, passwordChecked, terms, qeustionType, result])



    useEffect(() => {
        userPassword === userPasswordCheck ? setPasswordChecked(true) : setPasswordChecked(false);
        if(userId && userPassword && userEmail && userName && passwordChecked && terms && qeustionType && result) setSubmitActive(true);

    }, [userId, userEmail, userName, passwordChecked, terms, userPassword, userPasswordCheck, qeustionType, result])



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
                    {passwordChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)}
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
                    <Label htmlFor="qeustion" content="질문" classN="label_t1"/>
                    <select name="qeustion" onChange={handleQeustion}>
                        <option value="0">aa1</option>
                        <option value="1">aa2</option>
                        <option value="2">aa3</option>
                        <option value="3">aa4</option>
                        <option value="4">aa5</option>
                        <option value="5">aa6</option>
                        <option value="6">aa7</option>
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