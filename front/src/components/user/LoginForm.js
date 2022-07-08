import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';
import axios from 'axios'

// module
import { useInput } from '../common/hooks/index.js'


// util
import { timer } from '../../utils/utils.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'


// context
import { UserContext } from '../../context/UserContext.js'
import { loginUser, logoutUser } from '../../reducers/UserRequest.js'

const LoginForm = () => {

    const [userId, handleUserId] = useInput('')
    const [userPassword, handlePassword] = useInput('')
    const {state, dispatch} = useContext(UserContext)


    const handleSubmit = useCallback( async e => {
        try {
            e.preventDefault();
            await dispatch({ type: "LOADING", loadingMessage: "로그인 중.." })
            const user = await loginUser({ id: userId, password: userPassword })
            dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data })

            // 로그인 후 2시간 되면 로그아웃
            timer(7200, async () => {
                console.log('로그아웃됨')
                const logout = await logoutUser()
                dispatch({ type: "USER_LOGOUT_SUCCESS" })
            })

        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_LOGIN_FAILUE", data: err.err  })
        }

    }, [userId, userPassword])





    useEffect(() => {
        
    }, [handleSubmit])


    return (
        <Fragment>
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
                    <button>view password</button>
                </div>
                <button type="submit">로그인</button>
            </form>
        </Fragment>
    );
};

export default LoginForm;