import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const [showPassword, setShowPassword] = useState({
        showPassword1: false,
        showPassword2: false,
    });

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isSuccess && user) {
            navigate('/');
        }

        if (isError || message) {
            toast.error(message);
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const { name, email, password, password2 } = formData;
    const { showPassword1, showPassword2 } = showPassword;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const setPassVisbility = (e) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [e.target.name]: !prevState[e.target.name],
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Password do not match');
        } else {
            const userData = { name, email, password };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="hero w-full">
            {/* Register and other texts */}
            <div className="hero-content flex-col lg:flex-row-reverse items-center justify-center">
                <div className="text-center lg:text-left min-w-80">
                    <h1 className="text-5xl font-bold">Register now!</h1>
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
                                <span className="label-text">User name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="user name"
                                className="input input-bordered"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
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
                                />
                                <FaEye className="swap-on" />
                                <FaEyeSlash className="swap-off" />
                            </label>
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type={!showPassword2 ? 'password' : 'text'}
                                placeholder="confirm password"
                                className="input input-bordered"
                                name="password2"
                                value={password2}
                                onChange={onChange}
                                required
                            />
                            <label className="btn btn-ghost text-lg swap absolute top-9 right-0  ">
                                <input
                                    type="checkbox"
                                    onClick={setPassVisbility}
                                    name="showPassword2"
                                />
                                <FaEye className="swap-on" />
                                <FaEyeSlash className="swap-off" />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p className="text-center">
                            Already have an account?
                            <Link to="/login">
                                <span className="link link-primary  text-center text-lg p-3 font-medium no-underline">
                                    Login
                                </span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
