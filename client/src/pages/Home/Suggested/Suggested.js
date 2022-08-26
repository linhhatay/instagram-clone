import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import AccountItem from './AccountItem';
import styles from './Suggested.module.scss';
import { logout } from '~/redux/auth/authActions';

const cx = classNames.bind(styles);

function Suggested() {
    const { auth } = useSelector((state) => state);
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();

    const handleSwitchAccount = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(logout());
    };

    useEffect(() => {
        async function getSuggestedAccount() {
            const res = await axios.get('/api/v1/users');
            const data = res.data.filter((item) => item._id !== auth.user._id);
            setSuggestions(data);
        }
        getSuggestedAccount();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Link to={auth.user.username} className={cx('account')}>
                <Image className={cx('avatar')} src={auth.user.avatar} />
                <div className={cx('info')}>
                    <div className={cx('user-name')}>{auth.user.username}</div>
                    <h4 className={cx('name')}>{auth.user.fullname}</h4>
                </div>
                <button className={cx('switch')} onClick={(e) => handleSwitchAccount(e)}>
                    Switch
                </button>
            </Link>
            <div className={cx('suggestions')}>
                <div className={cx('label')}>
                    <h4 className={cx('title')}>Suggestions For You</h4>
                    <button>See All</button>
                </div>
                {suggestions.slice(0, 5).map((item) => (
                    <AccountItem data={item} key={item._id} />
                ))}
            </div>
            <footer className={cx('footer')}>
                <nav className={cx('link')}>
                    <ul>
                        <li>About</li>
                        <li>Help</li>
                        <li>Press</li>
                        <li>API</li>
                        <li>Jobs</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                        <li>Locations</li>
                        <li>Language</li>
                    </ul>
                </nav>
                <span>© 2022 INSTAGRAM FROM META</span>
            </footer>
        </div>
    );
}

export default Suggested;
