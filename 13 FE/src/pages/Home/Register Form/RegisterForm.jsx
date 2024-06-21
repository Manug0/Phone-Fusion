import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Alert, AlertIcon, Button, useStyleConfig } from "@chakra-ui/react";

const FormSection = styled.section`
	display: flex;
	height: 40rem;
	width: 90%;
	justify-content: space-around;
`;

const FormContainer = styled.div`
	width: 90%;
	margin: auto;
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
`;

const RegisterForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);

	return (
		<>
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
						<FormInput
							type="password"
							placeholder="Contraseña"
							{...register("password", {
								required: {
									value: true,
									message: "Este campo es obligatorio",
								},
								pattern: {
									value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
									message:
										"La contraseña debe incluir números, letras Mayúsculas y minúsculas y como mínimo 4 caracteres",
								},
							})}
						/>
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
							_hover={{ bg: "var(	--color-tertiary)" }}
							_active={{
								bg: "var(--color-secondary)",
								transform: "scale(0.98)",
							}}
							variant="solid"
							fontWeight="var(--font-weight-semibold)"
							w="50%">
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
						borderRadius="0">
						Registro
					</Button>
				</RegisterQuestion>
			</FormSection>
		</>
	);
};

export default RegisterForm;
