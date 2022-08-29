import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Image from '~/components/Image';
import Footer from '~/layouts/components/Footer';
import DetailsThumb from '../../components/DetailsThumb';
import styles from './Explore.module.scss';

const cx = classNames.bind(styles);

function Explore() {
    const { posts } = useSelector((state) => state);
    const [showDetailsThumb, setShowDetailsThumb] = useState(false);
    const [detailImage, setDetailImage] = useState(null);
    const navigate = useNavigate();

    const handleShowDetailsThumb = (data) => {
        setShowDetailsThumb(true);
        setDetailImage(data);
        navigate(`${data._id}`);
    };

    return (
        <div className={cx('wrapper')}>
            {showDetailsThumb && <DetailsThumb data={detailImage} setShowDetailsThumb={setShowDetailsThumb} />}

            <div className={cx('container')}>
                <div className={cx('top')}>
                    {posts.data.slice(0, 10).map((item) => (
                        <div className={cx('image')} key={item._id} onClick={() => handleShowDetailsThumb(item)}>
                            <div className={cx('overlay')}>
                                <div className={cx('likes-count')}>
                                    <AiOutlineHeart className={cx('icon')} />
                                    <span>{item.likes.length}</span>
                                </div>
                                <div className={cx('comments-count')}>
                                    <FiMessageCircle className={cx('icon')} />
                                    <span>{item.comments.length}</span>
                                </div>
                            </div>
                            <Image className={cx('link')} src={item.image} />
                        </div>
                    ))}
                </div>
                <div className={cx('bottom')}>
                    {posts.data.slice(10, 20).map((item) => (
                        <div className={cx('image')} key={item._id} onClick={() => handleShowDetailsThumb(item)}>
                            <div className={cx('overlay')}>
                                <div className={cx('likes-count')}>
                                    <AiOutlineHeart className={cx('icon')} />
                                    <span>{item.likes.length}</span>
                                </div>
                                <div className={cx('comments-count')}>
                                    <FiMessageCircle className={cx('icon')} />
                                    <span>{item.comments.length}</span>
                                </div>
                            </div>
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
