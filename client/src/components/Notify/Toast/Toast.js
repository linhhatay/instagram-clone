import classNames from 'classnames/bind';
import { FaTimes } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

const Toast = ({ title, message, error = false, handleShow }) => {
    const classes = cx('toast', {
        error,
    });

    return (
        <div className={classes}>
            <div className={cx('toast__icon')}>
                <MdNotifications />
            </div>
            <div className={cx('toast__body')}>
                <h3 className={cx('toast__title')}>{title} </h3>
                <p className={cx('toast__msg')}>{message}</p>
            </div>
            <div className={cx('toast__close')} onClick={handleShow}>
                <FaTimes />
            </div>
        </div>
    );
};

export default Toast;
