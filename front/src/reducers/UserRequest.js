import axios from 'axios'

const host = 'http://localhost:5000'



// 회원가입 유저
export const signupUser = async data => {
    try {
        // const { id, password, email, name, qeustion } = data;
        // console.log('saga', data)
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true,
        }
        const user = await axios.post(`${host}/api/users`, data, config)
  
        return user;

    } catch(err) {
        console.err(err)
    }
}


// 유저 불러오기
export const getUser = async () => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) { return false };
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
        console.err(err)
    }
}


// 로그인 유저
export const loginUser = async data => {
    try {
        const { id, password } = data;
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const user = await axios.post(`${host}/api/users/login`, data, config)
        localStorage.setItem('X-access-token', user.data.accToken) 
        return user;
    } catch(err) {
        console.err(err)
    }
}


// 로그아웃 유저
export const logoutUser = async () => {
    try {
        const accToken = localStorage.getItem('X-access-token')
        console.log(accToken)
        if(!accToken) {return false}
        const config = {
            headers: {
                "Content-Type": "application/json",
                'X-access-token': accToken,
            },
            withCredentials: true,
          }
        const user = await axios.get(`${host}/api/users/logout`, config)
        localStorage.removeItem('X-access-token')
        
        return user;
    } catch(err) {
        console.err(err)
    }
  }




// edit
// 이름 수정
export const nmaeEditUser = async data => {
    try {
        const { name, _id } = data
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const user = await axios.patch(`${host}/api/users/edit/name/${_id}`, name, config)
        localStorage.setItem('X-access-token', user.data.accToken) 

        return user;
    } catch(err) {
        console.err(err)
    }
}


// 이메일 수정
export const emailEditUser = async data => {
    try {
        const { email, _id } = data
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true // 쿠키 cors 통신 설정
        }
        const user = await axios.patch(`${host}/api/users/edit/name/${_id}`, data, config)
        localStorage.setItem('X-access-token', user.data.accToken) 

        return user;
    } catch(err) {
        console.err(err)
    }
}
  
  