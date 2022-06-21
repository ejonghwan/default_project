import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';
import axios from 'axios'

//module
import { useInput } from '../common/hooks/index.js'
import { axiosModule } from '../../utils/utils.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'


// context
import { UserContext } from '../../context/UserContext.js'


const LoginForm = () => {

    const [userId, handleUserId] = useInput('')
    const [userPassword, handlePassword] = useInput('')
    const {state, dispatch} = useContext(UserContext)


    const handleSubmit = useCallback(async e => {
        e.preventDefault();
        try {
            console.log('1111111111111 ??????????')
            await dispatch({ type: "LOADING", data: `로그인중`  })
            console.log('222222222222 ??????????')
            const user = await axiosModule({
                method: "post",
                URI: "/api/users/login",
                data: { id: userId, password: userPassword },
                config: {
                    headers: {
                        'X-access-token': localStorage.getItem('token'),
                        // 'encryption':
                    },
                },
               
            })
           
            await dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data })
            
            

        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_LOGIN_FAILUE", data: err.err  })
        }

    }, [userId, userPassword])


    useEffect(() => {
        // console.log(state, dispatch)
        // dispatch({ type: "USER_TEST", data: userId  })
        // console.log(userId)
        localStorage.setItem('X-Access-Token', state.user.token)

       

    }, [userId, state])


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