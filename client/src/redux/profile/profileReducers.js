import { PROFILE_TYPES } from './profileConstants';

const initialState = {
    isLoading: false,
    users: [],
    posts: [],
};

const profileReducers = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [action.payload.user],
            };
        case PROFILE_TYPES.FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
            };
        case PROFILE_TYPES.UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
            };
        default:
            return state;
    }
};

export default profileReducers;
