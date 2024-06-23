import React from "react";
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

const Cart = ({ isOpen, onClose, btnRef }) => {
	const { cart, removeCart } = useCart();
	const { counter, setCounter } = useCounter();

	const handleDelete = (phone) => {
		removeCart(phone);
		setCounter((prevCounter) => ({
			...prevCounter,
			[phone.name]: 0,
		}));
	};

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Tu Carrito</DrawerHeader>

				<DrawerBody>
					<div className="favorites">
						{cart.map((phone) => (
							<div key={phone.name}>
								<div className="favorite-product">
									<img src={phone.imageUrl} alt="phone" />
									<div className="favorite-product-info">
										<p>{phone.name}</p>
										<p>{phone.price}€</p>
										<p>
											Uds: <PhoneCounter productName={phone.name} />
										</p>
										{counter[phone.name] > 1 && <p>Total: {counter[phone.name] * phone.price}€</p>}
									</div>
								</div>
								<div>
									<DeleteIcon onClick={() => handleDelete(phone)} />
								</div>
							</div>
						))}
					</div>
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button colorScheme="blue">Guardar</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default Cart;
