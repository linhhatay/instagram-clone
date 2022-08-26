import classNames from 'classnames/bind';
import styles from './Story.module.scss';

const cx = classNames.bind(styles);

function Story({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Story;
