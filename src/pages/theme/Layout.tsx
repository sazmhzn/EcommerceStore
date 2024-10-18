import { mobileData } from "@/data/mobile";
import Header from "@/pages/theme/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(mobileData);
  const [alertMessage, setAlertMessage] = useState("");

  // const addToCart = (product) => {

  //   setCartItems((prevCartItems) => {
  //     const existingItem = prevCartItems.find((item) => item.id === product.id);
  //     if (existingItem) {
  //       return prevCartItems.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prevCartItems, { ...product, quantity: 1 }];
  //   });
  // };

  const addToCart = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.stock > 0
          ? { ...product, stock: product.stock } // Decrease stock by 1
          : product
      )
    );

    // Update cart items
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const productToAdd = products.find((product) => product.id === productId);
      return [...prevCartItems, { ...productToAdd, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevCartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
              : item
          );
        } else {
          // Remove item from cart if quantity is 1
          return prevCartItems.filter((item) => item.id !== productId);
        }
      }
      return prevCartItems; // If the item isn't found, return the current state
    });
  };
  return (
    <div className="min-h-screen w-full ">
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        removeFromCart={removeFromCart}
        products={products}
        setProducts={setProducts}
      />
      <Outlet context={{ addToCart, products, removeFromCart }} />
      <ToastContainer />
    </div>
  );
};

export default Layout;
