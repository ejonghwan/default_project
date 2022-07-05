// import React, { Fragment } from 'react'

// // module
// import { useInput } from '../components/common/hooks/index.js'

// // components
// import Input from '../components/common/form/Input.js'
// import Label from '../components/common/form/Label.js'


// const UserProfile = () => {

//     const [userName, handleUserName] = useInput('') 
//     const [prevPassword, handlePrevPassword] = useInput('') 
//     const [newPassword, handleNewPassword] = useInput('') 
//     const [newPasswordCheck, handleNewPasswordCheck] = useInput('') 


     



//     // 요청
//     const handleSubmit = useCallback(async e => {
//         try {   
//             e.preventDefault();
//             // if(!userId && !userPassword && !userEmail && !userName && !passwordChecked && !terms) return;

//             // await dispatch({ type: "LOADING", loadingMessage: "회원가입 중.." })
//             // const user = await signupUser({
//             //     id: userId, 
//             //     password: userPassword, 
//             //     email: userEmail, 
//             //     name: userName,
//             // });
//             // dispatch({ type: "USER_SIGNUP_SUCCESS" })
            
//             // 비밀번호 강화 로직 아직안함

//             console.log(user)


//         } catch(err) {
//             // dispatch({ type: "USER_SIGNUP_FAILUE", data: err.err })
//             // console.error(err)
//         }
//     }, [userId])


//     return (
//         <Fragment>
//              <form onSubmit={handleSubmit}>
               
//                 <div>
//                     <Label htmlFor="userName" content="이름" classN="label_t1"/>
//                     <Input 
//                         id="userName" 
//                         type="text" 
//                         required={true} 
//                         placeholder="userName" 
//                         classN="input_text_t1" 
//                         name="userName" 
//                         value={userName} 
//                         evt="onChange" 
//                         onChange={handleUserName} 
//                     />
//                 </div>
//                 <div>
//                     <Label htmlFor="prevPassword" content="이전 비밀번호" classN="label_t1"/>
//                     <Input  
//                         id="prevPassword" 
//                         type="password" 
//                         required={true} 
//                         placeholder="prevPassword" 
//                         classN="input_text_t1"
//                         name="prevPassword" 
//                         value={prevPassword} 
//                         evt="onChange" 
//                         onChange={handlePrevPassword} 
//                     />
//                     <button>view password</button>
//                     <button>이전 비밀번호 확인하기</button>

//                     {/* <span>비밀번호가 일치하지않아요</span> */}
//                 </div>
//                 <div>
//                     <Label htmlFor="newPassword" content="비밀번호" classN="label_t1"/>
//                     <Input  
//                         id="newPassword" 
//                         type="password" 
//                         required={true} 
//                         placeholder="newPassword" 
//                         classN="input_text_t1"
//                         name="newPassword" 
//                         value={newPassword} 
//                         evt="onChange" 
//                         onChange={handleNewPassword} 
//                     />
//                     <button>view password</button>
//                 </div>
//                 <div>
//                     <Label htmlFor="userPassword" content="비밀번호" classN="label_t1"/>
//                     <Input  
//                         id="userPassword" 
//                         type="password" 
//                         required={true} 
//                         placeholder="password" 
//                         classN="input_text_t1"
//                         name="userPassword" 
//                         value={userPassword} 
//                         evt="onChange" 
//                         onChange={handlePassword} 
//                     />
//                     <button>view password</button>
//                 </div>

//                 <div>
//                     <Label htmlFor="newPasswordCheck" content="비밀번호 체크" classN="label_t1"/>
//                     <Input 
//                         id="newPasswordCheck" 
//                         type="password" 
//                         required={true} 
//                         placeholder="password" 
//                         classN="input_text_t1" 
//                         name="newPasswordCheck" 
//                         value={newPasswordCheck} 
//                         evt="onChange" 
//                         onChange={handleNewPasswordCheck} 
//                     />
//                     <button>view password</button>
//                     {passwordChecked ? (<span>같음!!</span>) : (<span>같지아너!!</span>)}
//                 </div>
//                 <div>
//                     <Label htmlFor="userEmail" content="이메일" classN="label_t1"/>
//                     <Input 
//                         id="userEmail" 
//                         type="email" 
//                         required={true} 
//                         placeholder="userEmail" 
//                         classN="input_text_t1" 
//                         name="userEmail" 
//                         value={userEmail} 
//                         evt="onChange" 
//                         onChange={handleUserEmail} 
//                     />
//                 </div>
               
//                 <div>
//                     <Label htmlFor="userTerms" content="가입 동의?" classN="label_t1"/>
//                     <Input 
//                         id="userTerms" 
//                         type="checkbox"  
//                         classN="input_check_t1"
//                         onChange={handleTerms}
//                         name="hoho"
//                     />
//                     {terms ? (<span>동의허심</span>) : (<span>동의는 필수</span>)}
//                 </div>
//                 <button type="submit" className={submitActive ? 'checked' : 'none'} >회원가입</button>
//             </form>
//         </Fragment>
//     )
// }


// export default UserProfile;