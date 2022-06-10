import React, { createContext, useContext, useReducer } from 'react';
import UserReducer, { UserIntialState } from '../reducers/UserReducer.js'


// 1. 컨텍스트 만들기
export const UserContext = createContext(null)

// 2. 공급자 함수(hoc)
export const UserProvider = ({children}) => {
    // 3. reducer 연결 useReducer가 (state, dispatch) 리턴해줌 
    const [ state, dispatch ] = useReducer(UserReducer, UserIntialState)

    return (
        // 4. 만든 컨텍스트 provider에 넣기
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
