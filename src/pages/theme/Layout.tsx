import Header from "@/pages/theme/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCartItems, { ...product, quantity: 1 }];
    });
  };
  return (
    <div className="min-h-screen w-full ">
      <Header cartItems={cartItems} setCartItems={setCartItems} />

      <Outlet context={{ addToCart }} />
    </div>
  );
};

export default Layout;
