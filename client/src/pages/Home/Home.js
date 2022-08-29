import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Post from './Post';
import styles from './Home.module.scss';
import Suggested from './Suggested';
import Story, { StoryItem } from './Story';

const cx = classNames.bind(styles);

function Home() {
    const { posts } = useSelector((state) => state);

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
