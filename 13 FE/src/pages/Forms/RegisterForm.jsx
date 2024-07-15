import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import { loginUser, registerUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { setUserToLocalStorage } from "../../utils/userHelper";

const FormSection = styled.section`
	position: relative;
	display: flex;
	height: fit-content;
	width: 100%;
	justify-content: space-around;
`;

const FormContainer = styled.div`
	width: 50%;
	margin: var(--size-6xl) 0;
`;

const ReturnToLogin = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	top: var(--size-4xl);
	left: var(--size-4xl);
	cursor: pointer;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	margin: auto;
	width: 50%;
	height: 100%;
`;

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toast = useToast();
	const navigate = useNavigate();

	const goToHome = () => navigate("/");
	const goBackToLogin = () => navigate("/login");
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const registerResponse = await registerUser(data.name, data.email, data.password);
			console.log("Registro de usuario completado", registerResponse);

			if (registerResponse.status === 201) {
				const loginResponse = await loginUser(data.email, data.password);
				console.log("Sesión iniciada correctamente", loginResponse);

				setUserToLocalStorage(loginResponse.data);

				localStorage.setItem("user", JSON.stringify(loginResponse.data));

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
			} else {
				console.error(registerResponse.data.message || "Error al registrarse");
			}
		} catch (error) {
			console.error("Error en la solicitud de registro o inicio de sesión:", error);
		}
	};

	return (
		<>
			<FormSection>
				<ReturnToLogin onClick={goBackToLogin}>
					<ArrowBackIcon boxSize={6} />
					Volver a iniciar sesión
				</ReturnToLogin>

				<FormContainer style={{ display: "flex", flexDirection: "column", gap: "var(--size-5xl)" }}>
					<h2 style={{ fontSize: "var(--size-2xl)" }}>Ingresa tus datos</h2>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormControl isInvalid={errors.name}>
							<FormLabel>
								Nombre <span style={{ color: "red" }}>*</span>
							</FormLabel>
							<Input
								pl="var(--size-xs)"
								size="lg"
								{...register("name", { required: "El nombre es obligatorio" })}
							/>
							<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.email}>
							<FormLabel>
								Correo electrónico <span style={{ color: "red" }}>*</span>
							</FormLabel>
							<Input
								pl="var(--size-xs)"
								size="lg"
								{...register("email", {
									required: "El correo electrónico es obligatorio",
									pattern: {
										value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
										message: "Formato de email incorrecto",
									},
								})}
							/>
							<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.password}>
							<FormLabel>
								Contraseña <span style={{ color: "red" }}>*</span>
							</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									pl="var(--size-xs)"
									size="lg"
									{...register("password", {
										required: "La contraseña es obligatoria",
										pattern: {
											// value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
											message:
												"La contraseña debe incluir números, letras Mayúsculas y minúsculas y como mínimo 4 caracteres",
										},
									})}
								/>
								<InputRightElement width="4.5rem">
									<Button h="2.25rem" size="sm" mt="8px" onClick={handleClickShowPassword}>
										{showPassword ? <i class="ri-eye-line"></i> : <i class="ri-eye-off-line"></i>}
									</Button>
								</InputRightElement>
							</InputGroup>

							<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.confirmPassword}>
							<FormLabel>Confirma tu contraseña</FormLabel>
							<InputGroup>
								<Input
									type={showConfirmPassword ? "text" : "password"}
									pl="var(--size-xs)"
									size="lg"
									{...register("confirmPassword", {
										required: "La confirmación de la contraseña es obligatoria",
									})}
								/>
								<InputRightElement width="4.5rem">
									<Button h="2.25rem" size="sm" mt="8px" onClick={handleClickShowConfirmPassword}>
										{showConfirmPassword ? (
											<i class="ri-eye-line"></i>
										) : (
											<i class="ri-eye-off-line"></i>
										)}
									</Button>
								</InputRightElement>

								<FormErrorMessage>
									{errors.confirmPassword && errors.confirmPassword.message}
								</FormErrorMessage>
							</InputGroup>
						</FormControl>

						<p>
							Al proceder, confirma que acepta nuestra/s{" "}
							<Button colorScheme="teal" variant="link">
								Condiciones generales
							</Button>{" "}
							y{" "}
							<Button colorScheme="teal" variant="link">
								Política de privacidad
							</Button>{" "}
						</p>

						<Button
							type="submit"
							bg="var(--color-tertiary)"
							_hover={{ bg: "var(--color-secondary)" }}
							_active={{
								bg: "var(--color-quaternary)",
								transform: "scale(0.98)",
							}}
							variant="solid"
							fontWeight="var(--font-weight-semibold)"
							w="50%">
							Registrarse
						</Button>
					</Form>
				</FormContainer>
			</FormSection>
		</>
	);
};

export default RegisterForm;
