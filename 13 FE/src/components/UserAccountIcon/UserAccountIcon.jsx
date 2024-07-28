import React, { useState, useEffect } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	Button,
	Box,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledPopover = styled(Popover)`
	border: none;
`;

const StyledPopoverContent = styled(PopoverContent)`
	border: none;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

	@media (max-width: 756px) {
		font-size: var(--size-sm);
	}
`;

const PopoverButtons = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledButton = styled(Button)`
	@media (max-width: 756px) {
		font-size: var(--size-xs);
		padding: var(--space-1) var(--space-2);
	}
`;

const StyledPopoverHeader = styled(PopoverHeader)`
	@media (max-width: 756px) {
		font-size: var(--size-sm);
		padding: var(--space-1) var(--space-2);
	}
`;

const UserAccounticon = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();

	const popoverWidth = useBreakpointValue({ base: "200px", md: "280px" });
	const popoverFontSize = useBreakpointValue({ base: "var(--size-sm)", md: "var(--size-md)" });

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 756);
		};

		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);

		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	const storedUser = localStorage.getItem("user");
	let user = null;

	try {
		user = JSON.parse(storedUser);
	} catch (e) {
		console.error("Error parsing user data from localStorage", e);
	}

	const openPopover = () => !isMobile && setIsOpen(true);
	const closePopover = () => !isMobile && setIsOpen(false);
	const togglePopover = () => setIsOpen(!isOpen);

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
		<StyledPopover isOpen={isOpen} onClose={closePopover}>
			<PopoverTrigger>
				<Box
					style={{ cursor: "pointer" }}
					onMouseEnter={openPopover}
					onMouseLeave={closePopover}
					onClick={togglePopover}>
					<i className="ri-user-3-line"></i>
				</Box>
			</PopoverTrigger>
			<StyledPopoverContent
				onMouseEnter={openPopover}
				onMouseLeave={closePopover}
				width={popoverWidth}>
				<PopoverArrow />
				{user ? (
					<>
						<StyledPopoverHeader>Bienvenido, {user.name}</StyledPopoverHeader>
						<PopoverBody>
							<PopoverButtons>
								<StyledButton
									fontSize={popoverFontSize}
									variant="ghost"
									mb={2}
									onClick={goToProfile}>
									Mi Cuenta
								</StyledButton>

								<StyledButton
									fontSize={popoverFontSize}
									variant="link"
									color="red.500"
									onClick={logout}>
									Cerrar Sesión
								</StyledButton>
							</PopoverButtons>
						</PopoverBody>
					</>
				) : (
					<PopoverBody>
						<PopoverButtons>
							<StyledButton fontSize={popoverFontSize} variant="outline" mb={2} onClick={goToLogin}>
								Iniciar sesión
							</StyledButton>
							<StyledButton
								fontSize={popoverFontSize}
								variant="solid"
								mb={2}
								onClick={goToRegister}>
								Registrarse
							</StyledButton>
						</PopoverButtons>
					</PopoverBody>
				)}
			</StyledPopoverContent>
		</StyledPopover>
	);
};

export default UserAccounticon;
