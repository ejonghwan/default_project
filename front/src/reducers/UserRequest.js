import React, { useContext, useState } from 'react'
import axios from 'axios'
import _debounce from 'lodash.debounce'
import { UserContext } from '../context/UserContext.js'

// ddebounceFn
import { debounce } from '../utils/utils.js'



const host = 'http://localhost:5000'
const UserRequest = () => {
    const { state, dispatch } = useContext(UserContext); 

   // 회원가입 유저
     const emailAuth = async data => {
        try {
            const { email } = data;
            if(!email || typeof email !== 'string') throw new Error('checked email');
        
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.post(`${host}/api/auth`, data, config);
            return res;
        } catch(err) {
            console.error(err)
            return err.response
        }
    }

    
    // 회원가입 유저
     const signupUser = async data => {
        try {
            const { id, password, email, name, qeustion, phoneNumber, gender, birthday } = data;

            if(!id || typeof id !== 'string') throw new Error('is not id');
            if(!password || typeof password !== 'string') throw new Error('is not password');
            if(!email || typeof email !== 'string') throw new Error('is not email');
            if(!name || typeof name !== 'string') throw new Error('is not name');
            if(!qeustion || typeof qeustion !== 'object') throw new Error('is not qeustion');
            if(!phoneNumber || typeof phoneNumber !== 'string') throw new Error('is not phoneNumber');
            if(!gender || typeof qeustion !== 'string') throw new Error('is not gender');
            if(!birthday || typeof birthday !== 'string') throw new Error('is not birthday');
            
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
            const user = await axios.post(`${host}/api/users/signup`, data, config)
            dispatch({ type: "USER_SIGNUP_SUCCESS" })
            return user;

        } catch(err) {
            console.error('saga err', err)
            dispatch({ type: "USER_SIGNUP_FAILUE", data: err.response.data.message })
            return err.response
        } 
    }


    // 유저 불러오기
     const getUser = async query => {
        try {
            let accToken = null;
            if(query) { accToken = query }; //이미 가입된 이메일로 들어오는 유저들은 로그인 로직탐. query로 acc토큰 받음 
            if(localStorage.getItem('X-access-token')) {
                accToken = localStorage.getItem('X-access-token');
            };
            if(!accToken) throw new Error('is not accToken');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            const user = await axios.get(`${host}/api/users/load`, config);

            // accToken 만료되었으면 다시 받아온걸로 저장소 셋팅
            localStorage.setItem('X-access-token', user.data.accToken)
            dispatch({type: "USER_LOAD_SUCCESS", data: user.data});
            return user;
        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_LOAD_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };
    

    // 로그인 유저
     const loginUser = async data => {
        try {
            const { id, password } = data;
            if(!id || typeof id !== 'string') throw new Error('is not id');
            if(!password || typeof password !== 'string') throw new Error('is not password');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const user = await axios.post(`${host}/api/users/login`, data, config);
            localStorage.setItem('X-access-token', user.data.accToken);
            dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data });
            return user;
        } catch(err) {
            console.error(err);
            dispatch({ type: "USER_LOGIN_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };

    // 로그아웃 유저 
     const logoutUser = async () => {
        try {
            const accToken = localStorage.getItem('X-access-token');
            if(!accToken) throw new Error('is not acctoken');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            await localStorage.removeItem('X-access-token');
            const user = await axios.get(`${host}/api/users/logout`, config);
            dispatch({ type: "USER_LOGOUT_SUCCESS" });
            return user;
        } catch(err) {
            console.error(err);
            return err.response;
        };
    };

    

    // edit
    // 이름 수정 
     const userInfoEditUser = async data => {
        try {
            const accToken = localStorage.getItem('X-access-token');
            if(!accToken) throw new Error('user request error. is not acc token');

            const { name, gender, birthday, phoneNumber, _id } = data;
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');
            if(!gender || typeof gender !== 'string') throw new Error('user request error. is not gender');
            if(!birthday || typeof birthday !== 'string') throw new Error('user request error. is not birthday');
            if(!phoneNumber || typeof phoneNumber !== 'string') throw new Error('user request error. is not  phoneNumber');
            if(!_id || typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true,
            }
            const user = await axios.patch(`${host}/api/users/edit/userInfo`, data, config);
            dispatch({ type: "USER_USER_INFO_EDIT_SUCCESS", data: user.data });
            return user;
        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_USER_INFO_EDIT_FAILUE", data: err.response.data.message });
            return err.response
        }
    }
   
    // 회원인사람 인증번호 보내기 //
     const memberAuthNumberRequest = async data => {
        try {
            const accToken = localStorage.getItem('X-access-token');
            if(!accToken) return;
            const { email, _id } = data;
            if(!email && typeof email !== 'string') throw new Error('user request error. is not email');
            if(!_id && typeof _id !== 'string') throw new Error('user request error. is not _id');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = await axios.post(`${host}/api/auth/member/number`, data, config);
            dispatch({ type: "ERROR_LOADING_CLEAR"});
            return res;
        } catch(err) {
            console.error(err)
            dispatch({ type: "ERROR_LOADING_CLEAR"});
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.response.data.message });
            return err.response;
        }
    }
   

    // 비회원+비로그인 인증번호 보내기 
     const nonMemberAuthNumberRequest = async data => {
        try {
            const { email, name } = data;
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = axios.post(`${host}/api/auth/nonMember/number`, data, config);
            dispatch({ type: "ERROR_LOADING_CLEAR"});
            return res;
        } catch(err) {
            console.error(err)
            dispatch({ type: "ERROR_LOADING_CLEAR"});
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.response.data.message });
            return err.response
        }
    }
 

    // 회원+비로그인 인증번호 보내기 
     const nonLoginMemberAuthNumberRequest = async data => {
        try {
            const { email, name } = data;
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');

            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = await axios.post(`${host}/api/auth/nonLoginMember/number`, data, config);
            dispatch({ type: "ERROR_LOADING_CLEAR"});
            return res;

        } catch(err) {
            console.error('user request ', err);
            dispatch({ type: "ERROR_LOADING_CLEAR"});
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.response.data.message });
            return err.response;
        }
    }


    // 이메일 수정  //여기부터 다시해야됨
     const emailEditUser = async data => {
        try {
            const accToken = localStorage.getItem('X-access-token')
            if(!accToken) throw new Error('is not acctoken');
            const { email, _id } = data;
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!_id || typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = await axios.patch(`${host}/api/users/edit/email`, data, config);
            dispatch({ type: "USER_MAIL_EDIT_SUCCESS", data: res.data });
            return res;
        } catch(err) {
            console.error('saga error', err.response);
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.response.data.message })
            return err.response;
        };
    };
    
    
    // 이전 비번을 알고 있는 경우 비번수정
     const prevPasswordEditUser = async data => {
        try {
            const accToken = localStorage.getItem('X-access-token')
            if(!accToken) throw new Error('user request error. is not accToken');
        
            const { prevPassword, newPassword, _id, newPasswordCheck } = data;
            if(!prevPassword || typeof prevPassword !== 'string') throw new Error('user request error. is not prevPassword');
            if(!newPassword || typeof newPassword !== 'string') throw new Error('user request error. is not newPassword');
            if(!newPasswordCheck || typeof newPasswordCheck !== 'string') throw new Error('user request error. is not newPasswordCheck');
            if(!_id || typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const user = await axios.post(`${host}/api/users/edit/password`, data, config);
            dispatch({ type: "USER_PASSWORD_EDIT_SUCCESS"})
            return user;

        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_PASSWORD_EDIT_FAILUE", data: err.response.data.message })
            return err.response
        }
    }
    
    // 이전 비번을 모르고 있는 경우 비번수정
     const findPasswordEditUser = async data => {
        try {
            const { newPassword, _id, newPasswordCheck } = data;
            if(!newPassword && typeof newPassword !== 'string') return console.error('user request error. is not newPassword');
            if(!newPasswordCheck && typeof newPasswordCheck !== 'string') return console.error('user request error. is not newPasswordCheck');
            if(!_id && typeof _id !== 'string') return console.error('user request error. is not _id');

            const config = {
                headers: {"Content-Type": "application/json"},
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const user = await axios.post(`${host}/api/users/find/password`, data, config);
            return user;

        } catch(err) {
            console.error(err)
            return err.response
        };
    };

   
    // 아이디 찾기  // 비회원 인증번호 받은 사람은 이걸로 다시 쿠키 주면서 요청해야됨 
     const findUserId = async data => {
        try {
            const { authNumber } = data;
            if(!authNumber && typeof authNumber !== 'string') return console.error('user request error. is not authNumber');

            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }

            const findId = await axios.post(`${host}/api/users/find/id`, data, config);
            return findId;

        } catch(err) {
            console.error(err)
            return err.response
        }
    }


    // 질답으로 아이디 찾기  
     const findUserIdQuestion = async data => {
        try {
            const { name, email, qeustionType, result } = data;
            if(!name && typeof name !== 'string') return console.error('user request error. is not name');
            if(!email && typeof email !== 'string') return console.error('user request error. is not email');
            if(!qeustionType && typeof qeustionType !== 'string') return console.error('user request error. is not qeustionType');
            if(!result && typeof result !== 'string') return console.error('user request error. is not result');

            const config = {
                headers: { "Content-Type": "application/json"},
                withCredentials: true // 쿠키 cors 통신 설정
            }

            const findId = await axios.post(`${host}/api/users/find/id/question`, data, config);
            return findId;

        } catch(err) {
            console.error(err)
            return err.response
        }
    }

    return {
        emailAuth, 
        signupUser, 
        getUser, 
        loginUser, 
        logoutUser,
        userInfoEditUser,
        memberAuthNumberRequest,
        nonMemberAuthNumberRequest,
        nonLoginMemberAuthNumberRequest,
        emailEditUser,
        prevPasswordEditUser,
        findPasswordEditUser,
        findUserId,
        findUserIdQuestion,
    }
}

