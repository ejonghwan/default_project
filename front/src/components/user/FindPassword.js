import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';

// module
import { useInput } from '../common/hooks/index.js'

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'

// components
// import LoginForm from '../components/user/LoginForm.js'

// context & request 
import { nmaeEditUser, emailEditUser } from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'


const FindPassword = () => {

     /*
        1. 비번찾기 클릭
        2. 찾을 아이디 입력받음  
        3. 이메일 보냄 
        4. 이메일 인증번호 입력받음 
        5. 백엔드에서 입력받은거 매칭 시키고 참이면 
        6. 비번 재설정 페이지로 리디렉션
        
    */

    return (
        <Fragment>
            비번 찾기
        </Fragment>
    )
}


export default FindPassword;