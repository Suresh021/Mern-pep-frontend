import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./Orders.css";

export default function Orders() {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();

    const fetchOrders = async () => {
        const url = `${API_URL}/orders/show-orders/${user.email}`;
        const res = await axios.get(url);
        setOrders(res.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="orders-page">
            <h2 className="orders-title">My Orders</h2>

            {orders.length > 0 ? (
                <div className="orders-container">
                    {orders &&
                        orders.map((order) => (
                            <div className="order-card">

                                <div className="order-headings">
                                    <span>Product</span>
                                    <span>Price</span>
                                    <span>Quantity</span>
                                    <span>Total Cost</span>
                                    <span>Status</span>
                                </div>

                                <div className="order-items">
                                    {order.cart.map((item) => (
                                        <div className="order-item">

                                            <div className="product-info">
                                                <img src={`${API_URL}${item.imageurl}`} />
                                                <span>{item.name}</span>
                                            </div>

                                            <span>₹{item.price}</span>
                                            <span>{item.quantity}</span>
                                            <span className="total">
                                                ₹{item.price * item.quantity}
                                            </span>
                                            <span className={`status ${order.status}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <div className="empty-orders">
                    <h3>You haven’t ordered anything yet 😔</h3>
                    <button onClick={() => Navigate("/")}>
                        Order Now
                    </button>
                </div>
            )}
        </div>
    );
}