export default UserRequest;
















// 수정전 코드...
// // 회원가입 유저
// export const emailAuth = async data => {
//     try {
//         const { email } = data;
//         if(!email && typeof email !== 'string') return;
     
//         const config = {
//             headers: { "Content-Type": "application/json", },
//             withCredentials: true,
//         }
//         const res = await axios.post(`${host}/api/auth`, data, config);
//         return res;
//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }


// // 회원가입 유저
// export const signupUser = async data => {
//     try {
//         const { id, password, email, name, qeustion, phoneNumber, gender, birthday } = data;

//         if(!id && typeof id !== 'string') return;
//         if(!password && typeof password !== 'string') return;
//         if(!email && typeof email !== 'string') return;
//         if(!name && typeof name !== 'string') return;
//         if(!qeustion && typeof qeustion !== 'object') return;
//         if(!phoneNumber && typeof phoneNumber !== 'string') return;
//         if(!gender && typeof qeustion !== 'string') return;
//         if(!birthday && typeof birthday !== 'string') return;
        
//         const config = {
//             headers: { "Content-Type": "application/json", },
//             withCredentials: true,
//         }

//         const user = await axios.post(`${host}/api/users/signup`, data, config)
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }



// // 유저 불러오기
// export const getUser = async query => {
//     try {
//         let accToken = null;
//         if(query) { accToken = query }
//         if(localStorage.getItem('X-access-token')) {
//             accToken = localStorage.getItem('X-access-token')
//         }
//         if(!accToken) return;

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 'X-access-token': accToken,
//             },
//             withCredentials: true,
//         }
//         const user = await axios.get(`${host}/api/users/load`, config)
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }


