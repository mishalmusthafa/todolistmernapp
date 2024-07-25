import React from 'react';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

function Login() {
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

    const { name, email, password, password2 } = formData;
    const { showPassword1, showPassword2 } = showPassword;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submited');
    };

    const setPassVisbility = (e) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [e.target.name]: !prevState[e.target.name],
        }));
    };

    return (
        <div className="hero w-full ">
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
