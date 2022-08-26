import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Image from '~/components/Image';
import Footer from '~/layouts/components/Footer';
import styles from './Explore.module.scss';

const cx = classNames.bind(styles);

function Explore() {
    const { posts } = useSelector((state) => state);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    {posts.data.slice(0, 10).map((item) => (
                        <div className={cx('image')} key={item._id}>
                            <Image className={cx('link')} src={item.image} />
                        </div>
                    ))}
                </div>
                <div className={cx('bottom')}>
                    {posts.data.slice(10, 20).map((item) => (
                        <div className={cx('image')} key={item._id}>
                            <Image className={cx('link')} src={item.image} />
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Explore;
