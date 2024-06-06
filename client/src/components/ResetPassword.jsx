import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../App.css";
import logo from '../assets/images/logofip.png';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const { token } = useParams()

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/reset-password/' + token, { password })
            .then(response => {
                if (response.data.status) {

                    navigate('/login')

                }
                console.log(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    };
    return (
        <div className="auth-wrapper auth-inner">
            <img src={logo} alt="FIP Capital Logo" className="logo" />
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            id="customCheck1"
                            name="customCheck1"
                            className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                    <p className="forgot-password text-right">
                        Have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default ResetPassword