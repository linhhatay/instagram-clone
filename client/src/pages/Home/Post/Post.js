import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import PostItem from './PostItem';

const cx = classNames.bind(styles);

function Post({ posts }) {
    return (
        <div className={cx('wrapper')}>
            {posts.map((item) => (
                <PostItem key={item._id} data={item} />
            ))}
        </div>
    );
}

export default Post;
