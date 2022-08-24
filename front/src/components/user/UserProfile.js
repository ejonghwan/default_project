import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import _debounce from 'lodash.debounce';

// module
import { useInput } from '../common/hooks/index.js';

// components
import Input from '../common/form/Input.js';
import Label from '../common/form/Label.js';


// context & request 
import  { nmaeEditUser, emailEditUser, memberAuthNumberRequest } from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';



const UserProfile = () => {
    const [editNameState, setEditNameState] = useState(false);
    const [editEmailState, setEditEmailState] = useState(false);
    const [editEmailAuthState, setEditEmailAuthState] = useState(false);
    // const [submitActive, setSubmitActive] = useState(false);
    
    const [userName, handleUserName] = useInput('') ;
    const [userEmail, handleUserEmail, setUserEmail] = useInput('');
    const [authNumber, handleAuthNumber] = useInput('');
    
    const {state, dispatch} = useContext(UserContext);
    const [timerNumber, setTimerNumber] = useState(180);


    const handleToggle = useCallback(e => {
        console.log(e.target.name)
        const { name } = e.target;
        if(name === "name") return setEditNameState(!editNameState);
        if(name === "email") {setEditEmailState(!editEmailState);};
        if(name === "emailAuth") {
            setEditEmailAuthState(!editEmailAuthState)
            setEditEmailState(!editEmailState);
            setUserEmail('')
        };
    }, [editNameState, editEmailState, editEmailAuthState]);


    // 이메일 수정 요청  
    const handleEmailEdit = e => {
        e.preventDefault();
        emailEdit();
    }
    const emailEdit = useMemo(() => _debounce(async () => {
        try {
            const res = await emailEditUser({ email: userEmail, _id: state.user._id, authNumber: authNumber })
            // 실패시
            if(res.status === 400) return dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: res.data.message })
        
            dispatch({ type: "USER_MAIL_EDIT_SUCCESS", data: res.data })
            setEditEmailState(!editEmailState)
            setEditEmailAuthState(!editEmailAuthState)
        } catch(err) {
            console.log('catch res', err)
            console.error(err)
        }
    },500), [userEmail, authNumber])
    // 이메일 수정 요청  


    const handleEmailAuth = e => {
        e.preventDefault();
        emailAuth()
    } 

    // 이메일 수정 인증번호 요청 debounce
    const emailAuth = useMemo(() => _debounce(async e => {
        try {
            console.log(e)
            const res = await memberAuthNumberRequest({ email: userEmail, _id: state.user._id })
            setEditEmailAuthState(true)
           
        } catch(err) {
            console.error(err)
        }
    }, 500), [userEmail, timerNumber])

    
    // 이름 수정 요청
    const handleNameEdit = useCallback( async e => {
        try {
            e.preventDefault();
            console.log(e)
            const res = await nmaeEditUser({ name: userName, _id: state.user._id })
            dispatch({ type: "USER_NAME_EDIT_SUCCESS", data: res.data })
            setEditNameState(!editNameState)
        } catch(err) {
            dispatch({ type: "USER_NAME_EDIT_FAILUE", data: err.err })
            console.error(err)
        }
    }, [userName])


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
                                        disabled={timerNumber ? false : true}
                                    />
                                    <button>확인</button>
                                    {state.error && <p>{state.error}</p>}
                                    <br />
                                    {timerNumber && timerNumber ? (<p>{timerNumber}초 남음</p>) : (<p>인증시간이 만료되었습니다.</p>)}
                                </form>
                            )}
                       </Fragment>
                    ) : (
                        <Fragment>
                            이메일: {state.user.email} 
                            <button type="button" name="email" onClick={handleToggle}>수정</button>
                        </Fragment>
                    ) }
                </li>
                <li>
                    아이디: {state.user.id}
                </li>
                <li>
                    { editNameState ? (
                        <form onSubmit={handleNameEdit}>
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
                             <button>완료</button>
                             <button type="button" name="name" onClick={handleToggle}>취소</button>
                        </form>
                    ) : (
                        <Fragment>
                            이름: {state.user.name}
                            <button type="button" name="name" onClick={handleToggle}>수정</button>
                        </Fragment>
                    ) }
                </li>
                
                <li>성별: {state.user.gender}</li>
                <li>생일: {state.user.birthday}</li>
                <li>전화번호: {state.user.phoneNumber}</li>
                <li>가입일: {state.user.createdAt}</li>
                <li>수정일: {state.user.updatedAt}</li>
            </ul>

        </Fragment>
    )
}


export default UserProfile;