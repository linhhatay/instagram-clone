import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import AccountItem from '~/components/AccountItem';
import Footer from '~/layouts/components/Footer';
import FollowButton from '../Profile/FollowButton';
import styles from './People.module.scss';

import Preview from '~/components/Preview';

const cx = classNames.bind(styles);

function People() {
    const { suggested } = useSelector((state) => state);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('label')}>Suggested</h3>
                <div className={cx('content')}>
                    {suggested.data.map((account, index) => (
                        <div className={cx('account-item')} key={index}>
                            <Preview data={account} offset={[110, 0]}>
                                <AccountItem data={account} className={cx('info')} />
                            </Preview>
                            <FollowButton user={account} className={cx('follow')} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default People;
