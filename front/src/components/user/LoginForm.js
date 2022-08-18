import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';
import _debounce from 'lodash.debounce'


// module
import { useInput } from '../common/hooks/index.js'

// util
import { timer, delay, initTime } from '../../utils/utils.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import LoginTimer from './LoginTimer.js';

// context
import { UserContext } from '../../context/UserContext.js'
import { loginUser, logoutUser } from '../../reducers/UserRequest.js'


const LoginForm = () => {

    const [userId, handleUserId] = useInput('')
    const [userPassword, handlePassword] = useInput('')
    const {state, dispatch} = useContext(UserContext)

    const [timeRemaining, setTimeRemaining] = useState(null)
    const [totalLoingTime, setTotalLoingTime] = useState(null)


    // const handleSubmit = useCallback( async e => {
    //     try {
    //         e.preventDefault();
    //         await dispatch({ type: "LOADING", loadingMessage: "로그인 중.." })
    //         const user = await loginUser({ id: userId, password: userPassword })
    //         await dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data })

            
    //        setTotalLoingTime(10)
    //        timer(7200, 600, async (count) => {
    //             setTimeRemaining(count)
                
    //             if(count === 0) {
    //                 console.log('로그아웃됨')
    //                 await logoutUser()
    //                 dispatch({ type: "USER_LOGOUT_SUCCESS" })
    //             }
    //             console.log('count', count)
    //         })

    //     } catch(err) {
    //         console.error(err)
    //         dispatch({ type: "USER_LOGIN_FAILUE", data: err.err  })
    //     }

    // }, [userId, userPassword])

    
    const handleSubmit = ((e) => {
        
        console.log(123, e)
        return function(e) {
            console.log(e)
        }
        // e.preventDefault()
        // return _debounce(async (e) => {
        //     e.preventDefault()
        //     console.log(123, e)
        // }, 1000)


    })

    const fn = (e) => {
        e.preventDefault();
        console.log(e)
    }

    const dd = _debounce((e) => {
        e.preventDefault();
        alert(e)
        console.log(111111111111111)
    }, 1000)



    useEffect(() => {
       
    }, [])

    return (
        <Fragment>
            
            <LoginTimer totalLoingTime={totalLoingTime} timeRemaining={timeRemaining} />
            <form onSubmit={dd}>
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