import classNames from 'classnames/bind';
import { useState } from 'react';
import { FiSmile } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CommentSystem.module.scss';
import { createComment } from '~/redux/comments/commentActions';

const cx = classNames.bind(styles);

function CommentSystem({ data, className }) {
    const { auth, socket } = useSelector((state) => state);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            return;
        }
        const state = {
            postId: data._id,
            content: comment,
            author: auth.user._id,
        };
        dispatch(createComment({ post: data, comment: state, auth, socket }));
        setComment('');
    };

    const classes = cx('comment', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <form>
                <button className={cx('icons')}>
                    <FiSmile />
                </button>
                <textarea
                    value={comment}
                    spellCheck={false}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                ></textarea>
                <button type="submit" className={cx('send')} onClick={handleComment}>
                    Post
                </button>
            </form>
        </div>
    );
}

export default CommentSystem;
