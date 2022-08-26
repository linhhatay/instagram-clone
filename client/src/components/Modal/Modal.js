import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Modal.module.scss';

import { BsChevronDown } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { FiLoader, FiSmile } from 'react-icons/fi';
import { SelectIcon } from '~/components/Icons';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image as Img } from 'cloudinary-react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { createPost, updatePost } from '~/redux/post/postActions';

const cx = classNames.bind(styles);

function Modal({ setIsModal, isEdit, data }) {
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { auth } = useSelector((state) => state);
    const idPost = data?._id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit) {
            setContent(data.content);
            setLocation(data.location);
            setImage(data.image);
        }
    }, []);

    const handleChange = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'hpeidups');

        try {
            setIsLoading(true);
            const res = await axios.post('https://api.cloudinary.com/v1_1/dvfwekbrc/image/upload', formData);
            setImage(res.data.url);
            setIsLoading(false);
        } catch (error) {
            console.log('Có lỗi', error);
        }
    };

    const handleCreatePost = () => {
        const author = auth.user._id;
        const data = { content: content, location: location, image: image, author: author };

        if (!image && !content) {
            alert('Vui lòng nhập bài viết !!!');
            return;
        }

        if (isEdit) {
            dispatch(updatePost({ idPost, data }));
        } else {
            dispatch(createPost({ data, auth }));
        }

        setIsModal(false);
    };

    return (
        <div className={cx('wrapper')} onClick={() => setIsModal(false)}>
            <button className={cx('close')} onClick={() => setIsModal(false)}>
                <FaTimes />
            </button>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <button className={cx('back')} onClick={() => setImage('')}>
                        <IoIosArrowRoundBack />
                    </button>
                    <h1 className={cx('title')}>Create new post</h1>
                    <button type="submit" id="submit" className={cx('shared')} onClick={handleCreatePost}>
                        Share
                    </button>
                </div>
                <div className={cx('content')}>
                    <div className={cx('select')}>
                        {image ? (
                            <div className={cx('image')}>
                                <Img cloudName="dvfwekbrc" publicId={image} />
                            </div>
                        ) : isLoading ? (
                            <FiLoader className={cx('loading')} />
                        ) : (
                            <>
                                <button>
                                    <SelectIcon />
                                </button>
                                <h2>Drag photos and videos here</h2>
                                <Button primary className={cx('choose')}>
                                    <input type="file" accept=".jpg, .png" onChange={handleChange} />
                                    Select from computer
                                </Button>
                            </>
                        )}
                    </div>
                    <form className={cx('post')}>
                        <div className={cx('user')}>
                            <Image className={cx('avatar')} src={auth.user.avatar} />
                            <span>{auth.user.username}</span>
                        </div>
                        <div className={cx('text')}>
                            <textarea
                                placeholder="Write a caption..."
                                value={content}
                                spellCheck={false}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <div className={cx('icons')}>
                                <FiSmile />
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <div className={cx('location')}>
                                <input
                                    type="text"
                                    placeholder="Add location"
                                    value={location}
                                    spellCheck={false}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <button className={cx('icon-location')}>
                                    <GoLocation />
                                </button>
                            </div>
                            <Button className={cx('btn')} text rightIcon={<BsChevronDown />}>
                                Accessibility
                            </Button>
                            <Button className={cx('btn')} text rightIcon={<BsChevronDown />}>
                                Advanced settings
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;
