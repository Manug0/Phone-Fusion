import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserData, updateCart } from "../services/Api";

const Cart = createContext();

export const CartContext = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const loadCart = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const response = await getUserData(token);
					if (response.data && response.data.cart) {
						setCart(response.data.cart);
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
				setCart(localCart);
			}
		};
		loadCart();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && cart.length > 0) {
			updateCart(cart, token).catch((error) => console.error("Error updating cart:", error));
		}
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addCart = (item) => {
		setCart((prevCart) => [...prevCart, item]);
	};

	const removeCart = (item) => {
		setCart((prevCart) => {
			const updatedCart = prevCart.filter((c) => c._id !== item._id);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	useEffect(() => {
		const loadData = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const response = await getUserData(token);
					if (response.data) {
						setCart(response.data.cart || []);
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				setCart([]);
			}
		};
		loadData();
	}, [localStorage.getItem("token")]);

	const cartCount = cart.length;

	return (
		<Cart.Provider value={{ cart, setCart, addCart, removeCart, cartCount }}>
			{children}
		</Cart.Provider>
	);
};

export const useCart = () => useContext(Cart);
