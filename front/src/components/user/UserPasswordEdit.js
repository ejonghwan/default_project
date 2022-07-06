import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// components
// import LoginForm from '../components/user/LoginForm.js'

// context & request 
// import { signupUser } from '../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'


const UserProfileEdit = () => {

    const [prevPassword, handlePrevPassword] = useInput('') 
    const [newPassword, handleNewPassword] = useInput('') 
    const [newPasswordCheck, handleNewPasswordCheck] = useInput('') 


    const [submitActive, setSubmitActive] = useState(false);

    const { state, dispatch } = useContext(UserContext)
    
    // 요청
    const handleSubmit = useCallback(async e => {
        try {   
            e.preventDefault();
            // if(!userId && !userPassword && !userEmail && !userName && !passwordChecked && !terms) return;

            // await dispatch({ type: "LOADING", loadingMessage: "회원가입 중.." })
            // const user = await signupUser({
            //     id: userId, 
            //     password: userPassword, 
            //     email: userEmail, 
            //     name: userName,
            // });
            // dispatch({ type: "USER_SIGNUP_SUCCESS" })
            
            // 비밀번호 강화 로직 아직안함



        } catch(err) {
            // dispatch({ type: "USER_SIGNUP_FAILUE", data: err.err })
            // console.error(err)
        }
    }, [])


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
                    <button>view password</button>

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
                    <button>view password</button>
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
                    <button>view password</button>
                    {/* {passwordChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)} */}
                </div>
             
                <button type="submit" className={submitActive ? 'checked' : 'none'} >회원가입</button>
            </form>
        </Fragment>
    )
}


export default UserProfileEdit;