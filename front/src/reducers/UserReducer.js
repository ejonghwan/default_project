export const UserIntialState = {
    isLogged: false,
    error: '',
    loading: '',
    user: {},
}


const UserReducer = (state = UserIntialState, action) => {
    switch(action.type) {
            case "LOADING" : return {
                ...state,
                loading: action.loadingMessage,
            }

            
            case "USER_SIGNUP_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
            }

            case "USER_SIGNUP_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data,
            }


            case "USER_LOAD_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
                user: action.data,
                isLogged: true,
            }
            case "USER_LOAD_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data,
                isLogged: false,
            }


            case "USER_LOGIN_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
                user: action.data,
                isLogged: true,
            }
            case "USER_LOGIN_FAILUE" : return {
                ...state,
                loading: '',
                isLogged: false,
                error: action.data,
            }


            case "USER_LOGOUT_SUCCESS": return {
                ...state, 
                loading: '',
                user: {},
                isLogged: false,
            }


            case "USER_USER_INFO_EDIT_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
                user: {
                    ...state.user,
                    name: action.data.name,
                    gender: action.data.gender,
                    birthday: action.data.birthday,
                    phoneNumber: action.data.phoneNumber,
                }
            }
            case "USER_USER_INFO_EDIT_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data,
            }


            case "USER_MAIL_EDIT_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
                user: {
                    ...state.user,
                    email: action.data.email,
                }
            }
            case "USER_MAIL_EDIT_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data,
            }
          

            case "USER_PASSWORD_EDIT_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
            }
            case "USER_PASSWORD_EDIT_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data,
            }

            

            default: return { state }
    }
}

export default UserReducer;