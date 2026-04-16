import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./Cart.css";

export default function Cart() {
    const { user, setUser, cart, setCart } = useContext(AppContext);
    const API_URL = import.meta.env.VITE_API_URL;
    const [orderValue, setOrderValue] = useState(0);
    const Navigate = useNavigate();

    const increment = (id) => {
        setCart(
            cart.map((item) => {
                if (item._id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            }),
        );
    };

    const decrement = (id) => {
        setCart(
            cart
                .map((item) => {
                    if (item._id === id && item.quantity > 0) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                })
                .filter((item) => item.quantity > 0),
        );
    };

    useEffect(() => {
        if (cart.length > 0) {
            setOrderValue(
                cart.reduce((sum, item) => {
                    return sum + item.quantity * item.price;
                }, 0),
            );
        }
    }, [cart]);

    const placeOrder = async () => {
        const url = `${API_URL}/orders/place-order`;
        const order = {
            email: user.email,
            cart,
            orderValue,
        };
        const res = await axios.post(url, order);
        setCart({});
        Navigate("/orders");
    };

    return (
        <div className="cart-page">
            <h2 className="cart-title">🛒 My Cart</h2>

            {cart.length > 0 ? (
                <div className="cart-container">

                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart &&
                                cart.map(
                                    (item) =>
                                        item.quantity > 0 && (
                                            <tr key={item._id}>
                                                <td className="product-name">{item.name}</td>

                                                <td className="rAlign">₹{item.price}</td>

                                                <td className="cAlign">
                                                    <div className="qty-box">
                                                        <button onClick={() => decrement(item._id)}>-</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => increment(item._id)}>+</button>
                                                    </div>
                                                </td>

                                                <td className="rAlign total">
                                                    ₹{item.price * item.quantity}
                                                </td>
                                            </tr>
                                        ),
                                )}
                        </tbody>

                        <tfoot>
                            <tr className="tableFooter">
                                <td colSpan="3">Order Value</td>
                                <td className="rAlign grand-total">₹{orderValue}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="cart-action">
                        {user?.email ? (
                            <button onClick={placeOrder} className="cart-btn">
                                Place Order
                            </button>
                        ) : (
                            <button
                                className="cart-btn"
                                onClick={() => Navigate("/login")}
                            >
                                Login to Order
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <h3>Your cart is empty 😔</h3>
                    <button onClick={() => Navigate("/")}>
                        Go Shopping
                    </button>
                </div>
            )}
        </div>
    );
}