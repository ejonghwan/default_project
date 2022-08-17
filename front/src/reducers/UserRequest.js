import React from 'react'
import axios from 'axios'

import { UserContext } from '../context/UserContext.js'
import debounce from 'lodash.debounce'

const host = 'http://localhost:5000'

// 회원가입 유저
export const emailAuth = debounce(async data => {
    try {
        const { email } = data;
        if(!email && typeof email !== 'string') return;
     
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true,
        }
        const res = await axios.post(`${host}/api/auth`, data, config)
        return res.data
    } catch(err) {
        console.error(err)
    }
}, 700)


// 회원가입 유저
export const signupUser = debounce(async data => {
    try {
        const { id, password, email, name, qeustion, phoneNumber, gender, birthday } = data;

        if(!id && typeof id !== 'string') return;
        if(!password && typeof password !== 'string') return;
        if(!email && typeof email !== 'string') return;
        if(!name && typeof name !== 'string') return;
        if(!qeustion && typeof qeustion !== 'object') return;
        if(!phoneNumber && typeof phoneNumber !== 'string') return;
        if(!gender && typeof qeustion !== 'string') return;
        if(!birthday && typeof birthday !== 'string') return;
        
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true,
        }
        const user = await axios.post(`${host}/api/users`, data, config)
        
        return user;

    } catch(err) {
        console.error(err)
    }
}, 700)


// 유저 불러오기
export const getUser = async query => {
    try {

        await debounce(() => {
            console.log('deb')
        },700)
        let accToken = null;

        if(query) { accToken = query }
        if(localStorage.getItem('X-access-token')) {
            accToken = localStorage.getItem('X-access-token')
        }

        console.log('query', accToken)
        if(!accToken) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                'X-access-token': accToken,
            },
            withCredentials: true,
        }
        const user = await axios.get(`${host}/api/users/load`, config)
        localStorage.setItem('X-access-token', user.data.accToken)
        return user;

    } catch(err) {
        console.error(err)
    }
}


// 로그인 유저
export const loginUser = debounce(async data => {
    try {
        const { id, password } = data;
        if(!id && typeof id !== 'string') return;
        if(!password && typeof password !== 'string') return;

        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }

        const user = await axios.post(`${host}/api/users/login`, data, config);
        localStorage.setItem('X-access-token', user.data.accToken);

        return user;
    } catch(err) {
        console.error(err)
    }
}, 700)

// 로그아웃 유저
export const logoutUser = debounce(async () => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                'X-access-token': accToken,
            },
            withCredentials: true,
          }
        await localStorage.removeItem('X-access-token')
        const user = await axios.get(`${host}/api/users/logout`, config)
        
        
        return user;
    } catch(err) {
        console.error(err)
    }
  }, 700)



// edit
// 이름 수정
export const nmaeEditUser = debounce(async data => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) return;

        const { name, _id } = data
        if(!name && typeof name !== 'string') return;
        if(!_id && typeof _id !== 'string') return;

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                'X-access-token': accToken,
            },
            withCredentials: true,
        }
        const user = await axios.patch(`${host}/api/users/edit/name`, data, config)
      

        return user;
    } catch(err) {
        console.error(err)
    }
}, 700)

// 회원인사람 인증번호 보내기
export const memberAuthNumberRequest = debounce(async data => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) return;
        const { email, _id } = data;
        if(!email && typeof email !== 'string') return;
        if(!_id && typeof _id !== 'string') return;

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                'X-access-token': accToken,
            },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const res = await axios.post(`${host}/api/auth/member/number`, data, config)

        return res;
    } catch(err) {
        console.error(err)
    }
}, 700)

// 비회원인사람 인증번호 보내기
export const nonMemberAuthNumberRequest = debounce(async data => {
    try {
        const { email, name } = data;
        if(!email && typeof email !== 'string') return;
        if(!name && typeof name !== 'string') return;

        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const res = await axios.post(`${host}/api/auth/nonMember/number`, data, config)

        return res;
    } catch(err) {
        console.error(err)
    }
}, 700)


// 회원+비로그인 인증번호 보내기
export const nonLoginMemberAuthNumberRequest = debounce(async data => {
    try {
        const { email, name } = data;
        if(!email && typeof email !== 'string') return;
        if(!name && typeof name !== 'string') return;

        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const res = await axios.post(`${host}/api/auth/nonLoginMember/number`, data, config)

        return res;
    } catch(err) {
        console.error(err)
    }
}, 2000)





// 이메일 수정
export const emailEditUser = debounce(async data => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) return;
        const { email, _id } = data;
        if(!email && typeof email !== 'string') return;
        if(!_id && typeof _id !== 'string') return;

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                'X-access-token': accToken,
            },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const res = await axios.patch(`${host}/api/users/edit/email`, data, config)

        return res;
    } catch(err) {
        console.error('saga error', err.response)
        return err.response;
    }
}, 700)
  
  
// 비번수정
export const passwordEditUser = debounce(async data => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) return;
        const { prevPassword, newPassword, _id, newPasswordCheck } = data;
        if(!prevPassword && typeof prevPassword !== 'string') return;
        if(!newPassword && typeof newPassword !== 'string') return;
        if(!newPasswordCheck && typeof newPasswordCheck !== 'string') return;
        if(!_id && typeof _id !== 'string') return;

        console.log('request data', data)

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                'X-access-token': accToken,
            },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const user = await axios.post(`${host}/api/users/edit/password`, data, config)

        console.log('client respose data', user)

        return user;
    } catch(err) {
        console.error(err)
    }
}, 700)


// 아이디 찾기  // 비회원 인증번호 받은 사람은 이걸로 다시 쿠키 주면서 요청해야됨 
export const findUserId = debounce(async data => {
    try {
        const { authNumber } = data;
        if(!authNumber && typeof authNumber !== 'string') return;

        console.log('request data', data)

        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }

        const findId = axios.post(`${host}/api/users/find/id`, data, config)

        return findId;

    } catch(err) {
        console.error(err)
    }
}, 700)