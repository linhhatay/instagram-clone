import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '~/components/Button';
import Image from '~/components/Image';
import config from '~/config';
import Footer from '~/layouts/components/Footer';
import styles from './Profile.module.scss';
import FollowButton from './FollowButton';
import { getProfileUsers } from '~/redux/profile/profileActions';

const cx = classNames.bind(styles);

function Profile() {
    const { auth, profile } = useSelector((state) => state);

    const { username } = useParams();

    const [isActive, setIsActive] = useState(true);
    const [userData, setUserData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const handler = async () => {
            await dispatch(getProfileUsers({ users: profile.users, username, auth }));
            const newData = profile.users.filter((user) => user.username === username);
            setUserData(newData);
        };
        handler();
    }, [username, auth, dispatch, profile.users]);

    return (
        <div className={cx('wrapper')}>
            {userData.map((item, index) => (
                <div className={cx('container')} key={index}>
                    <header className={cx('header')}>
                        <div className={cx('avatar')}>
                            <Image src={item.avatar} alt="avatar" />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('actions')}>
                                <h2 className={cx('username')}>{item.username}</h2>
                                {item._id === auth.user._id ? (
                                    <Button to={config.routes.settings} className={cx('edit')} outline>
                                        Edit profile
                                    </Button>
                                ) : (
                                    <FollowButton user={item} />
                                )}
                                {item._id === auth.user._id ? (
                                    <button className={cx('setting')}>
                                        <svg
                                            aria-label="Options"
                                            color="#262626"
                                            fill="#262626"
                                            height="24"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="8.635"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></circle>
                                            <path
                                                d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                        </svg>
                                    </button>
                                ) : (
                                    <button className={cx('options')}>
                                        <BiDotsHorizontalRounded />
                                    </button>
                                )}
                            </div>
                            <div className={cx('desc')}>
                                <div className={cx('follow')}>
                                    <div className={cx('posts')}>
                                        <span className={cx('count')}>{item.posts.length}</span> posts
                                    </div>
                                    <div className={cx('follower')}>
                                        <span className={cx('count')}>{item.followers.length}</span> followers
                                    </div>
                                    <div className={cx('following')}>
                                        <span className={cx('count')}>{item.following.length}</span> following
                                    </div>
                                </div>
                                <div className={cx('bio')}>
                                    <span>{item.fullname}</span>
                                    <div>{item.bio}</div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className={cx('tab-list')}>
                        <Button
                            className={cx([''], isActive && 'active')}
                            to={config.routes.albums}
                            leftIcon={
                                <svg
                                    aria-label=""
                                    fill="currentColor"
                                    height="12"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="12"
                                >
                                    <rect
                                        fill="none"
                                        height="18"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        width="18"
                                        x="3"
                                        y="3"
                                    ></rect>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="9.015"
                                        x2="9.015"
                                        y1="3"
                                        y2="21"
                                    ></line>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="14.985"
                                        x2="14.985"
                                        y1="3"
                                        y2="21"
                                    ></line>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="21"
                                        x2="3"
                                        y1="9.015"
                                        y2="9.015"
                                    ></line>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="21"
                                        x2="3"
                                        y1="14.985"
                                        y2="14.985"
                                    ></line>
                                </svg>
                            }
                            onClick={() => setIsActive(true)}
                        >
                            POSTS
                        </Button>
                        <Button
                            className={cx(['tagged', !isActive && 'active'])}
                            to={config.routes.tagged}
                            leftIcon={
                                <svg
                                    aria-label=""
                                    color="#8e8e8e"
                                    fill="#8e8e8e"
                                    height="12"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="12"
                                >
                                    <path
                                        d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></path>
                                    <path
                                        d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></path>
                                    <circle
                                        cx="12.072"
                                        cy="11.075"
                                        fill="none"
                                        r="3.556"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    ></circle>
                                </svg>
                            }
                            onClick={() => setIsActive(false)}
                        >
                            TAGGED
                        </Button>
                    </div>
                    <Outlet context={item} />
                    <Footer />
                </div>
            ))}
        </div>
    );
}

export default Profile;
