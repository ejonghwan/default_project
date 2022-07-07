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


const FindId = () => {

    /*
        1. 아이디찾기 클릭
        2. 등록된 메일 노출, 거기로 인증번호 보냄 
        3. 인증번호 입력받는 폼
        4. 인증번호 입력받으면 백엔드에서 인증번호 매치 후 
        5. 참이면 아이디 알려주는 페이지로 리디렉션
    */

    /*
        이름 생년월일 성별 메일주소로 찾기
    */

    /*
        이름, 전화번호로 찾기
    */

    

    return (
        <Fragment>
            아디 찾기
        </Fragment>
    )
}


export default FindId;