// // 로그인 유저
// export const loginUser = async data => {
//     try {
//         const { id, password } = data;
//         if(!id && typeof id !== 'string') return;
//         if(!password && typeof password !== 'string') return;

//         const config = {
//             headers: { "Content-Type": "application/json", },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
      
//         const user = await axios.post(`${host}/api/users/login`, data, config)
//         localStorage.setItem('X-access-token', user.data.accToken);
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }

// // 로그아웃 유저
// export const logoutUser = async () => {
//     try {
//         const accToken = localStorage.getItem('X-access-token')
//         if(!accToken) return;

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 'X-access-token': accToken,
//             },
//             withCredentials: true,
//           }
//         await localStorage.removeItem('X-access-token')
//         const user = await axios.get(`${host}/api/users/logout`, config)
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
//   }



// // edit
// // 이름 수정
// export const userInfoEditUser = async data => {
//     try {
//         const accToken = localStorage.getItem('X-access-token')
//         if(!accToken) return console.error('user request error. is not acc token');;

//         const { name, gender, birthday, phoneNumber, _id } = data;
//         if(!name && typeof name !== 'string') return console.error('user request error. is not name');
//         if(!gender && typeof gender !== 'string') return console.error('user request error. is not gender');
//         if(!birthday && typeof birthday !== 'string') return console.error('user request error. is not birthday');
//         if(!phoneNumber && typeof phoneNumber !== 'string') return console.error('user request error. is not  phoneNumber');
//         if(!_id && typeof _id !== 'string') return console.error('user request error. is not _id');

//         const config = {
//             headers: { 
//                 "Content-Type": "application/json", 
//                 'X-access-token': accToken,
//             },
//             withCredentials: true,
//         }
//         const user = await axios.patch(`${host}/api/users/edit/userInfo`, data, config);
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }

// // 회원인사람 인증번호 보내기
// export const memberAuthNumberRequest = async data => {
//     try {
//         const accToken = localStorage.getItem('X-access-token')
//         if(!accToken) return;
//         const { email, _id } = data;
//         if(!email && typeof email !== 'string') return console.error('user request error. is not email');
//         if(!_id && typeof _id !== 'string') return console.error('user request error. is not _id');

//         const config = {
//             headers: { 
//                 "Content-Type": "application/json", 
//                 'X-access-token': accToken,
//             },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
//         const res = await axios.post(`${host}/api/auth/member/number`, data, config)
//         return res;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }

