import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState([]); // Use camelCase for state and setter


  useEffect(()=>{
    let existingcartitem=localStorage.getItem('cart')
    if(existingcartitem){
      setCart(JSON.parse(existingcartitem))
  }
  
},[] )

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext); // Return the context value
};

export {
  useCart,
  CartProvider
};
