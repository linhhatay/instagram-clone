import axios from 'axios';

export const register = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTIFY', payload: { isLoading: true } });
        await axios.post('/api/v1/auth/register', data);
        dispatch({ type: 'NOTIFY', payload: { isSucces: true } });
    } catch (error) {
        dispatch({ type: 'NOTIFY', payload: { isError: true } });
    }
};

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTIFY', payload: { isLoading: true } });
        const res = await axios.post('/api/v1/auth/login', data);
        dispatch({ type: 'AUTH', payload: { token: res.data.access_token, user: res.data.user } });
        localStorage.setItem('firstLogin', true);
        dispatch({ type: 'NOTIFY', payload: {} });
    } catch (error) {
        dispatch({ type: 'NOTIFY', payload: { isError: true } });
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: 'NOTIFY', payload: { isLoading: true } });
        await axios.post('/api/v1/auth/logout');
        dispatch({ type: 'AUTH', payload: {} });
        localStorage.removeItem('firstLogin');
        dispatch({ type: 'NOTIFY', payload: {} });
    } catch (error) {
        dispatch({ type: 'NOTIFY', payload: {} });
    }
};

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
        dispatch({ type: 'NOTIFY', payload: { isLoading: true } });
        try {
            const res = await axios.post('/api/v1/auth/refresh_token');
            dispatch({ type: 'AUTH', payload: { token: res.data.access_token, user: res.data.user } });
            dispatch({ type: 'NOTIFY', payload: {} });
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { isError: true } });
            dispatch({ type: 'NOTIFY', payload: {} });
        }
    }
};
