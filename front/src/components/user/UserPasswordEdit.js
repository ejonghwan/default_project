import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash.debounce';


// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// context & request 
import { prevPasswordEditUser, findPasswordEditUser } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'


// util
import { statusCode, passwordChecked } from '../../utils/utils.js'


const UserPasswordEdit = props => {

    const { prevPasswordCheck, userId } = props;

    const [prevPassword, handlePrevPassword, setPrevPassword] = useInput('') 
    const [newPassword, handleNewPassword, setNewPassword] = useInput('') 
    const [newPasswordCheck, handleNewPasswordCheck, setNewPasswordCheck] = useInput('') 
    const [passwordIsChecked, setPasswordIsChecked] = useState(false) 
    
    // 유효성 검사
    const [passwordProtected, setPasswordProtected] = useState(null)
    const [prevPasswordMatched, setPrevPasswordMatched] = useState(null)

    const [submitActive, setSubmitActive] = useState(false);

    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();
    
    // 인증이 모두 true인지
    useEffect(() => {
        newPassword === newPasswordCheck ? setPasswordIsChecked(true) : setPasswordIsChecked(false);
        if(prevPassword && newPassword && newPasswordCheck && passwordIsChecked && passwordProtected) setSubmitActive(true)
        if(!prevPasswordCheck && newPassword && newPasswordCheck && passwordIsChecked && passwordProtected) setSubmitActive(true)
        console.log(submitActive)
    }, [prevPasswordCheck, newPasswordCheck, prevPassword, newPassword, newPasswordCheck, passwordIsChecked, passwordProtected])

    // 요청
    const handlePasswordEditSubmit = useCallback(async e => {
        e.preventDefault();
        prevPasswordCheck ? prevPasswordEdit() : newPasswordEdit();

    }, [prevPassword, newPassword, state, passwordIsChecked])


    // 기존 비번 바꾸기
    const prevPasswordEdit = useMemo(() => _debounce(async() => {
        try {   
            if(!prevPassword && !newPassword && !state && !passwordIsChecked) return console.error('정보 확인해주세요');
            dispatch({ type: "LOADING", loadingMessage: "비번 변경중.." })
            const user = await prevPasswordEditUser({
                prevPassword, 
                newPassword, 
                newPasswordCheck,
                _id: state.user._id
            });

            if(statusCode(user.status, 2)) { // 성공시
                dispatch({ type: "USER_PASSWORD_EDIT_SUCCESS", data: user.data.message })
                setPrevPassword('')
                setNewPassword('')
                setNewPasswordCheck('')
                return;
            }
            // 비밀번호 강화 로직 아직안함
            //실패시 
            console.log(user)
            dispatch({ type: "USER_PASSWORD_EDIT_FAILUE", data: user.data.message })

        } catch(err) {
            console.error(err)
        }
    }, 500), [prevPassword, newPassword, state, passwordIsChecked])

    
    // 비번 찾기
    const newPasswordEdit = useMemo(() => _debounce(async() => {
        try {   
            if(!userId && !newPassword && !state && !passwordIsChecked) return console.error('정보 확인해주세요');
            dispatch({ type: "LOADING", loadingMessage: "비번 변경중.." })
            const user = await findPasswordEditUser({
                newPassword, 
                newPasswordCheck,
                _id: userId
            });
            if(user.data.matched) return setPrevPasswordMatched(true);
            if(statusCode(user.status, 2)) { // 성공시
                // 완료되면 로그인페이지로 
                setNewPassword('')
                setNewPasswordCheck('')
                alert('비밀번호가 새로 설정되었습니다')
                navigate('/')
            }

        } catch(err) {
            dispatch({ type: "USER_PASSWORD_EDIT_FAILUE", data: err.err })
            console.error(err)
        }
    }, 500), [newPassword, state, passwordIsChecked])


    useEffect(() => {
        return () => {
            prevPasswordEdit.cancel();
            newPasswordEdit.cancel();
        }
    }, [])

    useEffect(() => {
        passwordChecked(newPassword) === true ? setPasswordProtected(true) : setPasswordProtected(false);
        prevPassword && prevPassword === newPassword ? setPrevPasswordMatched(true) : setPrevPasswordMatched(false);
    }, [newPassword])


    return (
        <Fragment>
            <br />
            <br />
            <br />
            password change 
             <form onSubmit={handlePasswordEditSubmit}>
                {prevPasswordCheck && (
                    // props prevPassword가 true여야 얘 보임
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
                )}
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
                    {passwordProtected ? (
                        <p style={{color: "blue"}}>8~ 16글자 + 1개 이상의 숫자 + 1개 이상의 특수문자 + 온니 영문[o]</p>
                    ) : (
                        <p style={{color: "red"}}>8~ 16글자 + 1개 이상의 숫자 + 1개 이상의 특수문자 + 온니 영문 [x]</p>
                    )}
                      {prevPasswordMatched && (
                        <p style={{color: "red"}}>이전 비밀번호와 같습니다[x]</p>
                    )}
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
                    {newPasswordCheck && (
                        <div>
                            {passwordIsChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)}
                        </div>
                    )}
                </div>
             
                <button className={submitActive ? 'checked' : 'none'} disabled={submitActive ? false : true}>비번변경</button>
            </form>
            <p>{state.error && state.error}</p>
        </Fragment>
    )
}


export default UserPasswordEdit;