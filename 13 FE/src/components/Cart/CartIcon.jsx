import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useCounter } from "../../contexts/CounterContext";
import { Button } from "@chakra-ui/react";

const CartIcon = ({ phone, selectedOption, extraPrice, onOpen, styles, colorScheme, size }) => {
	const { cart, addCart } = useCart();
	const { incrementCounter } = useCounter();

	const toggleLiked = (event) => {
		event.stopPropagation();
		const phoneWithOption = {
			...phone,
			selectedOption,
			price: phone.price + (selectedOption === "8GB x 256GB" ? extraPrice : 0),
		};

		if (cart.some((c) => c.name === phone.name && c.selectedOption === selectedOption)) {
			incrementCounter(`${phone.name} (${selectedOption})`);
		} else {
			addCart(phoneWithOption);
			incrementCounter(`${phone.name} (${selectedOption})`);
		}

		onOpen();
	};

	return (
		<Button
			style={{ ...styles, display: "flex", gap: "8px" }}
			colorScheme={colorScheme || "green"}
			size={size || "sm"}
			onClick={toggleLiked}>
			<p>Añadir al carrito </p>
			<i className="ri-shopping-cart-2-fill"></i>
		</Button>
	);
};

export default CartIcon;
