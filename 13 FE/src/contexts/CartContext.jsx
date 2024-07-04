import React, { createContext, useState, useContext, useEffect } from "react";

const Cart = createContext();

export const CartContext = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const localCart = localStorage.getItem("cart");
		if (localCart) {
			setCart(JSON.parse(localCart));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addCart = (cart) => {
		setCart((prevCart) => [...prevCart, cart]);
	};

	const removeCart = (cart) => {
		setCart((prevCart) => prevCart.filter((c) => c !== cart));
	};

	const cartCount = cart.length;

	return (
		<Cart.Provider value={{ cart, setCart, addCart, removeCart, cartCount }}>
			{children}
		</Cart.Provider>
	);
};

export const useCart = () => useContext(Cart);
