export const UserIntialState = {
    test: ''
}

const UserReducer = (state = UserIntialState, action) => {
    switch(action.type) {
           case "USER_TEST": return {
               ...state,
               test: action.data
           }

           default: return { state }
    }
}

export default UserReducer;