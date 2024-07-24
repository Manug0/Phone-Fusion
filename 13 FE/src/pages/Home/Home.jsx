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
	height: 46rem;
	width: 100%;
	background-image: linear-gradient(to right, #2477a7, #24a7a7);
	background-repeat: no-repeat;
	background-size: cover;
`;

const Slogan = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	margin-top: 3rem;
	align-items: start;
	padding: 0 50px;
	color: var(--color-primary);
	width: 100%;
`;

const SmallSlogan = styled.span`
	font-size: var(--size-6xl);
	font-weight: var(--font-weight-light);
`;

const MediumSlogan = styled.span`
	height: 160px;
	font-size: 8rem;
	font-weight: var(--font-weight-medium);
`;

const LargeSlogan = styled.span`
	height: 200px;
	font-size: 10rem;
	font-weight: var(--font-weight-bold);
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
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	transform: translate(-50%, -50%);
	animation: ${float} 5s ease-in-out infinite;
`;

const CustomButton = styled(Button)`
	background-color: var(--color-dark) !important;
	color: white !important;
	border-radius: 25px;
	padding: 1.5rem 3rem !important;
	font-size: 1.2rem !important;
	font-weight: bold;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease !important;
	border: none;

	&:hover {
		background-color: #1d3c94 !important;
		transform: translateY(-2px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
	}

	&:active {
		background-color: var(--color-dark) !important;
		transform: translateY(1px);
	}
`;

const PromoSection = styled.section`
	padding: 4rem 0;
	background: var(--color-primary);
`;

const ReviewSection = styled.section`
	padding: 4rem 0;
	background: var(--color-primary);
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
				</Slogan>
				<StyledMockup />
				<CustomButton
					fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
					onClick={goToPhones}
					rightIcon={<ChevronRightIcon />}
					backgroundColor="white"
					variant="solid"
					position="absolute"
					left="50px"
					bottom="20px">
					Comprar ahora
				</CustomButton>
			</Hero>
			<Benefits />
			<PromoSection>
				<Box textAlign="center" mb={8}>
					<Text fontSize="3xl" fontWeight="bold">
						Móviles del momento 🔥
					</Text>
				</Box>
				<HStack spacing={8} width="90%" margin="auto" justifyContent="center">
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
							w="full"
							maxW="md">
							<HStack spacing={4}>
								<Image src={phone.imageUrl} alt={phone.name} boxSize="100px" />
								<VStack align="start" spacing={1}>
									<Text fontWeight="bold">{phone.name}</Text>
									<Text>{phone.price}€</Text>
								</VStack>
							</HStack>
						</PhoneBox>
					))}
				</HStack>
			</PromoSection>
			<ReviewSection>
				<Box textAlign="center" mb={8}>
					<Text fontSize="3xl" fontWeight="bold">
						¿Qué dicen nuestros clientes?
					</Text>
				</Box>
				<HStack spacing={8} width="90%" margin="auto" justifyContent="center">
					{reviews.map((review, index) => (
						<Box
							key={index}
							p={5}
							shadow="md"
							borderWidth="1px"
							borderRadius="lg"
							bg="white"
							w="full"
							maxW="md">
							<HStack spacing={4}>
								<Avatar name={review.name} src={review.avatar} />
								<VStack align="start" spacing={1}>
									<Text fontWeight="bold">{review.name}</Text>
									<Text>{review.comment}</Text>
								</VStack>
							</HStack>
						</Box>
					))}
				</HStack>
			</ReviewSection>
		</HomeSection>
	);
};

export default Home;
