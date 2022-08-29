import { SUGGESTED_TYPES } from './suggestedConstants';

const initialState = {
    data: [],
};

const suggestedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUGGESTED_TYPES.GET_ACCOUNT_SUGGESTED:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default suggestedReducer;
