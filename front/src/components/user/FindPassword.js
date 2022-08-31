import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo } from 'react';


// module
import { useInput } from '../common/hooks/index.js'
import _debounce from 'lodash.debounce'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import Timer from '../../components/common/utils/Timer.js';
import UserPasswordEdit from './UserPasswordEdit.js'

// util 
import { statusCode } from '../../utils/utils.js'

// context & request 
// import { findUserId, nonLoginMemberAuthNumberRequest } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'

const FindPassword = () => {

        const { findUserId, nonLoginMemberAuthNumberRequest } = UserRequest()
        const {state, dispatch} = useContext(UserContext)

        const [authNumber, handleAuthNumber, setAutnNumber] = useInput('');
        const [authToggle, setAuthToggle] = useState(false);
        const [name, handleName, setName] = useInput('');
        const [email, handleEmail, setEmail] = useInput(''); 
        const [resMsg, setResMsg] = useState({});
        const [authTimeout, setAuthTimeout] = useState(false);
        const [authcom, setAuthcom] = useState(false);

        

        /** 이메일인증 서브밋 */
        const handleAuthNumberSubmit = e => {
            e.preventDefault();
            authSubmit();
        }
        const authSubmit = useMemo(() => _debounce(async() => {
            try {
                const number = await nonLoginMemberAuthNumberRequest({ name, email }); 
                if(statusCode(number.status, 2)) return setAuthToggle(true); //성공 시 
            } catch(err) {
                console.error(err)
            }
        }, 1000), [name, email])
        /** //이메일인증 서브밋 */
    
    
        /** 아이디 찾기 서브밋 */
        const handleFindIdSubmit = async e => {
            e.preventDefault();
            findIdSubmit();
        }
        const findIdSubmit = useMemo(() => _debounce(async() => {
            try {
                const findId = await findUserId({ authNumber }); 
                // 여기선 쿠키 2개 보냄
    
                
                if(statusCode(findId.status, 2)) { 
                    setAuthToggle(false);
                    setName('');
                    setEmail(''); 
                    setAutnNumber('');
                    setAuthcom(true)
                }
            } catch(err) {
                console.error(err)
            }
        }, 1000), [authNumber])
         /** //아이디 찾기 서브밋 */
    
    
        useEffect(() => {
            return () => {
                authSubmit.cancel()
                findIdSubmit.cancel()
            }
        }, [name, email, authNumber, resMsg])
    
    


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
                        disabled={authToggle && true}
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
                        disabled={authToggle && true}
                    />
                </div>
                <button disabled={authToggle && true}>인증번호 보내기</button>
                {state.mailAuthErrorMessage && <p style={{color: 'red'}}>{state.mailAuthErrorMessage}</p>}
            </form>

            {resMsg && <div>{resMsg.id}</div>}
            {authToggle && (
                <form onSubmit={handleFindIdSubmit}>
                  <div>
                     <Label htmlFor="authNumber" content="메일로 인증번호가 전송되었습니다" classN="label_t1"/>
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
                         disabled={authTimeout}
                     />
                     <Timer  
                        endSecond={180} 
                        startingPoint={180} 
                        countingName={'인증번호를 입력해주세요'} 
                        endMessage={'인증시간이 만료되었습니다'}
                        callback={() => setAuthTimeout(true)}
                    />
                 </div>
                 <button disabled={authTimeout}>메일 인증하기</button>
                 {state.authNumberErrorMessage && <p style={{color: 'red'}}>{state.authNumberErrorMessage}</p>}
             </form>
            )}

            <br /><br />
            {authcom && <UserPasswordEdit prevPasswordCheck={false} userId={resMsg.id}/>}
            
           
        </Fragment>
    )
}


export default FindPassword;