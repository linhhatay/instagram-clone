import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Loading;
