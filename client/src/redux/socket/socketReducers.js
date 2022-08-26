import { SOCKET_TYPES } from './socketConstanst';

const socketReducer = (state = [], action) => {
    switch (action.type) {
        case SOCKET_TYPES.SOCKET:
            return action.payload;
        default:
            return state;
    }
};

export default socketReducer;
