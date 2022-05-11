export const ImageIntialState = {
    test: true,
    testa: ['bb'],
    images: [],
}


const ImageReducer = (state = ImageIntialState, action) => {
    switch(action.type) {
        case "TEST_REQUEST": 
            return {
                ...state,
                test: !state.test,
                testa: [...state.testa].concat(action.data)
            }

        case "IMAGE_LOAD_REQUEST": 
            return {
                ...state,
                images: [...state.images].concat(action.data),
            }

        case "IMAGE_UPLOAD_REQUEST": 
            return {
                ...state,
                images: [...state.images].concat(action.data),
                // testa: [...state.testa].concat(action.data)
            }

        default: 
            return {
                ...state
            }
    }
}



export default ImageReducer;