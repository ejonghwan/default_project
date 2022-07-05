export const UserIntialState = {
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
                user: action.data,
            }
            
            case "USER_SIGNUP_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data
            }

            case "USER_LOAD_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
                user: action.data,
            }
            case "USER_LOAD_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data
            }

            case "USER_LOGIN_SUCCESS": return {
                ...state,
                error: '',
                loading: '',
                user: action.data,
            }
            case "USER_LOGIN_FAILUE" : return {
                ...state,
                loading: '',
                error: action.data
            }

            case "USER_LOGOUT_SUCCESS": return {
                ...state, 
                loading: '',
                user: {},
            }


          

            

            default: return { state }
    }
}

export default UserReducer;