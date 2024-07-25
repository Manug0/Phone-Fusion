import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserData, updateCart } from "../services/Api";
import { getUserFromLocalStorage } from "../utils/userHelper";

const Cart = createContext();

export const CartContext = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [isCartUpdated, setIsCartUpdated] = useState(false);

	useEffect(() => {
		const loadCart = async () => {
			const user = getUserFromLocalStorage();
			const token = user ? user.token : null;
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
		if (isCartUpdated) {
			const user = getUserFromLocalStorage();
			const token = user ? user.token : null;
			if (token) {
				updateCart(cart, token)
					.then(() => setIsCartUpdated(false))
					.catch((error) => console.error("Error updating cart:", error));
			}
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart, isCartUpdated]);

	const addCart = (item) => {
		setCart((prevCart) => [...prevCart, item]);
		setIsCartUpdated(true);
	};

	const removeCart = (item) => {
		setCart((prevCart) => {
			const updatedCart = prevCart.filter((c) => c._id !== item._id);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
		setIsCartUpdated(true);
	};

	const cartCount = cart.length;

	return (
		<Cart.Provider value={{ cart, setCart, addCart, removeCart, cartCount }}>
			{children}
		</Cart.Provider>
	);
};

export const useCart = () => useContext(Cart);
