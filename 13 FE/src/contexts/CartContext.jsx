import React, { createContext, useState, useContext } from "react";

const Cart = createContext();

export const CartContext = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addCart = (cart) => {
		setCart((prevCart) => [...prevCart, cart]);
	};

	const removeCart = (cart) => {
		setCart((prevCart) => prevCart.filter((c) => c !== cart));
	};

	return <Cart.Provider value={{ cart, setCart, addCart, removeCart }}>{children}</Cart.Provider>;
};

export const useCart = () => useContext(Cart);
