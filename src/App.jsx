import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Orders from "./components/Orders";
import Register from "./components/Register";
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