import { POST_TYPES } from './postConstants';

const initialState = {
    data: [],
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                data: [action.payload, ...state.data],
            };
        case POST_TYPES.GET_POSTS:
            return {
                ...state,
                data: action.payload,
            };
        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                data: state.data.map((item) => (item._id === action.payload._id ? action.payload : item)),
            };
        case POST_TYPES.DELETE_POST:
            return {
                ...state,
                data: state.data.filter((item) => item._id !== action.payload),
            };
        default:
            return state;
    }
};

export default postReducer;
