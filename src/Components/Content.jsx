import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "./Content.css";

function Content() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const { cart, setCart } = useContext(AppContext);
    const API_URL = import.meta.env.VITE_API_URL;

    function ItemQuantity({ id }) {
        const item = cart.find((item) => item._id === id && item.quantity > 0);
        return item.quantity;
    }

    const fetchProducts = async () => {
        const url = `${API_URL}/products`;
        const res = await axios.get(url);
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const found = cart.find((item) => item._id === product._id);
        if (!found) {
            product.quantity = 1;
            setCart([...cart, product]);
        }
    };

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

    const filteredProducts =
        category === "All"
            ? products
            : products.filter((p) => p.category === category);

    return (
        <div className="content-page">

            <div className="categories">
                {["All", "Dresses", "Accessories", "Shoes", "Watches"].map((cat) => (
                    <button
                        key={cat}
                        className={category === cat ? "active" : ""}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="product-grid">
                {filteredProducts &&
                    filteredProducts.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img
                                src={`${API_URL}${product.imageurl}`}
                                alt={product.name}
                            />

                            <h3>{product.name}</h3>
                            <p className="desc">{product.description}</p>
                            <h4>₹{product.price}</h4>

                            {cart.find(
                                (item) =>
                                    item._id === product._id && item.quantity > 0,
                            ) ? (
                                <div className="qty-control">
                                    <button onClick={() => decrement(product._id)}>
                                        -
                                    </button>
                                    <ItemQuantity id={product._id} />
                                    <button onClick={() => increment(product._id)}>
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="add-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Content;