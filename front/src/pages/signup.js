import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useSearchParams, useNavigate, useLocation, createBrowserHistory } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import Cookies from 'universal-cookie';
 


// module
import { useInput, useInputRadio } from '../components/common/hooks/index.js'

// components
import Input from '../components/common/form/Input.js'
import Label from '../components/common/form/Label.js'

// context & request 
// import { signupUser } from '../reducers/UserRequest.js'
import UserRequest from '../reducers/UserRequest.js'
import { UserContext } from '../context/UserContext.js'

// util
import { questionData, statusCode, passwordChecked, englishChecked, stringLengthChecked } from '../utils/utils.js'


// 회원가입 시 메일인증
// https://lakelouise.tistory.com/240
// (https://nodemailer.com/about/)
// https://velog.io/@neity16/NodeJs-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84nodemailer
// 메일 구독 등 도메인으로 메일보내고 싶을떄.. https://www.peterkimzz.com/custom-email-service-for-free-forever/

// https://charming-kyu.tistory.com/6
// https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=sejun3278&logNo=221856823435&redirect=Dlog&widgetTypeCall=true&directAccess=false  <


// https://velog.io/@tkdfo93/Email-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84-Final-Project-Skill <- 이거로 하자
// 구글 OAuth https://velog.io/@tkdfo93/%EA%B5%AC%EA%B8%80-OAuth2.0-Final-Project
// 카카오 네이버 Oauth https://tyrannocoding.tistory.com/49





// 카카오 네이버 로그인 추가 
// https://lts0606.tistory.com/489

// 로봇인증 추가

// 2시간 지나면 로그아웃되는 로직 추가


