import React, { useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	Button,
	Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledPopoverContent = styled(PopoverContent)`
	border: none;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PopoverButtons = styled.div`
	display: flex;
	flex-direction: column;
`;

const UserAccounticon = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const storedUser = localStorage.getItem("user");
	let user = null;

	try {
		user = JSON.parse(storedUser);
	} catch (e) {
		console.error("Error parsing user data from localStorage", e);
	}

	const openPopover = () => setIsOpen(true);
	const closePopover = () => setIsOpen(false);

	const goToLogin = () => {
		closePopover();
		navigate("/login");
	};
	const goToRegister = () => {
		closePopover();
		navigate("/register");
	};
	const goToProfile = () => {
		closePopover();
		navigate("/profile");
	};

	const logout = () => {
		localStorage.removeItem("cart");
		localStorage.removeItem("heart");
		localStorage.removeItem("user");
		window.location.href = "/login";
	};

	return (
		<Popover isOpen={isOpen} onClose={closePopover}>
			<PopoverTrigger>
				<Box
					style={{ cursor: "pointer" }}
					onMouseEnter={openPopover}
					onMouseLeave={closePopover}
					onClick={openPopover}>
					<i className="ri-user-3-line"></i>
				</Box>
			</PopoverTrigger>
			<StyledPopoverContent onMouseEnter={openPopover} onMouseLeave={closePopover}>
				<PopoverArrow />
				{user ? (
					<>
						<PopoverHeader>Bienvenido, {user.name}</PopoverHeader>
						<PopoverBody>
							<PopoverButtons>
								<Button variant="ghost" mb={2} onClick={goToProfile}>
									Mi Cuenta
								</Button>
								<Button variant="link" color="red.500" onClick={logout}>
									Cerrar Sesión
								</Button>
							</PopoverButtons>
						</PopoverBody>
					</>
				) : (
					<PopoverBody>
						<PopoverButtons>
							<Button variant="outline" mb={2} onClick={goToLogin}>
								Iniciar sesión
							</Button>
							<Button variant="solid" mb={2} onClick={goToRegister}>
								Registrarse
							</Button>
						</PopoverButtons>
					</PopoverBody>
				)}
			</StyledPopoverContent>
		</Popover>
	);
};

export default UserAccounticon;
