import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './Register.module.scss';
import Button from '~/components/Button';
import Footer from '~/layouts/components/Footer';
import config from '~/config';
import { register } from '~/redux/auth/authActions';

const cx = classNames.bind(styles);

function Register() {
    const { notify } = useSelector((state) => state);

    const dispatch = useDispatch();

    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            fullname: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
                .matches(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/),
            fullname: Yup.string().required(),
            username: Yup.string().required().min(6),
            password: Yup.string().required().min(6),
        }),
        onSubmit: async (values) => {
            await dispatch(register(values));
            values.email = '';
            values.fullname = '';
            values.username = '';
            values.password = '';
        },
    });

    useEffect(() => {
        if (notify.isSucces) {
            dispatch({ type: 'NOTIFY', payload: { isSucces: true } });
        }
    }, [notify.isSucces]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <img
                        className={cx('logo')}
                        src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                    />
                    <h2 className={cx('label')}>Sign up to see photos and videos from your friends.</h2>
                    <div className={cx('btn')}>
                        <Button primary leftIcon={<AiFillFacebook />}>
                            Log in with Facebook
                        </Button>
                    </div>
                    <div className={cx('separate')}>
                        <div></div>
                        <span>OR</span>
                        <div></div>
                    </div>
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <div className={cx('form-group')}>
                            <input
                                value={values.email}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Mobile Number or Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />
                            {errors.email && touched.email && <FaRegTimesCircle className={cx('error')} />}
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                value={values.fullname}
                                type="text"
                                id="fullname"
                                name="fullname"
                                placeholder="Full Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />
                            {errors.fullname && touched.fullname && <FaRegTimesCircle className={cx('error')} />}
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                value={values.username}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />
                            {errors.username && touched.username && <FaRegTimesCircle className={cx('error')} />}
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                value={values.password}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                            />
                            {errors.password && touched.password && <FaRegTimesCircle className={cx('error')} />}
                        </div>
                        <p className={cx('desc')}>
                            People who use our service may have uploaded your contact information to Instagram.
                            <a> Learn More</a>
                            <br />
                            <br />
                            <br />
                            By signing up, you agree to our <a>Tearm</a>, <a> Privacy</a>,<a> Policy</a> and
                            <a> Cookies Policy.</a>
                        </p>
                        <div className={cx('btn')}>
                            {Object.keys(errors).length ? (
                                <Button type="submit" disabled>
                                    Sign up
                                </Button>
                            ) : (
                                <Button type="submit" primary>
                                    Sign up
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
                <div className={cx('center')}>
                    <p>
                        Have an account? <Link to={config.routes.login}>Log in</Link>
                    </p>
                </div>
                <div className={cx('bottom')}>
                    <p>Get the app.</p>
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
            <Footer />
        </div>
    );
}

export default Register;
