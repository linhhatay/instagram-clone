import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Post from './Post';
import Story, { StoryItem } from './Story';
import Suggested from './Suggested';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '~/redux/post/postActions';

const cx = classNames.bind(styles);

function Home() {
    const { posts } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Story>
                    <StoryItem />
                </Story>
                <Post posts={posts.data} />
            </div>
            <Suggested />
        </div>
    );
}

export default Home;
