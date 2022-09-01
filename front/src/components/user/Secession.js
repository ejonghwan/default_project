import React, { useState, useCallback, useEffect, Fragment, useContext, useMemo } from 'react';
import _debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

// module
import { useInput } from '../common/hooks/index.js'

// util
import { statusCode, useDebounce } from '../../utils/utils.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import LoginUserInfo from './LoginUserInfo.js';

// context
import { UserContext } from '../../context/UserContext.js'
import UserRequest from '../../reducers/UserRequest.js'


const Secession = () => {
    
    const { secession } = UserRequest();
    const {state, dispatch} = useContext(UserContext);
    const navi = useNavigate();

    const [userId, handleUserId, setUserId] = useInput('')
    const [userPassword, handlePassword, setUserPassword] = useInput('')

    const handleSubmit = async e => {
        e.preventDefault();
        return window.confirm('정말 탈퇴할거에요?') ? submit() : null;
    }


    const submit = useMemo(() => _debounce(async () => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "로그인 중.." })
            const user = await secession({ id: state.user.id, password: userPassword })
            if(statusCode(user.status, 2)) {
                setUserId('')
                setUserPassword('')
                alert('탈퇴완료')
                navi('/')
            }
        } catch(err) {
            console.error('catch?', err)
        }
    }, 500), [userId, userPassword])


 
    useEffect(() => {
        return () => {
         submit.cancel();
        }
     }, [userId, userPassword])
//   여기부터해야됨

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>{state.user.id}</div>
                <div>
                    <Label htmlFor="userPassword" content="비밀번호" classN="label_t1" />
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
                    <button>view password</button>
                </div>
                <button type="submit">회원탈퇴</button>
                {state.authNumberErrorMessage && <p style={{color: "red"}}>{state.authNumberErrorMessage}</p>}
            </form>
        </Fragment>
    );
};

export default Secession;