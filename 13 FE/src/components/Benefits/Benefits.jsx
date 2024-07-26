import React from "react";
import { Box, Icon, Text, VStack, HStack } from "@chakra-ui/react";
import { FaShippingFast, FaMoneyBillWave, FaHeadset, FaCreditCard } from "react-icons/fa";
import styled from "styled-components";

const BenefitBox = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--size-md);
	border-radius: var(--size-xs);
	background-color: var(--color-light);
	margin: var(--size-md);
	min-width: 200px;
`;

const BenefitIcon = styled(Icon)`
	color: red;
	margin-right: var(--size-md);
`;

const benefits = [
	{
		icon: FaShippingFast,
		title: "Envio Gratis",
		description: "Para todos los productos",
	},
	{
		icon: FaMoneyBillWave,
		title: "Devoluciones",
		description: "Garantía de 30 días",
	},
	{
		icon: FaHeadset,
		title: "Soporte Online",
		description: " Soporte Técnico 24/7",
	},
	{
		icon: FaCreditCard,
		title: "Pago Seguro",
		description: "Todas las tarjetas aceptadas",
	},
];

const Benefits = () => {
	return (
		<HStack
			spacing={8}
			style={{ display: "flex", justifyContent: "center", padding: "var(--size-2xl)" }}
			flexWrap="wrap"
			gap={{ base: "var(--size-md)" }}
			flexDirection={{ base: "column", md: "row" }}
			gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "none" }}>
			{benefits.map((benefit, index) => (
				<BenefitBox key={index}>
					<BenefitIcon as={benefit.icon} w={6} h={6} />
					<VStack align="start">
						<Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
							{benefit.title}
						</Text>
						<Text fontSize={{ base: "xs", md: "md" }}>{benefit.description}</Text>
					</VStack>
				</BenefitBox>
			))}
		</HStack>
	);
};

export default Benefits;
