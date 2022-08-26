import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './Albums.module.scss';
import { useOutletContext } from 'react-router-dom';
import Tagged from '../Tagged';

const cx = classNames.bind(styles);

function Albums() {
    const data = useOutletContext();

    return data.posts.length > 0 ? (
        <div className={cx('content')}>
            {data.posts.map((item) => (
                <div className={cx('image')} key={item._id}>
                    <Image className={cx('link')} src={item.image} />
                </div>
            ))}
        </div>
    ) : (
        <Tagged />
    );
}

export default Albums;
