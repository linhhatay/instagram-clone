import axios from 'axios';
import { NOTIFY_TYPES } from '../notify/notifyConstants';
import { MESSAGES_TYPE } from './messagesConstants';

export const addUser =
    ({ user, messages }) =>
    async (dispatch) => {
        if (messages.users.every((item) => item._id !== user._id)) {
            dispatch({ type: MESSAGES_TYPE.ADD_USER, payload: user });
        }
    };

export const addMessage =
    ({ msg, auth, socket }) =>
    async (dispatch) => {
        dispatch({ type: MESSAGES_TYPE.ADD_MESSAGE, payload: msg });
        const { _id, avatar, fullname, username } = auth.user;
        socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } });
        try {
            await axios.post('/api/v1/message/create', msg);
        } catch (error) {
            dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };

export const getConversation =
    ({ auth }) =>
    async (dispatch) => {
        try {
            const res = await axios.post('/api/v1/message/conversation', { user: auth.user._id });
            let newArr = [];
            res.data.conversation.forEach((item) => {
                item.recipients.forEach((cv) => {
                    if (cv._id !== auth.user._id) {
                        newArr.push({ ...cv, text: item.text });
                    }
                });
            });
            dispatch({ type: MESSAGES_TYPE.GET_CONVERSATION, payload: newArr });
        } catch (error) {
            // dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };

export const getMessages =
    ({ auth, id }) =>
    async (dispatch) => {
        try {
            const res = await axios.post(`/api/v1/message/${id}`, { user: auth.user._id });
            dispatch({ type: MESSAGES_TYPE.GET_MESSAGE, payload: res.data });
        } catch (error) {
            // dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { isError: true } });
        }
    };
