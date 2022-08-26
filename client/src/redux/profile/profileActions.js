import axios from 'axios';

import { PROFILE_TYPES } from './profileConstants';
import { NOTIFY_TYPES } from '../notify/notifyConstants';
import { AUTH_TYPES } from '../auth/authConstants';

export const getProfileUsers =
    ({ users, username, auth }) =>
    async (dispatch) => {
        if (users.every((user) => user.username !== username)) {
            try {
                dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
                const res = await axios.get(`/api/v1/users/${username}`);
                dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
                dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
            } catch (err) {
                dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
            }
        }
    };

export const updateProfileUser =
    ({ data, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
            await axios.patch(`/api/v1/users/edit`, data);
            dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: { ...auth.user, ...data } } });

            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
        } catch (error) {}
    };

export const follow =
    ({ users, user, auth, socket }) =>
    async (dispatch) => {
        let newUser = { ...user, followers: [...user.followers, auth.user] };
        dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

        dispatch({
            type: AUTH_TYPES.AUTH,
            payload: { ...auth, user: { ...auth.user, following: [...auth.user.following, newUser] } },
        });

        try {
            const res = await axios.patch(`/api/v1/users/${user._id}/follow`, {
                user: auth.user,
            });
            socket.emit('follow', res.data.newUser);
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };

export const unfollow =
    ({ users, user, auth, socket }) =>
    async (dispatch) => {
        let newUser = { ...user, followers: user.followers.filter((item) => item._id !== auth.user._id) };
        dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });
        dispatch({
            type: AUTH_TYPES.AUTH,
            payload: {
                ...auth,
                user: { ...auth.user, following: auth.user.following.filter((item) => item._id !== newUser._id) },
            },
        });

        try {
            const res = await axios.patch(`/api/v1/users/${user._id}/unfollow`, {
                user: auth.user,
            });
            socket.emit('unFollow', res.data.newUser);
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };
