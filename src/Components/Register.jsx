import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [obj, setObj] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();

    const handleSubmit = async () => {
        const url = `${API_URL}/admin/signup`;
        const res = await axios.post(url, obj);
        Navigate("/login");
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Create Account ✨</h2>
                <p className="register-subtitle">Join ShopSphere today</p>

                <div className="register-form">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setObj({ ...obj, name: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setObj({ ...obj, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Create a password"
                        onChange={(e) => setObj({ ...obj, password: e.target.value })}
                    />

                    <button onClick={handleSubmit}>
                        Register
                    </button>
                </div>

                <p className="login-link">
                    Already a member? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}