export const UserIntialState = {
    error: '',
    loading: '',
    user: {},
}

const UserReducer = (state = UserIntialState, action) => {
    switch(action.type) {
            case "LOADING" : return {
                ...state,
                loading: action.data,
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

            case "USER_LOGOUT": return {
                ...state, 
                loading: '',
                user: {},
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

            

            default: return { state }
    }
}

export default UserReducer;