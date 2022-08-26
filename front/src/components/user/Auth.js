import React, { useState, useCallback, useEffect, Fragment, useContext, useMemo } from 'react';
import _debounce from 'lodash.debounce'


// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import Timer from '../../components/common/utils/Timer.js'

// context
import { UserContext } from '../../context/UserContext.js'
import { emailAuth } from '../../reducers/UserRequest.js'

// util
import { statusCode } from '../../utils/utils.js'


const Auth = () => {

    const [email, handleEmail] = useInput('');
    const [authData, setAuthData] = useState(null);
    const {state, dispatch} = useContext(UserContext);

    const [authState, setAuthState] = useState(false);
    const [message, setMessage] = useState('');
    

    const handleAuthMailSubmit = e => {
        e.preventDefault();
        authMail();
    }
    const authMail = useMemo(() => _debounce(async e => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "인증메일 보내는 중.." })
            const res = await emailAuth({ email: email })
            setAuthData(res.data)

            console.log('홈어스 resdata:', res)
            setMessage(res.data)

            if(statusCode(res.status, 2)) {
                dispatch({ type: "USER_MAIL_AUTH_SUCCESS", data: '인증메일이 발송되었습니다' })
                setAuthState(true);
            } else {
                dispatch({ type: "USER_MAIL_AUTH_FAILUE", data: res.data.message })
            }

        } catch(err) {
            console.error(err)
        }
    }, 500), [email])




    useEffect(() => {
        
        return () => {
            authMail.cancel();
        }
    }, [authData])


    return (
        <Fragment>
            {!authState ? (
                <form onSubmit={handleAuthMailSubmit}>
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
                <button>인증</button>
                {state.error && (<span>{authData.email}</span>)} <span>{state.error}</span><br />
            </form>
            ) : (
            <div>
                {authData.email && (<span>{authData.email}</span>)} <span>{state.successMessage}</span><br />
                {authState && <Timer  
                    endSecond={180} 
                    startingPoint={180} 
                    countingName={''} 
                    endMessage={'인증시간이 만료되었습니다'}
                    callback={() => console.log('timer end')}
                />}
            </div>
        )}
        </Fragment>
    )
}


export default Auth;