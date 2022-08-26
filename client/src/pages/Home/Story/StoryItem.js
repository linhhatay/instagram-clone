import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './Story.module.scss';

const cx = classNames.bind(styles);

function StoryItem() {
    return (
        <div className={cx('story-item')}>
            <div className={cx('border')}>
                <Image className={cx('avatar')} src="https://znews-stc.zdn.vn/static/topic/person/messi.jpg" />
            </div>
            <div className={cx('name')}>leomessi</div>
        </div>
    );
}

export default StoryItem;
