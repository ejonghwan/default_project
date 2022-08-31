import React, { useState, useCallback, useEffect, Fragment, useContext, useMemo } from 'react';

// util
import { timer, delay, initTime, statusCode } from '../../utils/utils.js'

// context
import { UserContext } from '../../context/UserContext.js'


const LoginUserInfo = () => {

    const {state, dispatch} = useContext(UserContext)
    const { id, name, email } = state.user;

    return (
        <Fragment>
            로그인정보
            <ul>
                <li>{id}</li>
                <li>{name} 님</li>
                <li>{email}</li>
            </ul>
        </Fragment>
    );
};

export default LoginUserInfo;