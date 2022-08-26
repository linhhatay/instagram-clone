import { useSelector, useDispatch } from 'react-redux';

import Loading from './Loading';
import Toast from './Toast';

function Notify() {
    const { notify } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleShow = () => {
        dispatch({ type: 'NOTIFY', payload: {} });
    };

    return (
        <div>
            {notify.isLoading && <Loading />}
            {notify.isSucces && (
                <Toast title="Thành công" message="Bạn đã đăng kí tài khoản thành công !!!" handleShow={handleShow} />
            )}
            {notify.isError && (
                <Toast
                    error
                    title="Thất bại"
                    message="Đã xảy ra lỗi, vui lòng liên hệ quản trị viên !!!"
                    handleShow={handleShow}
                />
            )}
        </div>
    );
}

export default Notify;
