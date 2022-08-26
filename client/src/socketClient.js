import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_TYPES } from './redux/auth/authConstants';
import { MESSAGES_TYPE } from './redux/messages/messagesConstants';
import { POST_TYPES } from './redux/post/postConstants';

function SocketClient() {
    const { auth, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        socket.emit('joinUser', auth.user._id);
    }, [socket, auth.user._id]);

    useEffect(() => {
        socket.on('likeToClient', (newPost) => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        });
        return () => socket.off('likeToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('unLikeToClient', (newPost) => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        });
        return () => socket.off('unLikeToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('createCommentToClient', (newPost) => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        });
        return () => socket.off('createCommentToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('deleteCommentToClient', (newPost) => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        });
        return () => socket.off('deleteCommentToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('followToClient', (newUser) => {
            dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: newUser } });
        });
        return () => socket.off('followToClient');
    }, [socket, dispatch, auth]);

    useEffect(() => {
        socket.on('unFollowToClient', (newUser) => {
            dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: newUser } });
        });
        return () => socket.off('unFollowToClient');
    }, [socket, dispatch, auth]);

    useEffect(() => {
        socket.on('addMessageToClient', (msg) => {
            dispatch({ type: MESSAGES_TYPE.ADD_MESSAGE, payload: msg });
        });
        return () => socket.off('addMessageToClient');
    }, [socket, dispatch, auth]);

    return <></>;
}

export default SocketClient;