// // 비회원인사람 인증번호 보내기
// export const nonMemberAuthNumberRequest = async data => {
//     try {
//         const { email, name } = data;
//         if(!email && typeof email !== 'string') return console.error('user request error. is not email');
//         if(!name && typeof name !== 'string') return console.error('user request error. is not name');

//         const config = {
//             headers: { "Content-Type": "application/json", },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
//         const res = axios.post(`${host}/api/auth/nonMember/number`, data, config);
//         return res;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }


// // 회원+비로그인 인증번호 보내기
// export const nonLoginMemberAuthNumberRequest = async data => {
//     try {
//         const { email, name } = data;
//         if(!email && typeof email !== 'string') return console.error('user request error. is not email');
//         if(!name && typeof name !== 'string') return console.error('user request error. is not name');

//         const config = {
//             headers: { "Content-Type": "application/json", },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
//         const res = await axios.post(`${host}/api/auth/nonLoginMember/number`, data, config)
//         return res;

//     } catch(err) {
//         console.error('user request ', err)
//         return err.response
//     }
// }





// // 이메일 수정
// export const emailEditUser = async data => {
//     try {
//         const accToken = localStorage.getItem('X-access-token')
//         if(!accToken) return;
//         const { email, _id } = data;
//         if(!email && typeof email !== 'string') return console.error('user request error. is not email');
//         if(!_id && typeof _id !== 'string') return console.error('user request error. is not _id');

//         const config = {
//             headers: { 
//                 "Content-Type": "application/json", 
//                 'X-access-token': accToken,
//             },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
//         const res = await axios.patch(`${host}/api/users/edit/email`, data, config);
//         return res;

//     } catch(err) {
//         console.error('saga error', err.response)
//         return err.response
//     }
// }
  
  
// // 이전 비번을 알고 있는 경우 비번수정
// export const prevPasswordEditUser = async data => {
//     try {
//         const accToken = localStorage.getItem('X-access-token')
//         if(!accToken) return console.error('user request error. is not accToken');
    
//         const { prevPassword, newPassword, _id, newPasswordCheck } = data;
//         if(!prevPassword && typeof prevPassword !== 'string') return console.error('user request error. is not prevPassword');
//         if(!newPassword && typeof newPassword !== 'string') return console.error('user request error. is not newPassword');
//         if(!newPasswordCheck && typeof newPasswordCheck !== 'string') return console.error('user request error. is not newPasswordCheck');
//         if(!_id && typeof _id !== 'string') return console.error('user request error. is not _id');

//         const config = {
//             headers: { 
//                 "Content-Type": "application/json", 
//                 'X-access-token': accToken,
//             },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
//         const user = await axios.post(`${host}/api/users/edit/password`, data, config);
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }

// // 이전 비번을 모르고 있는 경우 비번수정
// export const findPasswordEditUser = async data => {
//     try {
//         const { newPassword, _id, newPasswordCheck } = data;
//         if(!newPassword && typeof newPassword !== 'string') return console.error('user request error. is not newPassword');
//         if(!newPasswordCheck && typeof newPasswordCheck !== 'string') return console.error('user request error. is not newPasswordCheck');
//         if(!_id && typeof _id !== 'string') return console.error('user request error. is not _id');

//         const config = {
//             headers: {"Content-Type": "application/json"},
//             withCredentials: true // 쿠키 cors 통신 설정
//         }
//         const user = await axios.post(`${host}/api/users/find/password`, data, config);
//         return user;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }


// // 아이디 찾기  // 비회원 인증번호 받은 사람은 이걸로 다시 쿠키 주면서 요청해야됨 
// export const findUserId = async data => {
//     try {
//         const { authNumber } = data;
//         if(!authNumber && typeof authNumber !== 'string') return console.error('user request error. is not authNumber');

//         const config = {
//             headers: { "Content-Type": "application/json", },
//             withCredentials: true // 쿠키 cors 통신 설정
//         }

//         const findId = await axios.post(`${host}/api/users/find/id`, data, config);
//         return findId;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }


// // 질답으로 아이디 찾기  
// export const findUserIdQuestion = async data => {
//     try {
//         const { name, email, qeustionType, result } = data;
//         if(!name && typeof name !== 'string') return console.error('user request error. is not name');
//         if(!email && typeof email !== 'string') return console.error('user request error. is not email');
//         if(!qeustionType && typeof qeustionType !== 'string') return console.error('user request error. is not qeustionType');
//         if(!result && typeof result !== 'string') return console.error('user request error. is not result');

//         const config = {
//             headers: { "Content-Type": "application/json"},
//             withCredentials: true // 쿠키 cors 통신 설정
//         }

//         const findId = await axios.post(`${host}/api/users/find/id/question`, data, config);
//         return findId;

//     } catch(err) {
//         console.error(err)
//         return err.response
//     }
// }