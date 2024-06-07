import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import logo from '../assets/images/logofip.png';
const forgotPassword = () => {

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting email:', email); // Debugging log
        axios.post('http://localhost:3000/auth/forgot-password', { email })
            .then(response => {
                console.log('Response:', response.data); // Debugging log
                if (response.data.status) {
                    alert("Check your email for reset password link");
                    navigate('/login');
                } else {
                    alert(response.data.message || "An error occurred, please try again."); // Handle the case when status is false
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred, please try again.');
            });
    };
    return (
        <div className="auth-wrapper auth-inner">
            <img src={logo} alt="FIP Capital Logo" className="logo" />
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="email" className="custom-control-label">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
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
                        Send
                    </button>
                    <p className="forgot-password text-right">
                        Have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default forgotPassword