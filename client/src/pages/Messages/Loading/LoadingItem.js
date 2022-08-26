import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function LoadingItem() {
    return (
        <div className={cx('loading-item')}>
            <div className={cx('photo')}></div>
            <div className={cx('message')}>
                <div className={cx('username')}></div>
                <div className={cx('name')}></div>
            </div>
        </div>
    );
}

export default LoadingItem;
