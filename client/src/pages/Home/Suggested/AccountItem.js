import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Image from '~/components/Image';
import styles from './Suggested.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import FollowButton from '~/pages/Profile/FollowButton';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <div>
            <Tippy
                interactive
                placement="bottom"
                offset={[34, -8]}
                delay={[600, 0]}
                render={(attrs) => (
                    <div className={cx('content')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('preview')}>
                                <div className={cx('preview-header')}>
                                    <Image className={cx('preview-avatar')} src={data.avatar} />
                                    <div className={cx('preview-info')}>
                                        <div className={cx('preview-username')}>{data.username}</div>
                                        <div className={cx('preview-fullname')}>{data.fullname}</div>
                                    </div>
                                </div>
                                <div className={cx('preview-body')}>
                                    <div className={cx('analytics')}>
                                        <div className={cx('posts-count')}>
                                            <span>{data.posts.length}</span> posts
                                        </div>
                                        <div className={cx('followers-count')}>
                                            <span>{data.followers.length}</span> followers
                                        </div>
                                        <div className={cx('following-count')}>
                                            <span>{data.following.length}</span> following
                                        </div>
                                    </div>
                                    <div className={cx('album')}>
                                        {data.posts.map((item) => (
                                            <div key={item._id}>
                                                <Image className={cx('image-preview')} src={item.image} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cx('follow-btn')}>
                                        <FollowButton user={data} />
                                    </div>
                                </div>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                <Link to={`/${data.username}`} className={cx('account-item')}>
                    <Image className={cx('avatar-suggested')} src={data.avatar} />
                    <div className={cx('info-suggested')}>
                        <div className={cx('user-name-suggested')}>{data.username}</div>
                        <div className={cx('name-suggested')}>{data.fullname}</div>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}

export default AccountItem;
