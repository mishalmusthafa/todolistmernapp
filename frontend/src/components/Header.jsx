import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="hidden md:block relative mb-3 ">
            <div className="flex justify-between py-3 pl-3  items-center  md:px-5">
                {/* Logo */}
                <div className="logo ">
                    <Link to="/">
                        <h1 className="text-sm md:text-xl">TODO LISTS</h1>
                    </Link>
                </div>
                {/* Authenthication and theme switcher */}
                <div className="flex flex-row-reverse gap-5">
                    {user ? (
                        <>
                            {/* Logout Button */}
                            <button
                                onClick={onLogout}
                                className="btn btn-primary mr-4 text-md font-bold md:text-lg"
                            >
                                logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                {/* Login Button */}
                                <button className="btn btn-primary mr-4 text-md font-bold md:text-lg">
                                    login
                                </button>
                            </Link>
                            <Link to="/register">
                                {/* Register Button */}
                                <button className="btn btn-primary mr-4 text-md font-bold md:text-lg">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}

                    {/* Theme Switcher */}
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-current"></div>
        </nav>
    );
}

export default Header;
