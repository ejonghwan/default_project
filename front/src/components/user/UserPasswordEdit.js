import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// context & request 
import { passwordEditUser } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'



const UserPasswordEdit = () => {

    const [prevPassword, handlePrevPassword] = useInput('') 
    const [newPassword, handleNewPassword] = useInput('') 
    const [newPasswordCheck, handleNewPasswordCheck] = useInput('') 
    const [passwordIsChecked, setPasswordIsChecked] = useState(false) 

    const [submitActive, setSubmitActive] = useState(false);

    const { state, dispatch } = useContext(UserContext)
    
    useEffect(() => {
        newPassword === newPasswordCheck ? setPasswordIsChecked(true) : setPasswordIsChecked(false);
        if(prevPassword && newPassword && newPasswordCheck && passwordIsChecked) setSubmitActive(true)
    }, [newPasswordCheck, prevPassword, newPassword, newPasswordCheck, passwordIsChecked])


    // 요청
    const handleSubmit = useCallback(async e => {
        try {   
            e.preventDefault();
            if(!prevPassword && !newPassword && !state, !passwordIsChecked) return;

            await dispatch({ type: "LOADING", loadingMessage: "비번 변경중.." })
            const user = await passwordEditUser({
                prevPassword, 
                newPassword, 
                newPasswordCheck,
                _id: state.user._id
            });
            dispatch({ type: "USER_PASSWORD_EDIT_SUCCESS", data: user.message })
            
            // 비밀번호 강화 로직 아직안함

        } catch(err) {
            dispatch({ type: "USER_PASSWORD_EDIT_FAILUE", data: err.err })
            console.error(err)
        }
    }, [prevPassword, newPassword, state, passwordIsChecked])


    return (

        <Fragment>
            <br />
            <br />
            <br />
            password change 
             <form onSubmit={handleSubmit}>

                <div>
                    <Label htmlFor="prevPassword" content="이전 비밀번호" classN="label_t1"/>
                    <Input  
                        id="prevPassword" 
                        type="password" 
                        required={true} 
                        placeholder="prevPassword" 
                        classN="input_text_t1"
                        name="prevPassword" 
                        value={prevPassword} 
                        evt="onChange" 
                        onChange={handlePrevPassword} 
                    />
                    <button>view</button>

                </div>
                <div>
                    <Label htmlFor="newPassword" content="비밀번호" classN="label_t1"/>
                    <Input  
                        id="newPassword" 
                        type="password" 
                        required={true} 
                        placeholder="newPassword" 
                        classN="input_text_t1"
                        name="newPassword" 
                        value={newPassword} 
                        evt="onChange" 
                        onChange={handleNewPassword} 
                    />
                    <button>view</button>
                </div>
              
                <div>
                    <Label htmlFor="newPasswordCheck" content="비밀번호 체크" classN="label_t1"/>
                    <Input 
                        id="newPasswordCheck" 
                        type="password" 
                        required={true} 
                        placeholder="password" 
                        classN="input_text_t1" 
                        name="newPasswordCheck" 
                        value={newPasswordCheck} 
                        evt="onChange" 
                        onChange={handleNewPasswordCheck} 
                    />
                    <button>view</button>
                    { newPasswordCheck && (
                        <div>
                            {passwordIsChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)}
                        </div>
                    ) }
                </div>
             
                <button className={submitActive ? 'checked' : 'none'} disabled={!submitActive ? true: false}>비번변경</button>
            </form>
        </Fragment>
    )
}


export default UserPasswordEdit;