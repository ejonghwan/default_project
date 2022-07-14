import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// components
// import LoginForm from '../components/user/LoginForm.js'

// context & request 
import { nmaeEditUser, emailEditUser, authNumberRequest } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'


const UserProfile = () => {

    const [editNameState, setEditNameState] = useState(false)
    const [editEmailState, setEditEmailState] = useState(false)
    const [editEmailAuthState, setEditEmailAuthState] = useState(false)
    
    const [userName, handleUserName] = useInput('') 
    const [userEmail, handleUserEmail] = useInput('')
    const [authNumber, handleAuthNumber] = useInput('')
    const [submitActive, setSubmitActive] = useState(false);
    const {state, dispatch} = useContext(UserContext)



    const handleToggle = useCallback(e => {
        console.log(e.target.name)
        const { name } = e.target;
        
        if(name === "name") return setEditNameState(!editNameState)
        if(name === "email") return setEditEmailState(!editEmailState)
        if(name === "emailAuth") return setEditEmailAuthState(!editEmailAuthState)

        
   
    }, [editNameState, editEmailState, editEmailAuthState, setEditNameState, setEditEmailState, setEditEmailAuthState])




    // 요청
    const handleSubmit = useCallback(async e => {
        try {   
            e.preventDefault();

        } catch(err) {
            // dispatch({ type: "USER_SIGNUP_FAILUE", data: err.err })
            // console.error(err)
        }
    }, [])



    const handleEmailEdit = useCallback( async e => {
        try {
            e.preventDefault();
            const res = await emailEditUser({ email: userEmail, _id: state.user._id, authNumber: authNumber })

            dispatch({ type: "USER_MAIL_EDIT_SUCCESS", data: res.data })
            setEditEmailState(!editEmailState)
        } catch(err) {
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.err })
            console.err(err)
        }
    }, [userEmail])


    const handleEmailAuth = useCallback( async e => {
        try {
            e.preventDefault();
            console.log('fff', userEmail, state.user._id)
            const res = await authNumberRequest({ email: userEmail, _id: state.user._id })

            setEditEmailAuthState(true)
            // 여기해야댐
            // dispatch({ type: "USER_MAIL_EDIT_SUCCESS", data: res.data })
            // setEditEmailState(!editEmailState)
        } catch(err) {
            // dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.err })
            console.err(err)
        }
    }, [userEmail])

    
    const handleNameEdit = useCallback( async e => {
        try {
            e.preventDefault();
            const res = await nmaeEditUser({ name: userName, _id: state.user._id })

            // console.log('submit name', res);
            dispatch({ type: "USER_NAME_EDIT_SUCCESS", data: res.data })
            setEditNameState(!editNameState)
        } catch(err) {
            dispatch({ type: "USER_NAME_EDIT_FAILUE", data: err.err })
            console.err(err)
        }
    }, [userName])


    return (
        <Fragment>
            프로필
            <ul>
            <li>
                { editEmailState ? (
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
                        />
                        {/* <button name="email">완료</button> */}
                        <button name="email">인증번호 보내기</button>
                        <button type="button" name="email" onClick={handleToggle}>취소</button>
                        
                        {/* 인증 메일 보냈을 시 */}
                        {editEmailAuthState ? (
                                <form onSubmit={handleEmailEdit}>
                                    <Label htmlFor="userEmail" content="인증번호 입력" classN="label_t1"/>
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
                                    />
                                    <button>확인</button>
                                </form>
                            ) : (
                                <div>asd</div>
                            )
                        }
                    </form>
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