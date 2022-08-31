import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo, useRef } from 'react';
import _debounce from 'lodash.debounce';

// module
import { useInput } from '../common/hooks/index.js';

// components
import Input from '../common/form/Input.js';
import Label from '../common/form/Label.js';
import Timer from '../common/utils/Timer.js';

// context & request 
// import  { userInfoEditUser, emailEditUser, memberAuthNumberRequest } from '../../reducers/UserRequest.js';
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';

// util
import { stringLengthChecked, statusCode  } from '../../utils/utils.js';



const UserProfile = () => {
    const [editUserInfoState, setEditUserInfoState] = useState(false);
    const [editEmailState, setEditEmailState] = useState(false);
    const [editEmailAuthState, setEditEmailAuthState] = useState(false);
    
    const [userName, handleUserName, setUserName] = useInput('') ;
    const [userGender, handleUserGender, setUserGender] = useInput('') ;
    const [userBirthday, handleUserBirthday, setUserBirthday] = useInput('');
    const [birthdayLengthChecked, setBirthdayLengthChecked] = useState(false)
    const [userPhoneNumber, handleUserPhoneNumber] = useInput('') ;
    const [phoneNumberLengthChecked, setPhoneNumberLengthChecked] = useState(false)
    const [userEmail, handleUserEmail, setUserEmail] = useInput('');
    const [authNumber, handleAuthNumber, setAuthNumber] = useInput('');
    
    const { userInfoEditUser, emailEditUser, memberAuthNumberRequest } = UserRequest();
    const {state, dispatch} = useContext(UserContext);

    const [timerNumber, setTimerNumber] = useState(false);

    const womanRef = useRef(null) 
    const manRef = useRef(null) 

    const handleToggle = useCallback(e => {
        const { name } = e.target;
        if(name === "userInfo") return setEditUserInfoState(!editUserInfoState);
        if(name === "email") return setEditEmailState(!editEmailState);
        if(name === "emailAuth") { //인증 수정 취소
            setEditEmailAuthState(!editEmailAuthState);
            setEditEmailState(!editEmailState);
            setUserEmail('');
            setTimerNumber(false);
        };
    }, [editUserInfoState, editEmailState, editEmailAuthState]);



    // 이메일 수정 인증번호 요청 
    const handleEmailAuth = e => {
        e.preventDefault();
        emailAuth();
    };
    const emailAuth = useMemo(() => _debounce(async e => {
        try {
            const res = await memberAuthNumberRequest({ email: userEmail, _id: state.user._id });
            if(statusCode(res.status, 2)) { setEditEmailAuthState(true); }
        } catch(err) {
            console.error(err);
        };
    }, 500), [userEmail, timerNumber]);
    // 이메일 수정 인증번호 요청 


    // 이메일 수정 요청  
    const handleEmailEdit = e => {
        e.preventDefault();
        emailEdit();
    }
    const emailEdit = useMemo(() => _debounce(async () => {
        try {
            const res = await emailEditUser({ email: userEmail, _id: state.user._id, authNumber: authNumber })
            if(statusCode(res.status, 2)) {
                setEditEmailState(!editEmailState);
                setEditEmailAuthState(!editEmailAuthState);
            }
        } catch(err) {
            console.error(err);
        }
    },500), [userEmail, authNumber]);
    // 이메일 수정 요청  

    
    // 회원정보 수정 요청
    const handleUserInfoEdit = e => {
        e.preventDefault();
        userInfo();
    };
    const userInfo = useMemo(() => _debounce(async() => {
        try {
            const userInfo = {
                name: userName, 
                gender: userGender,
                birthday: userBirthday,
                phoneNumber: userPhoneNumber,
                _id: state.user._id
            }
            const res = await userInfoEditUser(userInfo);
            setEditUserInfoState(!editUserInfoState);
        } catch(err) {
            console.error(err);
        };
    }), [userName, userGender, userBirthday, userPhoneNumber]);
    // 회원정보 수정 요청


    useEffect(() => {
        userPhoneNumber && stringLengthChecked(userPhoneNumber, 11) ? setPhoneNumberLengthChecked(false) : setPhoneNumberLengthChecked(true)
    }, [userPhoneNumber]);

    useEffect(() => {
        userBirthday && stringLengthChecked(userBirthday, 8) ? setBirthdayLengthChecked(false) : setBirthdayLengthChecked(true)
    }, [userBirthday]);

    useEffect(() => {
        if(state.user.gender === '남') {
            setUserGender(manRef.current && manRef.current.defaultValue); //radio value
            manRef.current && manRef.current.setAttribute('checked', true);
        } else {
            setUserGender(womanRef.current && womanRef.current.defaultValue); //radio value
            womanRef.current && womanRef.current.setAttribute('checked', true)
        }
    }, [editUserInfoState]);


    

    return (
        <Fragment>
            <div>프로필</div>
            <ul>
            <li>
                {editEmailState ? (
                    <Fragment>
                        <form onSubmit={handleEmailAuth}>
                            <Label htmlFor="userEmail" content="이메일 수정중" classN="label_t1"/>
                            <Input 
                                id="userEmail" 
                                type="email" 
                                required={true} 
                                placeholder={state.user.email}
                                classN="input_text_t1" 
                                name="userEmail" 
                                value={userEmail} 
                                evt="onChange" 
                                onChange={handleUserEmail} 
                                disabled={editEmailAuthState && true}
                            />
                            {!editEmailAuthState ? (
                                <Fragment>
                                   <button name="email">이메일 인증하기</button>
                                   <button type="button" name="email" onClick={handleToggle}>취소</button>
                                 </Fragment>
                            ) : (
                                <Fragment>
                                  <div>메일로 인증번호가 발송되었습니다</div>
                                    <button type="button" name="emailAuth" onClick={handleToggle}>취소</button>
                                </Fragment>
                            )}
                        </form>

                        {/* 인증 메일 보냈을 시 */}
                        {editEmailAuthState && (
                            <form onSubmit={handleEmailEdit}>
                                <Label htmlFor="authNumber" content="인증번호 입력" classN="label_t1"/>
                                <Input 
                                    id="authNumber" 
                                    type="text" 
                                    required={true} 
                                    placeholder="인증번호 입력"
                                    classN="input_text_t1" 
                                    name="authNumber" 
                                    value={authNumber} 
                                    evt="onChange" 
                                    onChange={handleAuthNumber} 
                                    disabled={!timerNumber ? false : true}
                                />
                                <button disabled={!timerNumber ? false : true}>이메일 변경하기</button>
                               
                                <br />
                                <Timer  
                                    endSecond={180} 
                                    startingPoint={180} 
                                    countingName={''} 
                                    endMessage={'인증시간이 만료되었습니다'}
                                    callback={() => setTimerNumber(true)}
                                />
                            </form>
                            )}
                       </Fragment>
                    ) : (
                        <Fragment>
                            이메일: {state.user.email} 
                            <button type="button" name="email" onClick={handleToggle}>이메일 수정</button>
                        </Fragment>
                    ) }
                     {state.mailEditErrorMessage && <p style={{color: 'red'}}>{state.mailEditErrorMessage}</p>}
                </li>
                <li>아이디: {state.user.id}</li>
                {editUserInfoState ? (
                    <Fragment>
                        <form onSubmit={handleUserInfoEdit}>
                            <li>
                                <Label htmlFor="userName" content="이름 수정중" classN="label_t1"/>
                                <Input 
                                    id="userName" 
                                    type="text" 
                                    required={true} 
                                    placeholder={state.user.name}
                                    classN="input_text_t1" 
                                    name="userName" 
                                    value={userName} 
                                    evt="onChange" 
                                    onChange={handleUserName} 
                                />
                            </li>
                            <li>
                                <span>성별 수정중</span>
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
                                        onChange={handleUserGender} 
                                        ref={manRef}
                                        // checked={state.user.gender === '남' ? true : false}
                                        // 이거 수정할떄 체크안됨 
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
                                        onChange={handleUserGender}
                                        ref={womanRef} 
                                        // checked={state.user.gender === '여' ? true : false}
                                    />
                                </span>
                            </li>
                            <li>
                                <Label htmlFor="userBirthday" content="생일 수정중" classN="label_t1"/>
                                <Input 
                                    id="userBirthday" 
                                    type="text" 
                                    required={true} 
                                    placeholder={state.user.birthday}
                                    classN="input_text_t1" 
                                    name="userBirthday" 
                                    value={userBirthday} 
                                    evt="onChange" 
                                    onChange={handleUserBirthday} 
                                />
                                {birthdayLengthChecked && (
                                    <p style={{color: "red"}}>생일 8자리로 입력해주세요 [x]</p>
                                )}
                            </li>
                            <li>
                                <Label htmlFor="phoneNumber" content="휴대폰번호 수정중" classN="label_t1"/>
                                <Input 
                                    id="phoneNumber" 
                                    type="text" 
                                    required={true} 
                                    placeholder={state.user.phoneNumber}
                                    classN="input_text_t1" 
                                    name="phoneNumber" 
                                    value={userPhoneNumber} 
                                    evt="onChange" 
                                    onChange={handleUserPhoneNumber} 
                                />
                                {phoneNumberLengthChecked && (
                                    <p style={{color: "red"}}>휴대폰 번호 11자리로 입력해주세요 [x]</p>
                                )}
                            </li>
                            <button>개인정보 변경하기</button>
                            {state.infoEditErrorMessage && <p style={{color: 'red'}}>{state.infoEditErrorMessage}</p>}
                            <button type="button" name="userInfo" onClick={handleToggle}>취소</button>
                        </form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li> 이름: {state.user.name}</li>
                        <li>성별: {state.user.gender}</li>
                        <li>생일: {state.user.birthday}</li>
                        <li>전화번호: {state.user.phoneNumber}</li>
                        <button type="button" name="userInfo" onClick={handleToggle}>개인정보 수정</button>
                    </Fragment>
                )}
                <li>가입일: {state.user.createdAt}</li>
                <li>수정일: {state.user.updatedAt}</li>
            </ul>
        </Fragment>
    )
}


export default UserProfile;