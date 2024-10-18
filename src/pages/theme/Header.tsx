import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { navLinks } from "@/data/nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { mobileData } from "@/data/mobile";
import AlertCustom from "@/components/AlertCustom";

const Header = ({
  cartItems,
  setCartItems,
  removeFromCart,
  products,
  setProducts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Show pop-up if there is input, hide it if empty
    setIsSearchOpen(value.length > 0);
  };

  const filteredResults = mobileData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = Object.values(cartItems).reduce((total, item) => {
    return (
      total + parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity
    );
  }, 0);

  // const handleDelete = (id) => {
  //   setCartItems((prevCartItems) =>
  //     prevCartItems.filter((item) => item.id !== id)
  //   );
  // };

  const updateStock = () => {
    if (cartItems.length > 0) {
      // Check if there are items to order
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          if (cartItem) {
            // Decrease stock by the quantity in the cart
            return { ...product, stock: product.stock - cartItem.quantity };
          }
          return product;
        })
      );
      // Clear the cart after placing the order
      setCartItems([]);
      toast.success("Order placed successfully!");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white p-4 w-full flex flex-col gap-6 items-center justify-between">
      <div className=" w-full flex gap-6 items-center justify-between">
        <Link to={"/"}>
          {" "}
          <img
            className="w-40 h-auto"
            src="https://via.placeholder.com/153x45"
            alt="Logo"
          />
        </Link>
        <nav className="w-1/2 relative">
          <div className="flex w-full items-center">
            <Input
              placeholder="Search"
              className="bg-[#edf1fe] w-full rounded-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button
              className="aspect-square rounded-none bg-[#0162d0]"
              size="icon"
            >
              <img
                src="/images/search.svg"
                alt="s"
                className="w-6 h-6 object-cover"
              />
            </Button>
          </div>

          {isSearchOpen && (
            <div className="absolute grid transition-all bg-white border rounded shadow-lg mt-1 w-1/2 z-50">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="block p-2 hover:bg-gray-200 text-base inline-flex"
                    onClick={() => setSearchQuery("")} // Clear search on click
                  >
                    <img src={item.src} className="h-10 " alt={item.name} />
                    {item.name}
                  </Link>
                ))
              ) : (
                <div className="p-2 text-sm">No results found</div>
              )}
            </div>
          )}
        </nav>
        <div className="inline-flex relative gap-2 items-center">
          <Link to={"/"}>
            <img src="/images/heart.svg" alt="" />
          </Link>
          <Sheet>
            <SheetTrigger>
              <img src="/images/cart.svg" alt="" />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </SheetTrigger>
            <SheetContent className="bg-white space-y-2">
              <SheetTitle>Your recent cart products</SheetTitle>
              <SheetDescription>
                {" "}
                {cartItems &&
                  Object.values(cartItems).map((item) => (
                    <Card
                      key={item.id}
                      className="w-full rounded-none border-none shadow-none p-0 m-0"
                    >
                      <CardContent className="p-0">
                        <div className="grid w-full items-center gap-4">
                          <div className="flex space-y-1.5">
                            <div className="h-16">
                              <img
                                src={item.src}
                                className="aspect-auto object-cover h-full "
                                alt={item.name}
                              />
                            </div>
                            <div className=" w-full inline-flex justify-between items-center">
                              <header>
                                <p className="text-sm font-medium">
                                  {item.name} x{item.quantity}{" "}
                                  {/* Display quantity */}
                                </p>
                                <h4 className="font-bold text-base">
                                  Rs.{" "}
                                  {(
                                    parseFloat(
                                      item.price.replace(/[^0-9.-]+/g, "")
                                    ) * item.quantity
                                  ).toFixed(2)}
                                </h4>
                              </header>

                              <span
                                className="bg-red-500 rounded-full p-1"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6 invert cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </SheetDescription>
              <Separator className="h bg-neutral-400" />
              {Object.values(cartItems).length > 0 && (
                <>
                  <div className="text-right flex justify-between w-full font-semibold text-lg">
                    <p className="text-lg font-normal">Total</p>
                    <h4>
                      <span className="text-base text-neutral-500 font-normal">
                        {" "}
                        Rs.{" "}
                      </span>{" "}
                      {totalPrice.toFixed(2)}
                    </h4>
                  </div>
                  <Separator className="h bg-neutral-400" />
                  <div className="w-full inline-flex gap-4">
                    <Button
                      className="w-full bg-[#0163d2] rounded-none text-white p-5"
                      onClick={updateStock} // Update stock when placing an order
                    >
                      Place Order
                    </Button>
                    <Button className="w-full bg-[#0163d2] rounded-none text-white p-5">
                      <Link to={"/cart"}> View Cart </Link>
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="py-1.5 px-6 overflow-hidden w-full flex justify-center items-center gap-10 ">
        <Button className="bg-[#0163d2] rounded-none text-white p-5">
          <img src="/images/category.svg" alt="categ" /> Browse Category
        </Button>
        <div className="inline-flex gap-4 justify-between items-center overflow-x-auto overflow-hidden scrollbar-hide">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              id={link.id}
              to={link.path}
              className="text-center hover:text-[#0163d2] text-black text-xl font-semibold font-['Rubik'] whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
