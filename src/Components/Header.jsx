import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Header.css";

function Header() {
    const { user } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <h1 className="logo">
                <Link to="/">ShopSphere</Link>
            </h1>

            <div className="search-box">
                <input type="text" placeholder="Search products..." />
                <button>🔍</button>
            </div>

            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/cart">🛒 Cart</Link>
                    </li>

                    {user?.email ? (
                        <li className="profile">
                            <span onClick={() => setMenuOpen(!menuOpen)}>
                                👤 {user.email.split("@")[0]}
                            </span>

                            {menuOpen && (
                                <div className="dropdown">
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/logout">Logout</Link>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="login-btn">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;