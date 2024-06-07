import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logofip.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/login', { email, password })
            .then(response => {
                if (response.data.status) {
                    window.location.href = 'https://fipcapital.net';  // Navigate to the external URL
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="auth-wrapper auth-inner">
            <img src={logo} alt="FIP Capital Logo" className="logo" />
            <h2 className="">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="custom-control-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-secondary">
                        Login
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <Link to="/forgotPassword">Password</Link>
                </p>
                <p className="forgot-password text-right">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
