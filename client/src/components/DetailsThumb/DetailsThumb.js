import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './DetailsThumb.module.scss';
import CommentSystem from '~/components/CommentSystem';
import Image from '~/components/Image';
import Portal from '~/components/Portal';
import Comments, { CommentItem } from '~/components/Comments';
import { likePost, unlikePost } from '~/redux/post/postActions';
import { CommentIcon, HeartIcon, HeartIconActive, InboxIcon, SaveIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function DetailsThumb({ data, setShowDetailsThumb }) {
    const [isLike, setIsLike] = useState(false);
    const dispatch = useDispatch();

    const { auth, socket } = useSelector((state) => state);

    const handleLikePost = async () => {
        if (isLike) {
            await dispatch(unlikePost({ post: data, user: auth.user._id, socket }));
            setIsLike(false);
        } else {
            await dispatch(likePost({ post: data, user: auth.user._id, socket }));
            setIsLike(true);
        }
    };

    useEffect(() => {
        if (data.likes.find((like) => like === auth.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [data.likes, auth.user._id]);

    return (
        <Portal>
            <div
                className={cx('wrapper')}
                onClick={() => {
                    setShowDetailsThumb(false);
                }}
            >
                <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('left')}>
                        <div className={cx('info-left')}>
                            <Image className={cx('avatar')} src={data.author.avatar} />
                            <div className={cx('username')}>{data.author.username}</div>
                        </div>
                        <div className={cx('thumb')}>
                            <img className={cx('image')} src={data.image} alt="" />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('info')}>
                            <Image className={cx('avatar')} src={data.author.avatar} />
                            <div className={cx('username')}>{data.author.username}</div>
                        </div>
                        <div className={cx('post')}>
                            {data.content && (
                                <div className={cx('details')}>
                                    <img className={cx('avatar')} src={data.author.avatar} alt="" />
                                    <span className={cx('author')}>{data.author.username}</span>&nbsp;{' '}
                                    <span className={cx('text')}>{data.content}</span>
                                </div>
                            )}
                            <Comments>
                                {data.comments.map((comment, index) => (
                                    <CommentItem post={data} data={comment} key={index} avatar={true} />
                                ))}
                            </Comments>
                        </div>
                        <div className={cx('actions')}>
                            <div>
                                <button className={cx('action-btn')} onClick={handleLikePost}>
                                    {isLike ? <HeartIconActive /> : <HeartIcon />}
                                </button>
                                <button className={cx('action-btn')}>
                                    <CommentIcon />
                                </button>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </div>
                            <div>
                                <button className={cx('save')}>
                                    <SaveIcon />
                                </button>
                            </div>
                        </div>
                        <span className={cx('likes')}>{data.likes.length} likes</span>

                        <div className={cx('times')}>1 HOURS AGO</div>

                        <CommentSystem data={data} className={cx('comment-system')} />
                    </div>
                </div>
            </div>
        </Portal>
    );
}

export default DetailsThumb;