const Signup = () => {
    
    const { signupUser } = UserRequest();
    const { state, dispatch } = useContext(UserContext)
    const cookies = new Cookies();
    const successRoot = cookies.get('signup')
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const email = decodeURIComponent(searchParams.get('email'));


    const [userId, handleUserId] = useInput('') 
    const [userPassword, handlePassword] = useInput('') 
    const [userPasswordCheck, handlePasswordCheck] = useInput('') 
    const [passwordIsChecked, setPasswordIsChecked] = useState(false);
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [englishCheckedState, setEnglishCheckedState] = useState(false);
    // const [userEmail, handleUserEmail] = useInput('') 
    const [userName, handleUserName] = useInput('') 
    const [qeustionType, setQeustionType] = useState(null)
    const [result, handleResult] = useInput('') 
    const [terms, setTerms] = useState(false) ;
    const [submitActive, setSubmitActive] = useState(false);
    const [phoneNumber, handlePhoneNumber] = useInput('') 
    const [phoneNumberLengthChecked, setPhoneNumberLengthChecked] = useState(false)
    const [gender, handleGender] = useInput('남') 
    const [birthday, handleBirthday] = useInput('')
    const [birthdayLengthChecked, setBirthdayLengthChecked] = useState(false)
  
   
 

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
    const handleSubmit = e => {
        e.preventDefault();
        signup();
    }
    const signup = useMemo(() => _debounce(async() => {
        try {   
            if(!userId && !userPassword && !userName && !passwordIsChecked && !terms && !qeustionType && !result && !phoneNumber && !gender && !birthday) return;

            dispatch({ type: "LOADING", loadingMessage: "회원가입 중.." })
            const user = await signupUser({
                id: userId, 
                password: userPassword, 
                email: email, 
                name: userName,
                qeustion: { qeustionType, result },
                phoneNumber, 
                gender, 
                birthday,
       
            });

            if(statusCode(user.status, 2)) {
                alert('회원가입이 완료되었습니다')
                // 로그인 페이지 만들면 로그인으로 
                navigate('/')
            }
            // try 에러나면 catch로 가긴함
        } catch(err) {
            console.error('view ', err)
        }
    }, 500), [userId, userPassword, userName, passwordIsChecked, terms, qeustionType, result, phoneNumber, gender, birthday])


    useEffect(() => {
        if(!successRoot) {
            alert('잘못된 접근입니다. 다시 인증해주세요')
            navigate(-1)
        }
        cookies.remove('signup')
    }, [])

    useEffect(() => { //비번 강화 체크 
        userPassword && passwordChecked(userPassword) ? setPasswordProtected(true) : setPasswordProtected(false)
    }, [userPassword])

    useEffect(() => { //de 
        userId && englishChecked(userId) ? setEnglishCheckedState(false) : setEnglishCheckedState(true)
    }, [userId])

    useEffect(() => {
        phoneNumber && stringLengthChecked(phoneNumber, 11) ? setPhoneNumberLengthChecked(false) : setPhoneNumberLengthChecked(true)
    }, [phoneNumber]) 

    useEffect(() => {
        birthday && stringLengthChecked(birthday, 8) ? setBirthdayLengthChecked(false) : setBirthdayLengthChecked(true)
    }, [birthday]) 

    useEffect(() => {
        userPassword && userPassword === userPasswordCheck ? setPasswordIsChecked(true) : setPasswordIsChecked(false);
    }, [userPasswordCheck])


    useEffect(() => {
        if(userId && userPassword && userName && passwordIsChecked && terms && qeustionType && result && phoneNumber && gender && birthday && passwordProtected && !phoneNumberLengthChecked && !birthdayLengthChecked) {
            setSubmitActive(true)
        } else {
            setSubmitActive(false)
        };
    }, [userId, userName, passwordIsChecked, terms, userPassword, userPasswordCheck, qeustionType, result, phoneNumber, gender, birthday, passwordProtected, phoneNumberLengthChecked, birthdayLengthChecked])




    return (
        // id, password, email, name
        // 이메일은 먼저 인증하고 시작함(임시로 홈에있음)

        /*
            비번 조건 
            1. 8자 이상 14자 이하 
            2. 1개 이상의 숫자 + 1개 이상의 특수문자 
            3. 아뒤랑 같게 안됨 
            4. 이메일이랑 같게 안됨 
            5. 이름이랑 같게 안됨 

            비번 수정 조건 
            위에 + 
            6. 이전비번이랑 동일한지 
            
        */
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="userEmail" content="이메일" classN="label_t1"/>
                    <span>{email} / 인증완료</span>
                </div>
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
                    {englishCheckedState && (<span style={{color: "red"}}>영문, 숫자 조합으로만 작성해주세요</span>)}
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
                    {passwordProtected ? (
                        <p style={{color: "blue"}}>8~ 16글자 + 1개 이상의 숫자 + 1개 이상의 특수문자 + 온니 영문[o]</p>
                    ) : (
                        <p style={{color: "red"}}>8~ 16글자 + 1개 이상의 숫자 + 1개 이상의 특수문자 + 온니 영문 [x]</p>
                    )}
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
                        type="number" 
                        required={true} 
                        placeholder="phoneNumber" 
                        classN="input_text_t1" 
                        name="phoneNumber" 
                        value={phoneNumber} 
                        evt="onChange" 
                        onChange={handlePhoneNumber} 
                    />
                    {phoneNumberLengthChecked && (
                        <p style={{color: "red"}}>휴대폰 번호 11자리로 입력해주세요 [x]</p>
                    )}
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
                            checked={true}
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
                        type="number" 
                        required={true} 
                        placeholder="19870907 8자리" 
                        classN="input_text_t1" 
                        name="birthday" 
                        value={birthday} 
                        evt="onChange" 
                        onChange={handleBirthday} 
                    />
                    {birthdayLengthChecked && (
                        <p style={{color: "red"}}>생일 8자리로 입력해주세요 [x]</p>
                    )}
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
            {state.signupErrorMessage && <p style={{color: "red"}}>{state.signupErrorMessage}</p>}
        </div>
    );
};

export default Signup;