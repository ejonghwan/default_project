import React, { useState, useCallback, useEffect, Fragment } from 'react';

//module
import { useInput } from '../common/hooks/index.js'
import { axiosModule } from '../../utils/utils.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'



const LoginForm = () => {

    const [userId, handleUserId] = useInput('')
    const [userPassword, handlePassword] = useInput('')


    const handleSubmit = useCallback(async e => {
        try {
            axiosModule({
                method: "get",
                URI: "/api/users/login",
                data: { _id, id: userId, password: userPassword },
                config: {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    },
                    accept: {
                        
                    }
                }
            })
        } catch(err) {
            console.err(err)
        }
    }, [])


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
            </form>
        </Fragment>
    );
};

export default LoginForm;