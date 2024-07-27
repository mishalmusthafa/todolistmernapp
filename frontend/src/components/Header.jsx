import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        console.log('logging out');
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="relative mb-3">
            <div className="flex justify-between py-3 px-5 items-center">
                <div className="logo">
                    <Link to="/">
                        <h1 className="text-xl">TODO LISTS</h1>
                    </Link>
                </div>
                <div className="">
                    {user ? (
                        <>
                            <button
                                onClick={onLogout}
                                className="btn btn-primary mr-4 text-lg"
                            >
                                logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary mr-4 text-lg">
                                    login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-primary mr-8  text-lg">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}

                    <ThemeSwitcher />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-current"></div>
        </nav>
    );
}

export default Header;
