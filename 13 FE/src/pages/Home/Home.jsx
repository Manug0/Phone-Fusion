import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import HomeMockup from "../../components/HomePage/HomeMockup";
import { Button, Box, Avatar, Text, VStack, HStack, Image } from "@chakra-ui/react";
import Benefits from "../../components/Benefits/Benefits";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { fetchAllPhones } from "../../services/Api";

const HomeSection = styled.section``;

const Hero = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: auto;
	width: 100%;
	background-image: linear-gradient(to right, #2477a7, #24a7a7);
	background-repeat: no-repeat;
	background-size: cover;
	padding: 2rem 0;

	@media (min-width: 1200px) {
		height: 46rem;
		flex-direction: row;
		align-items: flex-start;
		padding: 0;
	}
`;

const Slogan = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	margin-top: 3rem;
	align-items: center;
	padding: 0 20px;
	color: var(--color-primary);
	width: 100%;
	text-align: center;

	@media (min-width: 1200px) {
		align-items: start;
		text-align: left;
		padding: 0 50px;
	}

	@media (min-width: 300px) {
		margin-top: 1rem;
	}
`;

const SmallSlogan = styled.span`
	font-size: var(--size-xl);

	@media (min-width: 768px) {
		font-size: var(--size-3xl);
	}

	@media (min-width: 1200px) {
		font-size: var(--size-6xl);
	}
`;

const MediumSlogan = styled.span`
	font-size: 2rem;

	@media (min-width: 768px) {
		font-size: 4rem;
	}

	@media (min-width: 1200px) {
		font-size: 8rem;
	}
`;

const LargeSlogan = styled.span`
	font-size: 3rem;

	@media (min-width: 768px) {
		font-size: 5rem;
	}

	@media (min-width: 1200px) {
		font-size: 10rem;
	}
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const StyledMockup = styled(HomeMockup)`
	z-index: 0;
	width: 80%;
	min-width: 350px;
	margin-top: 2rem;
	animation: ${float} 5s ease-in-out infinite;

	@media (min-width: 200px) {
		height: 80%;
	}

	@media (min-width: 768px) {
		width: 60%;
		margin-top: 0;
	}

	@media (min-width: 1200px) {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: auto;
		transform: translate(-50%, -50%);
	}
`;

const CustomButton = styled(Button)`
	background-color: var(--color-dark) !important;
	color: white !important;
	border-radius: 25px;
	padding: 1rem 2rem !important;
	font-size: 1rem !important;
	font-weight: bold;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease !important;
	border: none;
	margin-top: 1rem;

	&:hover {
		background-color: #1d3c94 !important;
		transform: translateY(-2px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
	}

	&:active {
		background-color: var(--color-dark) !important;
		transform: translateY(1px);
	}

	@media (min-width: 768px) {
		padding: 1.5rem 3rem !important;
		font-size: 1.2rem !important;
	}
`;

const PromoSection = styled.section`
	padding: 2rem 0;
	background: var(--color-primary);

	@media (min-width: 768px) {
		padding: 4rem 0;
	}
`;

const ReviewSection = styled.section`
	padding: 2rem 0;
	background: var(--color-primary);

	@media (min-width: 768px) {
		padding: 4rem 0;
	}
`;

const hoverEffect = css`
	transform: translateY(-5px);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const PhoneBox = styled(Box)`
	${({ isHovered }) => isHovered && hoverEffect}
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}
`;

const Home = () => {
	const navigate = useNavigate();
	const [promoPhones, setPromoPhones] = useState([]);
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const goToPhones = () => navigate("/phones");
	const goToPhone = (phone) => navigate(`/phone/${phone._id}`);

	useEffect(() => {
		const fetchPhones = async () => {
			try {
				const { data } = await fetchAllPhones();
				const shuffled = data.sort(() => 0.5 - Math.random());
				setPromoPhones(shuffled.slice(0, 3));
			} catch (error) {
				console.error("Error fetching phones:", error);
			}
		};

		fetchPhones();
	}, []);

	const reviews = [
		{
			name: "Carlos M.",
			comment: "¡Excelente servicio y productos de alta calidad! Muy satisfecho con mi compra.",
			avatar: "https://bit.ly/dan-abramov",
		},
		{
			name: "Ana G.",
			comment: "La atención al cliente es maravillosa. Me ayudaron en todo momento.",
			avatar:
				"https://res.cloudinary.com/dkh8c4ev0/image/upload/v1696502258/samples/outdoor-woman.jpg",
		},
		{
			name: "Luis P.",
			comment: "Los mejores precios y una entrega rápida. Recomendado al 100%.",
			avatar: "https://bit.ly/ryan-florence",
		},
	];

	return (
		<HomeSection>
			<Hero>
				<Slogan>
					<SmallSlogan>La revolución</SmallSlogan>
					<MediumSlogan>móvil</MediumSlogan>
					<LargeSlogan>empieza aquí</LargeSlogan>
					<CustomButton
						onClick={goToPhones}
						rightIcon={<ChevronRightIcon />}
						backgroundColor="white"
						variant="solid">
						Comprar ahora
					</CustomButton>
				</Slogan>
				<StyledMockup />
			</Hero>
			<Benefits
				display="flex"
				flexWrap="wrap"
				justifyContent="center"
				flexDirection={{ base: "column", md: "row" }}
			/>
			<PromoSection>
				<Box textAlign="center" mb={8}>
					<Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
						Móviles del momento 🔥
					</Text>
				</Box>
				<HStack
					spacing={8}
					width="90%"
					margin="auto"
					justifyContent="center"
					flexWrap="wrap"
					flexDirection={{ base: "column", md: "row" }}>
					{promoPhones.map((phone, index) => (
						<PhoneBox
							key={phone._id}
							isHovered={hoveredIndex === index}
							onClick={() => goToPhone(phone)}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							p={5}
							shadow="md"
							borderWidth="1px"
							borderRadius="lg"
							bg="white"
							w={{ base: "full", md: "auto" }}
							maxW="md"
							flexBasis={{ base: "100%", md: "30%" }}>
							<HStack spacing={4}>
								<Image src={phone.imageUrl} alt={phone.name} boxSize="100px" />
								<VStack align="start" spacing={1}>
									<Text fontSize={{ base: "sm", md: "lg" }} fontWeight="bold">
										{phone.name}
									</Text>
									<Text>{phone.price}€</Text>
								</VStack>
							</HStack>
						</PhoneBox>
					))}
				</HStack>
			</PromoSection>
			<ReviewSection>
				<Box textAlign="center" mb={8}>
					<Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
						¿Qué dicen nuestros clientes?
					</Text>
				</Box>
				<VStack spacing={8} width="90%" margin="auto" flexDirection={{ base: "column", md: "row" }}>
					{reviews.map((review, index) => (
						<Box
							key={index}
							p={5}
							shadow="md"
							borderWidth="1px"
							borderRadius="lg"
							bg="white"
							w={{ base: "full", md: "50%" }}
							textAlign="left">
							<HStack spacing={4}>
								<Avatar name={review.name} src={review.avatar} />
								<VStack align="start" spacing={1}>
									<Text fontSize={{ base: "sm", md: "lg" }} fontWeight="bold">
										{review.name}
									</Text>
									<Text fontSize={{ base: "sm", md: "md" }}>{review.comment}</Text>
								</VStack>
							</HStack>
						</Box>
					))}
				</VStack>
			</ReviewSection>
		</HomeSection>
	);
};

export default Home;
