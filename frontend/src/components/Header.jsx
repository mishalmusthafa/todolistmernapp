import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
    return (
        <nav className="relative mb-3">
            <div className="flex justify-between py-3 px-5 items-center">
                <Link to="/">
                    <h1 className="text-xl">TODO LISTS</h1>
                </Link>
                <div>
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
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-current"></div>
        </nav>
    );
}

export default Header;
