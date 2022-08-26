import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '../Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/${data.username}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} />
            <div className={cx('info')}>
                <div className={cx('username')}>{data.username}</div>
                <div className={cx('name')}>{data.fullname}</div>
            </div>
        </Link>
    );
}

export default AccountItem;
