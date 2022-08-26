import classNames from 'classnames/bind';
import { AddIcon } from '~/components/Icons';
import styles from '../Messages.module.scss';
import { BsChevronDown } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Image from '~/components/Image';
import { getConversation } from '~/redux/messages/messagesActions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading, { LoadingItem } from '../Loading';

const cx = classNames.bind(styles);

function LeftSide({ handleAddUser }) {
    const { auth, messages } = useSelector((state) => state);
    const dispatch = useDispatch();

    const param = useParams();
    const id = param[Object.keys(param)[0]];

    const isActive = (user) => {
        if (id === user._id) return 'active';
        return '';
    };

    useEffect(() => {
        if (messages.firstLoad) return;
        dispatch(getConversation(auth));
    }, [dispatch, auth, messages.firstLoad]);

    return (
        <div className={cx('left')}>
            <div className={cx('user')}>
                <span>
                    {auth.user.username}
                    <button>
                        <BsChevronDown />
                    </button>
                </span>

                <div className={cx('add')}>
                    <AddIcon />
                </div>
            </div>

            {auth.user.following.length > 0 ? (
                auth.user.following.map((item) => (
                    <div
                        className={cx(['account-item', `${isActive(item)}`])}
                        key={item._id}
                        onClick={() => handleAddUser(item)}
                    >
                        <Image className={cx('avatar-account')} src={item.avatar} />
                        <div className={cx('info-account')}>
                            <div className={cx('name-account')}>{item.fullname}</div>
                        </div>
                    </div>
                ))
            ) : (
                <Loading>
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                </Loading>
            )}
        </div>
    );
}

export default LeftSide;
