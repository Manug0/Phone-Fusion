import React from "react";
import styled, { keyframes } from "styled-components";
import HomeMockup from "../../components/HomePage/HomeMockup";
import { Button } from "@chakra-ui/react";
import "./Home.css";

const HomeSection = styled.section`
	margin-top: var(--size-6xl);
`;

const Hero = styled.div`
	position: relative;
	display: flex;
	height: 50rem;
	width: 100%;
	background-image: linear-gradient(to right, #2477a7, #24a7a7);
	/* background-color: #24a7a7; */
	background-repeat: no-repeat;
	background-size: cover;
`;

const Slogan = styled.h1`
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* flex-wrap: wrap; */
	align-items: start;
	padding: 0 50px;
	color: var(--color-primary);
	width: 100%;
	/* z-index: 1; */
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
	left: 0;
	margin: auto;
	transform: translate(-50%, -50%);
	right: 0;
	animation: ${float} 5s ease-in-out infinite;
`;

const Home = () => {
	return (
		<HomeSection>
			<Hero>
				<Slogan>
					<SmallSlogan>La revolución</SmallSlogan>
					<MediumSlogan>móvil</MediumSlogan>
					<LargeSlogan>empieza aquí</LargeSlogan>
				</Slogan>
				<StyledMockup />
				<Button
					backgroundColor="white"
					variant="solid"
					position="absolute"
					left="50px"
					bottom="20px">
					Comprar ahora
				</Button>
			</Hero>
		</HomeSection>
	);
};

export default Home;
