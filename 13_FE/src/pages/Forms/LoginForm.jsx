import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
	Alert,
	AlertIcon,
	Button,
	InputGroup,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import { getUserData, loginUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useHeart } from "../../contexts/HeartContext";
import { setUserToLocalStorage } from "../../utils/userHelper";

const FormSection = styled.section`
	display: flex;
	height: fit-content;
	width: 90%;
	margin-top: 6rem;
	justify-content: space-around;

	@media (max-width: 768px) {
		flex-wrap: wrap;
		margin: auto;
		gap: var(--space-4);
		padding: var(--space-4) 0;
	}
`;

const FormContainer = styled.div`
	width: 90%;
	margin: auto;

	@media (max-width: 768px) {
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	margin: auto;
	width: 50%;
	height: 100%;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const FormInput = styled.input`
	width: 100%;
	height: var(--size-5xl);
	padding: var(--size-md);
	border: 1px solid var(--color-dark);
	border-radius: 4px;
`;

const RegisterQuestion = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: var(--size-xl);
	gap: var(--size-5xl);
	width: 50%;
	margin: auto;
	font-size: 18px;

	@media (max-width: 768px) {
		font-size: 14px;
	}
`;

const LoginForm = () => {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();
	const navigate = useNavigate();
	const { setCart } = useCart();
	const { setHeart } = useHeart();

	const goToHome = () => navigate("/");
	const goToRegisterForm = () => navigate("/register");
	const handleClickShow = () => setShow(!show);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const syncCartAndFavorites = async (token) => {
		try {
			const response = await getUserData(token);
			const { cart, favorites } = response.data;

			localStorage.setItem("cart", JSON.stringify(cart));
			localStorage.setItem("heart", JSON.stringify(favorites));

			setCart(cart);
			setHeart(favorites);
		} catch (error) {
			console.error("Error sincronizando datos:", error);
		}
	};

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);

			const response = await loginUser(data.email, data.password);
			let { user, token } = response.data;

			const userData = { ...user, token };
			setUserToLocalStorage(userData);

			await syncCartAndFavorites(token);

			setTimeout(() => {
				goToHome();
			}, 1500);

			toast({
				title: "Sesión iniciada.",
				status: "success",
				position: "top",
				duration: 2000,
				isClosable: true,
			});
		} catch (error) {
			console.error("Error en la solicitud de inicio de sesión:", error);
			toast({
				title: "Error al iniciar sesión.",
				status: "error",
				position: "top",
				duration: 2000,
				isClosable: true,
			});
		}
	};

	return (
		<FormSection>
			<FormContainer style={{ display: "flex", flexDirection: "column", gap: "var(--size-5xl)" }}>
				<h2 style={{ fontSize: "var(--size-2xl)" }}>Acceso para clientes</h2>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						placeholder="Dirección de correo electrónico"
						{...register("email", {
							required: {
								value: true,
								message: "Este campo es obligatorio",
							},
							pattern: {
								value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
								message: "Formato de email incorrecto",
							},
						})}
					/>
					{errors.email ? (
						<Alert status="error">
							<AlertIcon />
							{errors.email.message}
						</Alert>
					) : null}
					<InputGroup size="md">
						<FormInput
							type={show ? "text" : "password"}
							placeholder="Contraseña"
							{...register("password", {
								required: {
									value: true,
									message: "Este campo es obligatorio",
								},
								pattern: {
									message:
										"La contraseña debe incluir números, letras Mayúsculas y minúsculas y como mínimo 4 caracteres",
								},
							})}
						/>
						<InputRightElement width="4.5rem">
							<Button h="2.25rem" size="sm" mt="8px" onClick={handleClickShow}>
								{show ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>}
							</Button>
						</InputRightElement>
					</InputGroup>
					{errors.password ? (
						<Alert status="error">
							<AlertIcon />
							{errors.password.message}
						</Alert>
					) : null}{" "}
					<Button color="var(--color-tertiary)" variant="link">
						Ha olvidado la contraseña?
					</Button>
					<Button
						type="submit"
						bg="var(--color-quaternary)"
						_hover={{ bg: "var(--color-tertiary)" }}
						_active={{
							bg: "var(--color-secondary)",
							transform: "scale(0.98)",
						}}
						variant="solid"
						fontWeight="var(--font-weight-semibold)"
						w="50%"
						minW="130px"
						isLoading={isLoading}>
						Iniciar Sesión
					</Button>
				</Form>
			</FormContainer>
			<RegisterQuestion>
				<h2>Eres nuevo en Phone Fusion?</h2>
				<p>
					Únete a Phone Fusion y descubre una selección exclusiva de móviles de alta calidad con
					ofertas inigualables
				</p>
				<Button
					bg="var(--color-quaternary)"
					_hover={{ bg: "var(--color-tertiary)" }}
					_active={{
						bg: "var(--color-quintary)",
						transform: "scale(0.98)",
					}}
					variant="solid"
					fontWeight="var(--font-weight-semibold)"
					w="50%"
					minW="130px"
					borderRadius="0"
					onClick={goToRegisterForm}>
					Registro
				</Button>
			</RegisterQuestion>
		</FormSection>
	);
};

export default LoginForm;
