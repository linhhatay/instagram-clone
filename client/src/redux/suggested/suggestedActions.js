import axios from 'axios';

import { SUGGESTED_TYPES } from './suggestedConstants';
import { NOTIFY_TYPES } from '../notify/notifyConstants';

export const getSuggestedAccount = () => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
        const res = await axios.get('/api/v1/users');
        dispatch({ type: SUGGESTED_TYPES.GET_ACCOUNT_SUGGESTED, payload: res.data });
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
    } catch (error) {
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
    }
};
