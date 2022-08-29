import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

import Image from '~/components/Image';
import styles from './Post.module.scss';
import { CommentIcon, HeartIcon, HeartIconActive, InboxIcon, SaveIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, unlikePost } from '~/redux/post/postActions';
import Modal from '~/components/Modal';
import Comments, { CommentItem } from '~/components/Comments';
import CommentSystem from '~/components/CommentSystem';

const cx = classNames.bind(styles);

function PostItem({ data }) {
    const [isModal, setIsModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [loadMore, setLoadMore] = useState(4);
    const [isMore, setIsMore] = useState(true);

    const { auth, socket } = useSelector((state) => state);

    const dispatch = useDispatch();

    const handleRemovePost = (id) => {
        dispatch(deletePost(id));
    };

    const handleEditPost = (data) => {
        if (auth.user._id === data.author._id) {
            setIsEdit(true);
            setIsModal(true);
        } else {
            alert('Bạn không phải người đăng bài, không thể chỉnh sửa bài viết này');
        }
    };

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
        <div className={cx('post-item')}>
            {isModal && <Modal isEdit={isEdit} data={data} setIsModal={setIsModal} />}

            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Image className={cx('avatar')} src={data.author.avatar} />
                    <div className={cx('desc')}>
                        <Link to={data.author.username} className={cx('user-name')}>
                            {data.author.username}
                        </Link>
                        <div className={cx('location')}>{data.location}</div>
                    </div>
                </div>
                <Tippy
                    trigger="click"
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('content')} tabIndex="-1" {...attrs}>
                            <div className={cx('menu-options')}>
                                <div onClick={() => handleEditPost(data)}>Chỉnh sửa</div>
                                <div onClick={() => handleRemovePost(data._id)}>Xóa</div>
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('options')}>
                        <BiDotsHorizontalRounded className={cx('btn-actions')} />
                    </div>
                </Tippy>
            </div>
            <div className={cx('content')}>
                <Image className={cx('image')} src={data.image} />
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
                <div className={cx('post')}>
                    <span className={cx('likes')}>{data.likes.length} likes</span>
                    {data.content && (
                        <div className={cx('details')}>
                            <span className={cx('author')}>{data.author?.username}</span>&nbsp;{' '}
                            <span className={cx('text')}>{data.content}</span>
                        </div>
                    )}
                    {data.comments.length > 4 && isMore && (
                        <button
                            className={cx('load-more')}
                            onClick={() => {
                                setLoadMore(data.comments.length);
                                setIsMore(false);
                            }}
                        >
                            View All <span>{data.comments.length - 4} </span> comments
                        </button>
                    )}
                    <Comments>
                        {data.comments.slice(0, loadMore).map((comment, index) => (
                            <CommentItem post={data} data={comment} key={index} />
                        ))}
                    </Comments>
                    <div className={cx('times')}>1 HOURS AGO</div>
                </div>
                <CommentSystem data={data} />
            </div>
        </div>
    );
}

export default PostItem;
