import { NOTIFY_TYPES } from './notifyConstants';

const initialState = {};

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.NOTIFY:
            return action.payload;
        default:
            return state;
    }
};

export default notifyReducer;
