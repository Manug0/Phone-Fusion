import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useCounter } from "../../contexts/CounterContext";
import { Button, Flex } from "@chakra-ui/react";

const CartIcon = ({ phone, onOpen }) => {
	const { cart, addCart } = useCart();
	const { incrementCounter } = useCounter();

	const toggleLiked = (event) => {
		event.stopPropagation();
		if (cart.some((c) => c.name === phone.name)) {
			incrementCounter(phone.name);
		} else {
			addCart(phone);
			incrementCounter(phone.name);
		}

		onOpen();
	};

	return (
		<Button
			style={{ display: "flex", gap: "8px" }}
			colorScheme="green"
			size="sm"
			onClick={toggleLiked}>
			<p>Añadir al carrito </p>
			<i class="ri-shopping-cart-2-fill"></i>
		</Button>
	);
};

export default CartIcon;
