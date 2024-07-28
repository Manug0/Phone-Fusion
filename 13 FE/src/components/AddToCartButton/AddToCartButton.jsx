import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useCounter } from "../../contexts/CounterContext";
import { Button, IconButton } from "@chakra-ui/react";

const AddToCartButton = ({
	phone,
	selectedOption,
	extraPrice,
	onOpen,
	styles,
	colorScheme,
	size,
}) => {
	const { cart, addCart } = useCart();
	const { incrementCounter } = useCounter();
	const [isDesktop, setIsDesktop] = useState(window.innerWidth > 756);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth > 756);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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

	return isDesktop ? (
		<Button
			style={{ ...styles, display: "flex", gap: "8px" }}
			colorScheme={colorScheme || "green"}
			size={size || "sm"}
			onClick={toggleLiked}>
			<p>Añadir al carrito</p>
			<i className="ri-shopping-cart-2-fill"></i>
		</Button>
	) : (
		<IconButton
			style={{
				position: "absolute",
				right: "var(--size-xl)",
				bottom: "var(--size-xl)",
			}}
			colorScheme={colorScheme || "gray"}
			size={size || "md"}
			icon={<i className="ri-shopping-cart-2-fill"></i>}
			onClick={toggleLiked}
		/>
	);
};

export default AddToCartButton;
