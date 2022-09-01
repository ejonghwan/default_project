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
// import { emailAuth } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'

// util
import { statusCode } from '../../utils/utils.js'


const Auth = () => {

    const { emailAuth } = UserRequest();
    const {state, dispatch} = useContext(UserContext);

    const [email, handleEmail] = useInput('');
    const [authState, setAuthState] = useState(false);

    const handleAuthMailSubmit = e => {
        e.preventDefault();
        authMail();
    }
    const authMail = useMemo(() => _debounce(async e => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "인증메일 보내는 중.." })
            const res = await emailAuth({ email: email })
            if(statusCode(res.status, 2)) return setAuthState(true);
        } catch(err) {
            console.error(err)
        }
    }, 500), [email])




    useEffect(() => {
        return () => {
            authMail.cancel();
        }
    }, [])


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
            </form>
            ) : (
            <div>
                메일이 발송되었습니다<br />
                {authState && <Timer  
                    endSecond={180} 
                    startingPoint={180} 
                    countingName={''} 
                    endMessage={'인증시간이 만료되었습니다'}
                    callback={() => console.log('timer end')}
                />}
            </div>
        )}
         {state.authNumberErrorMessage && <span>{state.authNumberErrorMessage}</span>}<br />
        </Fragment>
    )
}


export default Auth;