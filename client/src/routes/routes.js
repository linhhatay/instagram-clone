import Explore from '~/pages/Explore';
import Home from '~/pages/Home';
import Messages from '~/pages/Messages';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import Settings from '~/pages/Settings';
import Login from '~/pages/Login';

import config from '~/config';

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.messages, component: Messages },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.settings, component: Settings },
];

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

export { publicRoutes, privateRoutes };
