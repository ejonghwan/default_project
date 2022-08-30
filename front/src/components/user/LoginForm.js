import React, { useState, useCallback, useEffect, Fragment, useContext, useMemo } from 'react';
import _debounce from 'lodash.debounce'


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
// import { loginUser, logoutUser } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'


const LoginForm = () => {

    const [userId, handleUserId, setUserId] = useInput('')
    const [userPassword, handlePassword, setUserPassword] = useInput('')

    const { loginUser, logoutUser } = UserRequest();
    const {state, dispatch} = useContext(UserContext)


   
    const handleSubmit = async e => {
        e.preventDefault();
        submit();
    }


    const submit = useMemo(() => _debounce(async () => {
        try {
            await dispatch({ type: "LOADING", loadingMessage: "로그인 중.." })
            const user = await loginUser({ id: userId, password: userPassword })
            console.log('111??', user)
            await dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data })

            if(statusCode(user.status, 2)) {
                setUserId('')
                setUserPassword('')
            }

        } catch(err) {
            console.error('catch?', err)
            dispatch({ type: "USER_LOGIN_FAILUE", data: err.err  })
        }
    }, 500), [userId, userPassword])


 
    useEffect(() => {
        return () => {
         submit.cancel();
        }
     }, [userId, userPassword])
  

    // 이거 꼭 기억하자;;
    // const dd = _debounce(() => {
    //     return console.log(1111)
    // })

    // const fn = (e) => {
    //     e.preventDefault();
    //     console.log(e)
    //     dd();
    // }
 

    return (
        <Fragment>
            {!state.isLogged ? (
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
            ) : (<LoginUserInfo />)}
        </Fragment>
    );
};

export default LoginForm;