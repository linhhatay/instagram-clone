import classNames from 'classnames/bind';
import { BiUserCircle } from 'react-icons/bi';
import { FiBookmark } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineChangeCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import config from '~/config';
import Modal from '~/components/Modal';
import styles from './Header.module.scss';
import Portal from '~/components/Portal';
import { ExploreIcon, HeartIcon, HomeIcon, InboxIcon, PostIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    const [isModal, setIsModal] = useState(false);
    const { auth } = useSelector((state) => state);
    const [avatar, setAvatar] = useState(auth.user.avatar);

    const MENU_ITEMS = [
        {
            icon: <BiUserCircle />,
            title: 'Profile',
            to: `/${auth.user.username}`,
        },
        {
            icon: <FiBookmark />,
            title: 'Saved',
        },
        {
            icon: <IoSettingsOutline />,
            title: 'Settings',
            to: '/settings',
        },
        {
            icon: <MdOutlineChangeCircle />,
            title: 'Switch account',
        },
        {
            title: 'Log Out',
            action: true,
        },
    ];

    const handleOpenModal = () => {
        setIsModal(true);
    };

    useEffect(() => {
        setAvatar(auth.user.avatar);
    }, [auth.user.avatar]);

    return (
        <header className={cx('wrapper')}>
            {isModal && (
                <Portal>
                    <Modal setIsModal={setIsModal} />
                </Portal>
            )}

            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('back')}>
                    <img
                        onClick={() => window.scrollTo(0, 0)}
                        className={cx('logo')}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
                        alt="Instagram"
                    />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    <Button className={cx('btn')} to={config.routes.home} leftIcon={<HomeIcon />}></Button>
                    <Button className={cx('btn')} to={config.routes.messages} leftIcon={<InboxIcon />}></Button>
                    <Button className={cx('btn')} leftIcon={<PostIcon />} onClick={handleOpenModal}></Button>
                    <Button className={cx('btn')} to={config.routes.explore} leftIcon={<ExploreIcon />}></Button>
                    <Button className={cx('btn')} leftIcon={<HeartIcon />}></Button>
                    <Menu items={MENU_ITEMS}>
                        <button className={cx('user')}>
                            <Image className={cx('avatar')} src={avatar} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
