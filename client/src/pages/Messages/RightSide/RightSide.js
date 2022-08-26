import classNames from 'classnames/bind';
import { FiSmile } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from '~/components/Image';
import styles from '../Messages.module.scss';
import Dialog from '../Dialog';
import { addMessage, getMessages } from '~/redux/messages/messagesActions';

const cx = classNames.bind(styles);

function RightSide() {
    const [youMessage, setYouMessage] = useState(true);
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');
    const { auth, messages, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const param = useParams();
    const id = param[Object.keys(param)[0]];
    const refDisplay = useRef();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
        };
        dispatch(addMessage({ msg, auth, socket }));
        if (refDisplay) {
            refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        setText('');
    };

    useEffect(() => {
        const newUser = messages.users.find((user) => user._id === id);
        if (newUser) {
            setUser(newUser);
        }
    }, [messages.users, id]);

    useEffect(() => {
        if (id) {
            const getMessagesData = async () => {
                await dispatch(getMessages({ auth, id }));
                // if (refDisplay) {
                //     refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                // }
            };
            getMessagesData();
        }
    }, [id, dispatch, auth]);

    return (
        <div className={cx('message')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Image className={cx('avatar')} src={user.avatar} alt="" />
                    <div className={cx('fullname')}>{user.fullname}</div>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('action-btn')}>
                        <svg
                            aria-label="Audio call"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 01.908-2.138 17.116 17.116 0 011.865-1.71 2.307 2.307 0 013.004.174 13.283 13.283 0 013.658 5.325 2.551 2.551 0 01-.19 1.941l-.455.853a.463.463 0 00-.024.387 7.57 7.57 0 004.077 4.075.455.455 0 00.386-.024l.853-.455a2.548 2.548 0 011.94-.19 13.278 13.278 0 015.326 3.658 2.309 2.309 0 01.174 3.003 17.319 17.319 0 01-1.71 1.866 3.29 3.29 0 01-2.138.91 10.27 10.27 0 01-.368.006zm-13.144-20a.27.27 0 00-.167.054A15.121 15.121 0 003.28 4.47a1.289 1.289 0 00-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 00.835-.36 15.217 15.217 0 001.504-1.637.324.324 0 00-.047-.41 11.62 11.62 0 00-4.457-3.119.545.545 0 00-.411.044l-.854.455a2.452 2.452 0 01-2.071.116 9.571 9.571 0 01-5.189-5.188 2.457 2.457 0 01.115-2.071l.456-.855a.544.544 0 00.043-.41 11.629 11.629 0 00-3.118-4.458.36.36 0 00-.244-.1z"></path>
                        </svg>
                    </div>
                    <div className={cx('action-btn')}>
                        <svg
                            aria-label="Video call"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <rect
                                fill="none"
                                height="18"
                                rx="3"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                width="16.999"
                                x="1"
                                y="3"
                            ></rect>
                            <path
                                d="M17.999 9.146l2.495-2.256A1.5 1.5 0 0123 8.003v7.994a1.5 1.5 0 01-2.506 1.113L18 14.854"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>
                    <div className={cx('action-btn')}>
                        <svg
                            aria-label="View Thread Details"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <circle
                                cx="12.001"
                                cy="12.005"
                                fill="none"
                                r="10.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></circle>
                            <circle cx="11.819" cy="7.709" r="1.25"></circle>
                            <line
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                x1="10.569"
                                x2="13.432"
                                y1="16.777"
                                y2="16.777"
                            ></line>
                            <polyline
                                fill="none"
                                points="10.569 11.05 12 11.05 12 16.777"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></polyline>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('display')} ref={refDisplay}>
                    {messages.data.map((item, index) => (
                        <div key={index}>
                            {item.sender !== auth.user._id && (
                                <div className={cx('other-message')}>
                                    <Dialog user={user} msg={item} />
                                </div>
                            )}
                            {item.sender === auth.user._id && (
                                <div className={cx('you-message')}>
                                    <Dialog user={auth.user} youMessage={youMessage} msg={item} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('editor')}>
                <form className={cx('form')}>
                    <div className={cx('emoticon')}>
                        <FiSmile />
                    </div>
                    <div className={cx('write')}>
                        <textarea
                            wrap="hard"
                            value={text}
                            placeholder="Message..."
                            spellCheck={false}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className={cx('send-message')} onClick={handleSendMessage}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RightSide;
