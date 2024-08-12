import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState({
        showPassword1: false,
    });

    const { email, password } = formData;
    const { showPassword1 } = showPassword;

    const { user, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/');
        }
        if (isError || message) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    const setPassVisbility = (e) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [e.target.name]: !prevState[e.target.name],
        }));
    };

    return (
        <div className="hero w-full relative ">
            {/* Login and other texts */}

            <div className="hero-content flex-col lg:flex-row-reverse items-center justify-center">
                <div className="text-center lg:text-left min-w-80">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Create the account to enjoy the application
                    </p>
                </div>
                {/* Form field */}
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form
                        className="card-body"
                        type="submit"
                        onSubmit={onSubmit}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={!showPassword1 ? 'password' : 'text'}
                                placeholder="password"
                                className="input input-bordered"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            <label className="btn btn-ghost text-lg swap absolute top-9 right-0  ">
                                <input
                                    type="checkbox"
                                    onClick={setPassVisbility}
                                    name="showPassword1"
                                    // className="border-2 "
                                />
                                <FaEye className="swap-on" />
                                <FaEyeSlash className="swap-off" />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className="text-center">
                            No account?
                            <Link to="/register">
                                <span className="link link-primary  text-center text-lg p-3 font-medium no-underline">
                                    Create one
                                </span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
