import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Settings.module.scss';
import Footer from '~/layouts/components/Footer';
import { updateProfileUser } from '~/redux/profile/profileActions';

const cx = classNames.bind(styles);

function Settings() {
    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const data = { id: auth.user._id, avatar, fullname, username, bio, gender, email };
        dispatch(updateProfileUser({ data, auth }));
    };

    const handleGetAvatar = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'hpeidups');

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dvfwekbrc/image/upload', formData);
            setAvatar(res.data.secure_url);
        } catch (error) {
            console.log('Có lỗi', error);
        }
    };

    useEffect(() => {
        setAvatar(auth.user.avatar);
        setFullname(auth.user.fullname);
        setUsername(auth.user.username);
        setBio(auth.user.bio);
        setGender(auth.user.gender);
        setEmail(auth.user.email);
    }, [auth.user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ul className={cx('sidebar')}>
                    <li className={cx('active')}>Edit profile</li>
                    <li>Change password</li>
                    <li>Apps and websites</li>
                    <li>Email notifications</li>
                    <li>Push notifications</li>
                    <li>Manage contact</li>
                    <li>Privacy and security</li>
                    <li>Ads</li>
                    <li>Login activity</li>
                    <li>Email from Instagram</li>
                    <li>Help</li>
                    <li>Digital collectibles</li>
                    <button>Switch to professional account</button>

                    <div className={cx('label')}>
                        <svg
                            aria-label="Facebook wordmark and family of apps logo"
                            height="12"
                            viewBox="0 0 500 100"
                            width="60"
                        >
                            <defs>
                                <linearGradient
                                    gradientUnits="userSpaceOnUse"
                                    id="b"
                                    x1="125"
                                    x2="160.217"
                                    y1="97"
                                    y2="57.435"
                                >
                                    <stop offset=".21" stopColor="#0278F1"></stop>
                                    <stop offset=".533" stopColor="#0180FA"></stop>
                                </linearGradient>
                                <linearGradient gradientUnits="userSpaceOnUse" id="c" x1="44" x2="0" y1="5" y2="64">
                                    <stop offset=".427" stopColor="#0165E0"></stop>
                                    <stop offset=".917" stopColor="#0180FA"></stop>
                                </linearGradient>
                                <linearGradient
                                    gradientUnits="userSpaceOnUse"
                                    id="d"
                                    x1="28.5"
                                    x2="135"
                                    y1="29"
                                    y2="72"
                                >
                                    <stop stopColor="#0064E0"></stop>
                                    <stop offset=".656" stopColor="#0066E2"></stop>
                                    <stop offset="1" stopColor="#0278F1"></stop>
                                </linearGradient>
                                <clipPath id="a">
                                    <path d="M0 0h496.236v100H0z" fill="#fff"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path
                                    d="M182.141 3.213h18.808l31.98 57.849 31.979-57.849h18.401V98.27h-15.345V25.416l-28.042 50.448h-14.394l-28.042-50.448V98.27h-15.345V3.213ZM332.804 99.967c-7.107 0-13.353-1.573-18.739-4.718-5.387-3.146-9.586-7.504-12.595-13.07-3.011-5.569-4.515-11.95-4.515-19.148 0-7.287 1.47-13.738 4.413-19.35 2.942-5.613 7.027-10.004 12.255-13.173 5.229-3.168 11.238-4.753 18.027-4.753 6.744 0 12.55 1.596 17.416 4.787 4.865 3.191 8.611 7.661 11.237 13.41 2.624 5.749 3.938 12.492 3.938 20.233v4.21h-52.077c.95 5.794 3.292 10.354 7.027 13.68 3.735 3.328 8.453 4.991 14.157 4.991 4.571 0 8.509-.679 11.814-2.037 3.303-1.358 6.404-3.417 9.302-6.178l8.147 9.98c-8.103 7.425-18.038 11.136-29.807 11.136Zm11.204-56.389c-3.215-3.281-7.425-4.923-12.629-4.923-5.07 0-9.314 1.676-12.731 5.025-3.418 3.35-5.58 7.854-6.484 13.512h37.343c-.453-5.794-2.286-10.331-5.499-13.614ZM382.846 40.014h-14.123V27.453h14.123V6.676h14.802v20.777h21.455v12.561h-21.455v31.844c0 5.295.905 9.075 2.716 11.338 1.809 2.264 4.911 3.395 9.302 3.395 1.945 0 3.598-.078 4.956-.237a92.35 92.35 0 0 0 4.481-.646v12.425c-1.675.498-3.564.906-5.669 1.223a44.63 44.63 0 0 1-6.62.475c-15.979 0-23.968-8.735-23.968-26.208V40.014ZM496.236 98.27h-14.53v-9.913c-2.58 3.712-5.862 6.575-9.845 8.588-3.983 2.014-8.51 3.022-13.579 3.022-6.247 0-11.78-1.596-16.601-4.787s-8.612-7.581-11.373-13.172c-2.761-5.59-4.142-11.983-4.142-19.18 0-7.243 1.403-13.648 4.21-19.216 2.806-5.567 6.688-9.935 11.645-13.104 4.956-3.168 10.648-4.753 17.075-4.753 4.844 0 9.189.94 13.037 2.818a25.768 25.768 0 0 1 9.573 7.978v-9.098h14.53V98.27Zm-14.801-46.035c-1.585-4.028-4.085-7.207-7.503-9.54-3.418-2.33-7.367-3.496-11.848-3.496-6.338 0-11.384 2.128-15.141 6.382-3.758 4.255-5.635 10.004-5.635 17.246 0 7.289 1.809 13.06 5.431 17.314 3.621 4.255 8.532 6.382 14.734 6.382 4.571 0 8.645-1.176 12.222-3.53 3.575-2.353 6.155-5.522 7.74-9.506V52.235Z"
                                    fill="#262626"
                                ></path>
                                <path
                                    d="M108 0C95.66 0 86.015 9.294 77.284 21.1 65.284 5.821 55.25 0 43.24 0 18.76 0 0 31.862 0 65.586 0 86.69 10.21 100 27.31 100c12.308 0 21.16-5.803 36.897-33.31 0 0 6.56-11.584 11.072-19.564 1.582 2.553 3.243 5.3 4.997 8.253l7.38 12.414C102.03 91.848 110.038 100 124.551 100c16.659 0 25.931-13.492 25.931-35.034C150.483 29.656 131.301 0 108 0ZM52.207 59.241c-12.759 20-17.172 24.483-24.276 24.483-7.31 0-11.655-6.418-11.655-17.862 0-24.483 12.207-49.517 26.759-49.517 7.88 0 14.465 4.55 24.552 18.991-9.578 14.691-15.38 23.905-15.38 23.905Zm48.153-2.517-8.823-14.715a301.425 301.425 0 0 0-6.884-10.723c7.952-12.274 14.511-18.39 22.313-18.39 16.206 0 29.172 23.863 29.172 53.173 0 11.172-3.659 17.655-11.241 17.655-7.268 0-10.739-4.8-24.537-27Z"
                                    fill="#0180FA"
                                ></path>
                                <path
                                    d="M145.586 35H130.66c3.452 8.746 5.478 19.482 5.478 31.069 0 11.172-3.659 17.655-11.241 17.655-1.407 0-2.672-.18-3.897-.631V99.82c1.143.122 2.324.18 3.552.18 16.659 0 25.931-13.492 25.931-35.034 0-10.737-1.774-20.95-4.897-29.966Z"
                                    fill="url(#b)"
                                ></path>
                                <path
                                    d="M43.241 0c.254 0 .507.003.759.008v16.36c-.32-.015-.642-.023-.965-.023-14.183 0-26.139 23.782-26.736 47.655H.014C.59 30.87 19.143 0 43.24 0Z"
                                    fill="url(#c)"
                                ></path>
                                <path
                                    d="M43.241 0c11.152 0 20.601 5.02 31.502 17.971 3.065 3.828 6.761 8.805 10.716 14.557l.017.025.025-.003a311.041 311.041 0 0 1 6.036 9.459l8.823 14.715c13.798 22.2 17.269 27 24.537 27H125v16.273c-.149.002-.298.003-.448.003-14.513 0-22.522-8.152-36.897-32.207l-7.38-12.414a596.368 596.368 0 0 0-2.294-3.834L78 51.5c-5.5-9-9-14.5-12-18.5l-.05.038c-9.18-12.63-15.47-16.693-22.916-16.693H43V0L43.241 0Z"
                                    fill="url(#d)"
                                ></path>
                            </g>
                        </svg>
                        <span>Accounts Center</span>
                        <p>
                            Control settings for connected experiences across Instagram, the Facebook app and Messenger,
                            including story and post sharing and logging in.
                        </p>
                    </div>
                </ul>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <Image className={cx('avatar')} src={auth.user.avatar} />
                        <div>
                            <h1>{auth.user.username}</h1>
                            <button className={cx('choose-avatar')}>
                                <input spellCheck={false} type="file" accept=".jpg, .png" onChange={handleGetAvatar} />
                                Change profile photo
                            </button>
                        </div>
                    </div>
                    <form className={cx('form')}>
                        <div className={cx('form-group')}>
                            <label>Name</label>
                            <div className={cx('value')}>
                                <input
                                    spellCheck={false}
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                                <p className={cx('desc')}>
                                    You are using the same name on Instagram and Facebook. Go to Facebook to change your
                                    name.
                                </p>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Username</label>
                            <div className={cx('value')}>
                                <input
                                    spellCheck={false}
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <p className={cx('desc')}>
                                    In most cases, you'll be able to change your username back to lih_hatay24 for
                                    another 14 days.
                                </p>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Website</label>
                            <div className={cx('value')}>
                                <input spellCheck={false} type="text" placeholder="Website" />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Bio</label>
                            <div className={cx('value')}>
                                <textarea
                                    wrap="hard"
                                    type="text"
                                    spellCheck={false}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label></label>
                            <div className={cx('value')}>
                                <h2>Personal information</h2>
                                <span>
                                    Provide your personal information, even if the account is used for a business, a pet
                                    or something else. This won't be a part of your public profile.
                                </span>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Email</label>
                            <div className={cx('value')}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Gender</label>
                            <div className={cx('value')}>
                                <input
                                    spellCheck={false}
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Similar account suggestions</label>
                            <div className={cx('suggestions')}>
                                <input spellCheck={false} className={cx('checked')} type="checkbox" />
                                <p>
                                    Include your account when recommending similar accounts people might want to follow.
                                </p>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label></label>
                            <Button type="submit" onClick={handleUpdateProfile} className={cx('btn-submit')} primary>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;
