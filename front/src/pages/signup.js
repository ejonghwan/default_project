import React, { useState, useEffect, useCallback } from 'react';

// module
import { axiosModule } from '../utils/utils.js'
import { useInput } from '../components/common/hooks/index.js'

// components
import Input from '../components/common/form/Input.js'
import Label from '../components/common/form/Label.js'
import LoginForm from '../components/user/LoginForm.js'
import axios from 'axios';

const Signup = () => {

    const [userId, handleUserId] = useInput('') 
    const [userPassword, handlePassword] = useInput('') 
    const [userPasswordCheck, handlePasswordCheck] = useInput('') 
    const [passwordChecked, setPasswordChecked] = useState(false) 
    const [userEmail, handleUserEmail] = useInput('') 
    const [userName, handleUserName] = useInput('') 
    const [terms, setTerms] = useState(false) ;
    const [submitActive, setSubmitActive] = useState(false);

    
    const handleTerms = useCallback(e => {
        // setTerms({
        //     ...terms,
        //     [e.target.name]: e.target.checked
        // })
        setTerms(e.target.checked)
    }, [setTerms])

  
    const handleSubmit = useCallback(async e => {
        try {   
            e.preventDefault();
            if(!userId && !userPassword && !userEmail && !userName && !passwordChecked && !terms) return;

            // const res = await axiosModule({
            //     method: "post",
            //     URI: "/api/users",
            //     data: { id: userId, password: userPassword, email: userEmail, name: userName},
                
            // })

            // ???????쿠키 안보이는데 브라우저 쿠키에 들어가긴함;;; 뭐지
             const res = await axios.post("http://localhost:5000/api/users", {
                id: userId, password: userPassword, email: userEmail, name: userName
             }, {withCredentials: true,}).then(data => {
                console.log('data', data)
                console.log('ct', data.headers['content-type'])
                console.log('coo', data.headers['set-cookie'])
            })
            const cookie = await res["headers"]["set-cookie"]
          console.log('asdasd', cookie)
            

            // 비밀번호 강화 로직 아직안함

            const user = await res.user;
            console.log(user)




        } catch(err) {
            console.error(err)
        }
    }, [userId, userPassword, userEmail, userName, passwordChecked, terms])


    useEffect(() => {
        userPassword === userPasswordCheck ? setPasswordChecked(true) : setPasswordChecked(false);
        if(userId && userPassword && userEmail && userName && passwordChecked && terms) setSubmitActive(true);
    }, [userId, userEmail, userName, passwordChecked, terms, userPassword, userPasswordCheck])




    return (
        // id, password, email, name
        <div>
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
                <div>
                    <Label htmlFor="userPasswordCheck" content="비밀번호 체크" classN="label_t1"/>
                    <Input 
                        id="userPasswordCheck" 
                        type="password" 
                        required={true} 
                        placeholder="password" 
                        classN="input_text_t1" 
                        name="userPasswordCheck" 
                        value={userPasswordCheck} 
                        evt="onChange" 
                        onChange={handlePasswordCheck} 
                    />
                    <button>view password</button>
                    {passwordChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)}
                </div>
                <div>
                    <Label htmlFor="userEmail" content="이메일" classN="label_t1"/>
                    <Input 
                        id="userEmail" 
                        type="email" 
                        required={true} 
                        placeholder="userEmail" 
                        classN="input_text_t1" 
                        name="userEmail" 
                        value={userEmail} 
                        evt="onChange" 
                        onChange={handleUserEmail} 
                    />
                </div>
                <div>
                    <Label htmlFor="userName" content="이름" classN="label_t1"/>
                    <Input 
                        id="userName" 
                        type="text" 
                        required={true} 
                        placeholder="userName" 
                        classN="input_text_t1" 
                        name="userName" 
                        value={userName} 
                        evt="onChange" 
                        onChange={handleUserName} 
                    />
                </div>
                <div>
                    <Label htmlFor="userTerms" content="가입 동의?" classN="label_t1"/>
                    <Input 
                        id="userTerms" 
                        type="checkbox"  
                        classN="input_check_t1"
                        onChange={handleTerms}
                        name="hoho"
                    />
                    {terms ? (<span>동의허심</span>) : (<span>동의는 필수</span>)}
                </div>
                <button type="submit" className={submitActive ? 'checked' : 'none'} >회원가입</button>
            </form>

            test
            <LoginForm />
        </div>
    );
};

export default Signup;