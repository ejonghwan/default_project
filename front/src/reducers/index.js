export const intialState = {
    test: true,
}


export const reducer = (state = intialState, action) => {
    switch(action.type) {
        case "TEST_REQUEST": 
            return {
                ...state,
                test: !state.test,
            }

        default: 
            return {
                ...state
            }
    }
}

