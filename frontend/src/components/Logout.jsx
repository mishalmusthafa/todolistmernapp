import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    return (
        <div onClick={onLogout} className="cursor-pointer">
            logout
        </div>
    );
}

export default Logout;
