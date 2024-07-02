import React, { useState, useMemo } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	IconButton,
} from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";
import { useCounter } from "../../contexts/CounterContext";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import OrderCompleteCheckmark from "../OrderCompleteCheckmark/OrderCompleteCheckmark";
import { createClient, createSale, updateClient } from "../../services/Api";

const CartItem = styled.div`
	width: 80%;
	padding: var(--size-lg) 0;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;

	img {
		width: 60%;
	}

	> div {
		flex: 1;
	}

	.product-info {
		display: flex;
		flex-direction: column;
		gap: 8px;

		.product-name {
			font-weight: var(--font-weight-semibold);
		}

		.product-price {
			font-weight: var(--font-weight-bold);
		}

		.quantity-container {
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}

	.delete-button {
		cursor: pointer;
		position: absolute;
		top: 10px;
		left: -10px;
	}
`;

const TotalPrice = styled.p`
	font-weight: var(--font-weight-semibold);
	margin-top: var(--size-xl);
	display: flex;
	gap: 4px;
`;

const Cart = ({ isOpen, onClose, btnRef }) => {
	const { cart, setCart, removeCart } = useCart();
	const { counter, setCounter, incrementCounter, decrementCounter } = useCounter();
	const [isLoading, setIsLoading] = useState(false);
	const [completeOrder, setCompleteOrder] = useState(false);

	const handleDelete = (phone) => {
		removeCart(phone);
		setCounter((prevCounter) => ({
			...prevCounter,
			[`${phone.name} (${phone.selectedOption})`]: 0,
		}));
	};

	const confirmOrder = async () => {
		try {
			setIsLoading(true);
			const storedData = JSON.parse(localStorage.getItem("user"));

			if (!storedData || !storedData.token || !storedData.user) {
				throw new Error("User data is missing");
			}

			const token = storedData.token;
			const user = storedData.user;

			const newClient = {
				name: user.name,
				email: user.email,
				userId: user._id,
				saleId: [],
			};

			const clientRes = await createClient(newClient, token);

			if (clientRes.status !== 201) {
				throw new Error("Failed to create client");
			}

			const createdClient = clientRes.data;

			const newSale = {
				saleDate: new Date(),
				phoneIds: cart.map((phone) => phone._id),
				clientId: createdClient._id,
			};

			const saleRes = await createSale(newSale, token);

			if (saleRes.status !== 201) {
				throw new Error("Failed to create sale");
			}

			const createdSale = saleRes.data;

			createdClient.saleId.push(createdSale._id);

			const updateRes = await updateClient(createdClient._id, createdClient, token);

			if (updateRes.status !== 200) {
				throw new Error("Failed to update client");
			}

			setTimeout(() => {
				setCart([]);
				setCounter({});
				setCompleteOrder(true);
				setIsLoading(false);
			}, 2000);

			setTimeout(() => {
				setCompleteOrder(false);
			}, 4000);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const totalPrice = useMemo(() => {
		return cart.reduce(
			(total, phone) =>
				total + phone.price * (counter[`${phone.name} (${phone.selectedOption})`] || 1),
			0
		);
	}, [cart, counter]);

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Tu Carrito</DrawerHeader>

				<DrawerBody style={{ overflow: "hidden" }}>
					{cart.length === 0 ? (
						<p style={{ fontWeight: "var(--font-weight-semibold)" }}>Tu carrito está vacío</p>
					) : (
						cart.map((phone) => (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									borderBottom: "1px solid var(--color-dark)",
								}}>
								<CartItem key={`${phone.name} (${phone.selectedOption})`}>
									<IconButton
										className="delete-button"
										icon={<DeleteIcon />}
										onClick={() => handleDelete(phone)}
										size="xs"
									/>
									<img src={phone.imageUrl} alt="phone" />
									<div className="product-info">
										<p className="product-name">
											{phone.name} ({phone.selectedOption})
										</p>
										<p className="product-price">{phone.price}€</p>
										<div className="quantity-container">
											<IconButton
												icon={<MinusIcon />}
												onClick={() => decrementCounter(`${phone.name} (${phone.selectedOption})`)}
												isDisabled={counter[`${phone.name} (${phone.selectedOption})`] === 1}
												size="sm"
											/>
											<p>{counter[`${phone.name} (${phone.selectedOption})`]}</p>
											<IconButton
												icon={<AddIcon />}
												onClick={() => incrementCounter(`${phone.name} (${phone.selectedOption})`)}
												size="sm"
											/>
										</div>
									</div>
								</CartItem>
								<div>
									{counter[`${phone.name} (${phone.selectedOption})`] > 1 && (
										<TotalPrice>
											Total:
											<span style={{ color: "green" }}>
												{" "}
												{counter[`${phone.name} (${phone.selectedOption})`] * phone.price}€
											</span>
										</TotalPrice>
									)}
								</div>
							</div>
						))
					)}
					{completeOrder && (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: "90vh",
								margin: "auto",
								padding: "1rem",
							}}>
							<OrderCompleteCheckmark />
							<p>Pedido realizado</p>
						</div>
					)}
				</DrawerBody>

				<DrawerFooter>
					{cart.length > 0 && (
						<Button
							onClick={confirmOrder}
							style={{ margin: "auto", width: "fit-content" }}
							colorScheme="green"
							isLoading={isLoading}>
							Tramitar pedido ({totalPrice.toFixed(2)}€)
						</Button>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default Cart;
