import classNames from 'classnames/bind';
import styles from './Preview.module.scss';
import Tippy from '@tippyjs/react/headless';

import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import FollowButton from '~/pages/Profile/FollowButton';

const cx = classNames.bind(styles);

function Preview({ data, children, offset = [] }) {
    return (
        <div>
            <Tippy
                interactive
                placement="bottom"
                offset={offset}
                delay={[600, 0]}
                render={(attrs) => (
                    <div className={cx('content')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('preview')}>
                                <div className={cx('header')}>
                                    <Image className={cx('avatar')} src={data.avatar} />
                                    <div className={cx('info')}>
                                        <div className={cx('username')}>{data.username}</div>
                                        <div className={cx('fullname')}>{data.fullname}</div>
                                    </div>
                                </div>
                                <div className={cx('body')}>
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
                <div>{children}</div>
            </Tippy>
        </div>
    );
}

export default Preview;
