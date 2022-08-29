import classNames from 'classnames/bind';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';

import Image from '~/components/Image';
import styles from './Albums.module.scss';
import Tagged from '../Tagged';
import DetailsThumb from '~/components/DetailsThumb';

const cx = classNames.bind(styles);

function Albums() {
    const data = useOutletContext();
    const [showDetailsThumb, setShowDetailsThumb] = useState(false);
    const [detailImage, setDetailImage] = useState(null);

    const handleShowDetailsThumb = (data) => {
        setShowDetailsThumb(true);
        setDetailImage(data);
    };

    return data.posts.length > 0 ? (
        <div className={cx('content')}>
            {showDetailsThumb && <DetailsThumb data={detailImage} setShowDetailsThumb={setShowDetailsThumb} />}

            {data.posts.map((item, index) => (
                <div className={cx('image')} key={index} onClick={() => handleShowDetailsThumb(item)}>
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
    ) : (
        <Tagged />
    );
}

export default Albums;
