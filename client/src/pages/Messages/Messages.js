import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Messages.module.scss';
import Button from '~/components/Button';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import { DirectIcon } from '~/components/Icons';
import { addUser } from '~/redux/messages/messagesActions';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Messages() {
    const { messages } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();

    const handleAddUser = (user) => {
        dispatch(addUser({ user, messages }));
        return navigate(`/messages/${user._id}`);
    };

    useEffect(() => {
        if (messages.users.length === 0) {
            navigate(`/messages`);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <LeftSide handleAddUser={handleAddUser} />
                {Object.keys(param).length > 0 ? (
                    <RightSide />
                ) : (
                    <div className={cx('right')}>
                        <button className={cx('direct')}>
                            <DirectIcon />
                        </button>
                        <div className={cx('title')}>
                            <h2>Your Messages</h2>
                        </div>
                        <div className={cx('desc')}>Send private photos and messages to a friend or group.</div>
                        <Button primary className={cx('send')}>
                            Send Message
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;
