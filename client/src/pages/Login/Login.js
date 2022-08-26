import classNames from 'classnames/bind';
import { AiFillFacebook } from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Login.module.scss';
import Button from '~/components/Button';
import Footer from '~/layouts/components/Footer';
import config from '~/config';
import { login } from '~/redux/auth/authActions';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { notify } = useSelector((state) => state);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
        };
        dispatch(login(user));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('banner')}>
                    <img src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" />
                    <div className={cx('image')}>
                        <img src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png" />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('top')}>
                        <img
                            className={cx('logo')}
                            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                        />
                        <form className={cx('form')} onSubmit={handleLogin}>
                            <div className={cx('form-group')}>
                                <input
                                    type="text"
                                    placeholder="Phone number, username, or email"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={cx('btn')}>
                                {username && password.length >= 6 ? (
                                    <Button type="submit" primary className={cx('login-btn')}>
                                        {notify.isLoading ? <FiLoader className={cx('loading')} /> : 'Log in'}
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled className={cx('login-btn')}>
                                        {notify.isLoading ? <FiLoader className={cx('loading')} /> : 'Log in'}
                                    </Button>
                                )}
                            </div>
                        </form>
                        <div className={cx('separate')}>
                            <div></div>
                            <span>OR</span>
                            <div></div>
                        </div>
                        <div className={cx('social')}>
                            <Button leftIcon={<AiFillFacebook />}>Log in with Facebook</Button>
                        </div>
                        <span className={cx('message-error')}>
                            {notify.isError && 'Sorry, your password was incorrect. Please double-check your password.'}
                        </span>

                        <a className={cx('forgot')}>Forgot password?</a>
                    </div>
                    <div className={cx('center')}>
                        <div className={cx('register')}>
                            Don't have an account? <Link to={config.routes.register}>Sign up</Link>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <p>Get the app</p>
                        <div className={cx('apps')}>
                            <a>
                                <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" />
                            </a>
                            <a>
                                <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
