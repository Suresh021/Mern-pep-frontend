import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h2 className="footer-logo">ShopSphere</h2>
                    <p>Your one-stop shop for fashion, accessories and more.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                </div>

                <div className="footer-section">
                    <h3>Categories</h3>
                    <p>Dresses</p>
                    <p>Accessories</p>
                    <p>Shoes</p>
                    <p>Watches</p>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: support@shopsphere.com</p>
                    <p>Phone: +91 9876543210</p>

                    <div className="social-icons">
                        <span>🌐</span>
                        <span>📘</span>
                        <span>📸</span>
                        <span>🐦</span>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 ShopSphere. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;