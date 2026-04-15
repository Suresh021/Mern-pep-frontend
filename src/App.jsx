import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart.jsx";
import Content from "./Components/Content.jsx";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Login from "./Components/Login.jsx";
import Logout from "./Components/Logout.jsx";
import Orders from "./Components/Orders.jsx";
import Register from "./Components/Register.jsx";
export const AppContext = createContext();
function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Content />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;