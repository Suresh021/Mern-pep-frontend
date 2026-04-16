import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./Login.css";

export default function Login() {
    const { setUser, cart } = useContext(AppContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();

    const handleLogin = async () => {
        const url = `${API_URL}/admin/login`;
        const res = await axios.post(url, formData);
        setUser(res.data);

        if (cart.length > 0) Navigate("/cart");
        else Navigate("/");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Login to your account</p>

                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <button onClick={handleLogin}>Login</button>
                </div>

                <p className="register-link">
                    New user? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}