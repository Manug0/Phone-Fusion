import React, { useMemo, useState } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
} from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";
import PhoneCounter from "../PhoneCounter/PhoneCounter";
import { useCounter } from "../../contexts/CounterContext";
import { DeleteIcon } from "@chakra-ui/icons";
import styled, { keyframes } from "styled-components";
import OrderCompleteCheckmark from "../OrderCompleteCheckmark/OrderCompleteCheckmark";
import { createClient, createSale, updateClient } from "../../services/Api";

const CartItem = styled.div`
	border-bottom: 1px solid var(--color-dark);
	width: 80%;
	padding: var(--size-lg) 0;
	margin: auto;
`;

const Cart = ({ isOpen, onClose, btnRef }) => {
	const { cart, setCart, removeCart } = useCart();
	const { counter, setCounter } = useCounter();
	const [isLoading, setIsLoading] = useState(false);
	const [completeOrder, setCompleteOrder] = useState(false);

	const handleDelete = (phone) => {
		removeCart(phone);
		setCounter((prevCounter) => ({
			...prevCounter,
			[phone.name]: 0,
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
			console.log(newClient);

			const clientRes = await createClient(newClient, token);

			if (clientRes.status !== 201) {
				throw new Error("Failed to create client");
			}

			const createdClient = clientRes.data;
			console.log(createdClient);

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
			console.log(createdSale);

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
		return cart.reduce((total, phone) => total + phone.price * counter[phone.name], 0);
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
							<CartItem key={phone.name}>
								<img src={phone.imageUrl} alt="phone" style={{ width: "60%" }} />
								<div>
									<p style={{ fontWeight: "var(--font-weight-semibold)" }}>{phone.name}</p>
									<p style={{ fontWeight: "var(--font-weight-semibold)" }}>{phone.price}€</p>
									<p style={{ display: "flex" }}>
										Uds: <PhoneCounter productName={phone.name} />
									</p>
									{counter[phone.name] > 1 && (
										<p
											style={{
												fontWeight: "var(--font-weight-semibold)",
												marginTop: "var(--size-xl)",
												display: "flex",
												flexDirection: "column",
											}}>
											Total:
											<span style={{ color: "green" }}>{counter[phone.name] * phone.price}€</span>
										</p>
									)}
								</div>
								<DeleteIcon
									onClick={() => handleDelete(phone)}
									style={{
										cursor: "pointer",
										position: "relative",
										right: "-200px",
									}}
								/>
							</CartItem>
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
