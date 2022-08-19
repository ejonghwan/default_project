import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo } from 'react';


// module
import { useInput } from '../common/hooks/index.js'
import { findUserId, nonMemberAuthNumberRequest, nonLoginMemberAuthNumberRequest } from '../../reducers/UserRequest.js'
import _debounce from 'lodash.debounce'
import _throttle from 'lodash.throttle'

// util
import { timer } from '../../utils/utils.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
// import { DebounceButton } from '../common/form/Button.js'
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

    const [authNumber, handleAuthNumber] = useInput('');
    const [authToggle, setAuthToggle] = useState(false);
    const [name, handleName, setName] = useInput('');
    const [email, handleEmail, setEmail] = useInput(''); 
    const [resMsg, setResMsg] = useState({})

    const [counting, setCounting] = useState(null)
    

    const handleAuthNumberSubmit = e => {
        e.preventDefault();
        authSubmit();
    }
    const authSubmit = useMemo(() => _debounce(async() => {
        try {
            const number = await nonLoginMemberAuthNumberRequest({ name, email }); 
            setResMsg({ ...resMsg, ...number.data })
            if(number.status === 400) return;

            console.log(timer)

            // 성공 시 
            setAuthToggle(true)
            timer(180, 180, count => {
                setCounting(count)
                if(count === 0) {
                    setResMsg({ ...resMsg, message: '인증시간이 초과했습니다.' });
                    setAuthToggle(false);
                }
            })
          
        } catch(err) {
            console.error(err)
        }
    }, 1000), [name, email])


    const handleFindIdSubmit = async e => {
        e.preventDefault();
        findIdSubmit();
    }
    const findIdSubmit = useMemo(() => _debounce(async() => {
        try {
            const findId = await findUserId({ authNumber }); 
            // 여기선 쿠키 2개 보냄
            // 3분 타이머 만들어야함. 
            console.log('find Id view =>', findId)
            setResMsg({ ...resMsg, ...findId.data })
            if(findId.status === 200) { 
                setAuthToggle(false);
                setName('');
                setEmail(''); 
            }
            
        } catch(err) {
            console.error(err)
        }
    }, 1000), [authNumber])



    useEffect(() => {
        console.log(resMsg)
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
            </form>
            {authToggle && (
                <form onSubmit={handleFindIdSubmit}>
                  <div>
                    남은시간: {counting} <br />
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
                         disabled={authToggle ? false : true }
                     />
                 </div>
                 <button>아이디 찾기</button>
             </form>
            )}


            <br /><br />
            {resMsg && (<div>
                <p>{resMsg.id}</p>
                <p>{resMsg.message}</p>
            </div>)}
        </Fragment>
    )
}


export default FindId;