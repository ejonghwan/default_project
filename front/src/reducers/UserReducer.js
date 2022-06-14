export const UserIntialState = {
    error: '',
    user: {},
}

const UserReducer = (state = UserIntialState, action) => {
    switch(action.type) {
           case "USER_LOGIN_SUCCESS": return {
               ...state,
               user: action.data
           }
           case "USER_LOGIN_FAILUE" : return {
                ...state,
                error: action.data
           }

           default: return { state }
    }
}

export default UserReducer;