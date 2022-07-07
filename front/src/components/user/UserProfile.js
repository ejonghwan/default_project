import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// components
// import LoginForm from '../components/user/LoginForm.js'

// context & request 
import { nmaeEditUser, emailEditUser } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'


const UserProfile = () => {

    const [editNameState, setEditNameState] = useState(false)
    const [editEmailState, setEditEmailState] = useState(false)
    
    const [userName, handleUserName] = useInput('') 
    const [userEmail, handleUserEmail] = useInput('')
    const [submitActive, setSubmitActive] = useState(false);
    const {state, dispatch} = useContext(UserContext)



    const handleToggle = useCallback(e => {
        console.log(e.target.name)
        const { name, value } = e.target;
        
        if(name === "name") return setEditNameState(!editNameState)
        if(name === "email") return setEditEmailState(!editEmailState)

        
   
    }, [editNameState, editEmailState, setEditNameState, setEditEmailState])




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
            const res = await emailEditUser({ email: userEmail, _id: state.user._id })

            dispatch({ type: "USER_MAIL_EDIT_SUCCESS", data: res.data })
            setEditEmailState(!editEmailState)
        } catch(err) {
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.err })
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
                <li>
                    { editEmailState ? (
                        <form onSubmit={handleEmailEdit}>
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
                            <button name="email">완료</button>
                            <button type="button" name="email" onClick={handleToggle}>취소</button>
                        </form>
                    ) : (
                        <Fragment>
                            이메일: {state.user.email} 
                            <button type="button" name="email" onClick={handleToggle}>수정</button>
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