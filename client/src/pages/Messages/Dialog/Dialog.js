import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './Dialog.module.scss';

const cx = classNames.bind(styles);

function Dialog({ user, msg, youMessage }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={user.avatar} />
            {msg.text && <div className={cx(['content', youMessage && 'active'])}>{msg.text}</div>}
        </div>
    );
}

export default Dialog;
