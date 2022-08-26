import classNames from 'classnames/bind';
import styles from './Comments.module.scss';

const cx = classNames.bind(styles);

function Comments({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Comments;
