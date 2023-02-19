import React, { createContext, useContext, useState } from "react";

import { toast } from "react-hot-toast";

const Context = createContext("");

export const StateContext = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;
  const loginUser = (user) => {
    setUserAuth(user);
    localStorage.setItem('auth', JSON.stringify(user));
  };
  const logoutUser = () => {
    setUserAuth(null);
    localStorage.clear()
  };
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find(
      (item) => item?.id === product?.id
    );
    setTotalPrice((prev) => prev + product?.price * quantity);
    setTotalQuantity((prev) => prev + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems?.map((item) => {
        if (item.id === product.id)
          return { ...item, quantity: item?.quantity + quantity };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product?.title} added to cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems?.find((item) => item?.id === product?.id);
    const newCartItem = cartItems?.filter((item) => item.id !== product?.id);
    setTotalPrice(
      (prev) => prev - foundProduct?.price * foundProduct?.quantity
    );
    setTotalQuantity((prev) => prev - foundProduct?.quantity);
    setCartItems(newCartItem);
  };
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems?.find((item) => item.id === id);
    index = cartItems?.findIndex((product) => product.id === id);
    if (value === "inc") {
      cartItems[index] = {
        ...foundProduct,
        quantity: foundProduct?.quantity + 1,
      };

      setTotalPrice((prev) => prev + foundProduct?.price);
      setTotalQuantity((prev) => prev + 1);
    } else if (value === "desc") {
      if (foundProduct?.quantity > 1) {
        cartItems[index] = {
          ...foundProduct,
          quantity: foundProduct?.quantity - 1,
        };

        setTotalPrice((prev) => prev - foundProduct?.price);
        setTotalQuantity((prev) => prev - 1);
      }
    }
  };

  const clearCartItems = () =>{setCartItems([])
   setTotalQuantity(0);
   setTotalPrice(0)
  }

  const inQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        userAuth,
        inQty,
        decQty,
        onAdd,
        loginUser,
        logoutUser,
        toggleCartItemQuantity,
        onRemove,
        clearCartItems
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
