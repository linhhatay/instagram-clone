import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('contact')}>
                <div>Meta</div>
                <div>About</div>
                <div>Blog</div>
                <div>Jobs</div>
                <div>Help</div>
                <div>API</div>
                <div>Privacy</div>
                <div>Terms</div>
                <div>Top Account</div>
                <div>Hashtags</div>
                <div>Locations</div>
                <div>Instagram Lite</div>
                <div>Contact Uploading & Non-Users</div>
            </div>
            <div className={cx('contact-sub')}>
                <div>English</div>
                <div>© 2022 Instagram from Meta</div>
            </div>
        </div>
    );
}

export default Footer;
