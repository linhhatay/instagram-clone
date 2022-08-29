import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import styles from './Suggested.module.scss';
import Preview from '~/components/Preview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Preview data={data} offset={[34, -8]}>
            <Link to={`/${data.username}`} className={cx('account-item')}>
                <Image className={cx('avatar-suggested')} src={data.avatar} />
                <div className={cx('info-suggested')}>
                    <div className={cx('user-name-suggested')}>{data.username}</div>
                    <div className={cx('name-suggested')}>{data.fullname}</div>
                </div>
            </Link>
        </Preview>
    );
}

export default AccountItem;
