import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth/authReducers';
import notify from './notify/notifyReducers';
import profile from './profile/profileReducers';
import posts from './post/postReducers';
import socket from './socket/socketReducers';
import messages from './messages/messagesReducers';
import suggested from './suggested/suggestedReducers';

const rootReducer = combineReducers({
    auth,
    notify,
    profile,
    posts,
    socket,
    messages,
    suggested,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
