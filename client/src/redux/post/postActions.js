import axios from 'axios';
import { NOTIFY_TYPES } from '../notify/notifyConstants';
import { POST_TYPES } from './postConstants';

export const createPost =
    ({ data, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
            const res = await axios.post('/api/v1/post/create', data);
            dispatch({ type: POST_TYPES.CREATE_POST, payload: { ...res.data.newPost, author: auth.user } });
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
        const res = await axios.get('/api/v1/post');
        dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
    } catch (error) {
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
    }
};

export const updatePost =
    ({ idPost, data }) =>
    async (dispatch) => {
        try {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
            const res = await axios.patch(`/api/v1/post/update/${idPost}`, data);
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data });
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };

export const deletePost = (idPost) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
        await axios.delete(`/api/v1/post/delete/${idPost}`);
        dispatch({ type: POST_TYPES.DELETE_POST, payload: idPost });
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
    } catch (error) {
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
    }
};

export const likePost =
    ({ post, user, socket }) =>
    async (dispatch) => {
        const newPost = { ...post, likes: [...post.likes, user] };
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        socket.emit('likePost', newPost);
        try {
            // dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
            await axios.patch(`/api/v1/post/like/${post._id}`, { user: user });
            // dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };

export const unlikePost =
    ({ post, user, socket }) =>
    async (dispatch) => {
        const newPost = { ...post, likes: post.likes.filter((item) => item !== user) };
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        socket.emit('unLikePost', newPost);

        try {
            // dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isLoading: true } });
            await axios.patch(`/api/v1/post/unlike/${post._id}`, { user: user });
            // dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };
