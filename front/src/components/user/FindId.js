import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'
import { findUserId, nonMemberAuthNumberRequest } from '../../reducers/UserRequest.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// components
// import LoginForm from '../components/user/LoginForm.js'

// context & request 
import { nmaeEditUser, emailEditUser } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'


const FindId = () => {

    /*
        1. 아이디찾기 클릭
        1-1. 이름, 이메일 입력,
        2. 등록된 메일 / 이름 / 인증번호 입력받는 폼 노출 
     
        4. 인증번호 입력받으면 백엔드에서 인증번호 매치 후 
        5. 참이면 아이디 알려주는 페이지로 리디렉션
    */

    /*
        이름 생년월일 성별 메일주소로 찾기
    */

    /*
        이름, 전화번호로 찾기
    */

    const {authNumber, handleAuthNumber} = useInput('');
    const {authToggle, setAuthToggle} = useState(false);
    const [name, handleName] = useInput('');
    const [email, handleEmail] = useInput(''); 
    
    
    const handleAuthNumberSubmit = async e => {
        try {
            e.preventDefault();
            const findId = await nonMemberAuthNumberRequest({ name, email }); 

            
            setAuthToggle(!authToggle)
            console.log('view =>', findId)

        } catch(err) {
            console.error(err)
        }
    }

    const handleFindIdSubmit = async e => {
        try {
            e.preventDefault();
            const findId = await findUserId({ }); 
            // 여기선 쿠키보내야됨
            console.log('view =>', findId)

        } catch(err) {
            console.error(err)
        }
    }

    
    useEffect(() => {

    }, [])


    return (
        <Fragment>
            <form onSubmit={handleAuthNumberSubmit}>
                <div>
                    <Label htmlFor="userName" content="이름" classN="label_t1"/>
                    <Input 
                        id="userName" 
                        type="text" 
                        required={true} 
                        placeholder="userName" 

                        classN="input_text_t1" 
                        name="userName" 
                        value={name} 
                        evt="onChange" 
                        onChange={handleName} 
                    />
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
                        value={email} 
                        evt="onChange" 
                        onChange={handleEmail} 
                    />
                </div>
                <button>인증번호 보내기</button>
            </form>
            {authToggle ? (
                <form>
                  <div>
                     <Label htmlFor="authNumber" content="인증번호" classN="label_t1"/>
                     <Input 
                         id="authNumber" 
                         type="text" 
                         required={true} 
                         placeholder="인증번호를 입력해주세요" 
                         classN="input_text_t1" 
                         name="authNumber" 
                         value={authNumber} 
                         evt="onChange" 
                         onChange={handleAuthNumber} 
                         disabled={authToggle ? false : true }
                     />
                 </div>
             </form>
            ) : (
                <div></div>
            ) }
          
        </Fragment>
    )
}


export default FindId;