import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import io from 'socket.io-client';

import { publicRoutes, privateRoutes } from '~/routes';
import { refreshToken } from './redux/auth/authActions';
import DefaultLayout from '~/layouts';
import config from './config';
import Albums from './pages/Profile/Albums';
import Tagged from './pages/Profile/Tagged';
import Notify from './components/Notify';
import { SOCKET_TYPES } from './redux/socket/socketConstanst';
import SocketClient from './socketClient';

function App() {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        dispatch(refreshToken());
        const socket = io();
        dispatch({ type: SOCKET_TYPES.SOCKET, payload: socket });
        return () => socket.close();
    }, [dispatch]);

    const routes = auth.token ? privateRoutes : publicRoutes;

    return (
        <Router>
            <Notify />
            <div className="App">
                {auth.token && <SocketClient />}
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            >
                                <Route path={config.routes.albums} element={<Albums />} />
                                <Route path={config.routes.tagged} element={<Tagged />} />
                            </Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
