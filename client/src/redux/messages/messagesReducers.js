import { MESSAGES_TYPE } from './messagesConstants';

const initialState = {
    users: [],
    data: [],
    firstLoad: false,
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGES_TYPE.ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users],
            };
        case MESSAGES_TYPE.ADD_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map((user) =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? { ...user, text: action.payload.text }
                        : user,
                ),
            };
        case MESSAGES_TYPE.GET_CONVERSATION:
            return {
                ...state,
                users: action.payload,
                firstLoad: true,
            };
        case MESSAGES_TYPE.GET_MESSAGE:
            return {
                ...state,
                data: action.payload.messages.reverse(),
            };
        default:
            return state;
    }
};

export default messagesReducer;
