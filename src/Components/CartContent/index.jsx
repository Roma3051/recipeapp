import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (recipe) => {
    setCart((prevCart) => {
      const existingRecipe = prevCart.find((item) => item.idMeal === recipe.idMeal);
      
      if (existingRecipe) {
        return prevCart.map((item) =>
          item.idMeal === recipe.idMeal ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...recipe, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((recipe) => recipe.idMeal !== id));
  };

  const totalQuantity = cart.reduce((sum, recipe) => sum + recipe.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
