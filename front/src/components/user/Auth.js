import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// context
import { UserContext } from '../../context/UserContext.js'
import { emailAuth } from '../../reducers/UserRequest.js'



const Auth = () => {

    const [email, handleEmail] = useInput('');
    const [authData, setAuthData] = useState(null);
    const {state, dispatch} = useContext(UserContext);
    

    const handleSubmit = useCallback( async e => {
        try {
            e.preventDefault();
            await dispatch({ type: "LOADING", loadingMessage: "인증메일 보내는 중.." })
            const data = await emailAuth({ email: email })
            setAuthData(data)
            console.log('aa', authData)
        } catch(err) {
            console.error(err)
        }
    }, [email])



    return (
        <Fragment>
            {!authData ? (
                <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email" content="email" classN="label_t1"/>
                    <Input  
                        id="email" 
                        type="email" 
                        required={true} 
                        placeholder="email" 
                        classN="input_text_t1" 
                        name="email" 
                        value={email} 
                        evt="onChange" 
                        onChange={handleEmail} 
                    />
                </div>
                
                <button type="submit">인증</button>
            </form>
            ) : (
            <div>
                {`${authData.email}로 ${authData.message} `}
            </div>
        )}
             
        </Fragment>
    )
}


export default Auth;