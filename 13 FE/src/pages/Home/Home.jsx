import React from "react";
import styled, { keyframes } from "styled-components";
import HomeMockup from "../../components/HomePage/HomeMockup";
import { Button } from "@chakra-ui/react";
import Benefits from "../../components/Benefits/Benefits";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

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

const Home = () => {
	const navigate = useNavigate();

	const goToPhones = () => navigate("/phones");

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
		</HomeSection>
	);
};

export default Home;
