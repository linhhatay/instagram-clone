import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { HeartIcon } from '~/components/Icons';
import styles from './Comments.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '~/redux/comments/commentActions';

const cx = classNames.bind(styles);

function CommentItem({ post, data }) {
    const dispatch = useDispatch();
    const { socket } = useSelector((state) => state);

    const handleRemoveComment = () => {
        dispatch(deleteComment({ post, comment: data, socket }));
    };

    return (
        <div className={cx('comment-item')}>
            <div className={cx('box')}>
                <span className={cx('author')}>{data.author.username}</span>&nbsp;{' '}
                <span className={cx('text')}>{data.content}</span>
            </div>
            <div className={cx('options')}>
                <div>
                    <Tippy
                        trigger="click"
                        interactive
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className={cx('content')} tabIndex="-1" {...attrs}>
                                <div className={cx('menu-options')}>
                                    <div onClick={() => handleRemoveComment()}>Xóa</div>
                                </div>
                            </div>
                        )}
                    >
                        <button className={cx('btn-actions')}>
                            <BiDotsHorizontalRounded />
                        </button>
                    </Tippy>
                </div>

                <button className={cx('loves')}>
                    <HeartIcon height={12} width={12} />
                </button>
            </div>
        </div>
    );
}

export default CommentItem;
