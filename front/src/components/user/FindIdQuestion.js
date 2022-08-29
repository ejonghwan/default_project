import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo, useRef } from 'react';


// module
import { useInput } from '../common/hooks/index.js'
import { findUserIdQuestion } from '../../reducers/UserRequest.js'
import _debounce from 'lodash.debounce'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'


// context & request 
import { nmaeEditUser, emailEditUser } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'

// util
import { statusCode, questionData } from '../../utils/utils.js'


const FindIdQuestion = () => {
    const [authToggle, setAuthToggle] = useState(false);
    const [name, handleName, setName] = useInput('');
    const [email, handleEmail, setEmail] = useInput(''); 
    const [qeustionType, setQeustionType] = useState(null)
    const [result, handleResult, setResult] = useInput('') 

    const selectRef = useRef(null)
    const [resMsg, setResMsg] = useState({});

    const handleQeustion = useCallback(e => {
        setQeustionType(e.target.value)
    }, [qeustionType, setQeustionType, authToggle])

   
    /** 아이디 찾기 서브밋 */
    const handleFindIdSubmit = async e => {
        e.preventDefault();
        findIdSubmit();
    }
    const findIdSubmit = useMemo(() => _debounce(async() => {
        try {
            const findId = await findUserIdQuestion({ name, email, qeustionType, result }); 
    
            if(statusCode(findId.status, [4, 5])) return setResMsg({...resMsg, message: findId.data.message});
            if(statusCode(findId.status, 2)) { //성공시
                setAuthToggle(false);
                setName('');
                setEmail(''); 
                setResult('');
                setResMsg({id: findId.data.id, message: ''});
                selectRef.current[0].selected = true
            }
        } catch(err) {
            console.error(err)
        }
    }, 1000), [name, email, qeustionType, result])
     /** //아이디 찾기 서브밋 */


    useEffect(() => {
        console.log(resMsg)
        return () => {
            findIdSubmit.cancel()
        }
    }, [name, email, resMsg])


    return (
        <Fragment>
            <form onSubmit={handleFindIdSubmit}>
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
                <div>
                    <Label htmlFor="qeustion" content="질문" classN="label_t1"/>
                    <select name="qeustion" onChange={handleQeustion} ref={selectRef}>
                        {questionData && questionData.map((data, idx) => {
                            return <option key={idx} value={data.questionType}>{data.question}</option>
                        })}
                    </select>
               
                    <Label htmlFor="result" content="답" classN="label_t1"/>
                    <Input 
                        id="result" 
                        type="text" 
                        required={true} 
                        placeholder="result" 
                        classN="input_text_t1" 
                        name="result" 
                        value={result} 
                        evt="onChange" 
                        onChange={handleResult} 
                    />
                </div>
                <button disabled={authToggle && true}>인증번호 보내기</button>
                <p style={{color: "red"}}>{resMsg.message && resMsg.message}</p>
            </form>

            <br /><br />
            {resMsg.id && (<div>
                <p>아이디 {resMsg.id}</p>
            </div>)}
        </Fragment>
    )
}


export default FindIdQuestion;