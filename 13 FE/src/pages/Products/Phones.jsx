import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import styled from "styled-components";
import HeartSVG from "../../components/HeartSVG";
import CartIcon from "../../components/Cart/CartIcon";
import {
	Button,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const PhoneSection = styled.section`
	width: 90%;
	margin: auto;
	padding: var(--size-5xl) 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 60px;
	height: 100%;
	z-index: 2;
`;

const PhoneDisplay = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 60px;
`;

const PhoneCard = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	width: 250px;
	height: 400px;
	cursor: pointer;
	padding: var(--size-xl);
	border-radius: 10px;
	transition: scale 0.3s;

	&:hover {
		scale: 1.01;
		border: 1px solid #ffffff66;
		border-radius: 12.5px;
		box-shadow: 1.56px 1.56px 3.12px #a6aabc, -1.56px -1.56px 3.12px #f9faff;
	}
`;

const PhoneImg = styled.img`
	max-width: 250px;
	max-height: 166px;
	width: 80%;
	margin: 0 auto;
	height: fit-content;
	border-radius: 8px;
`;

const AddCartButton = styled.button`
	bottom: var(--size-xl);
	left: var(--size-5xl);
	position: absolute;
	display: flex;
	align-items: center;
	gap: var(--size-xs);
	transform: translateY(100px);
	transition: transform 0.3s ease-in-out;

	${PhoneCard}:hover & {
		transform: translateY(0%);
	}
`;

const StyledHeartSVG = styled(HeartSVG)`
	position: absolute;
	top: var(--size-sm);
	right: var(--size-sm);
	transform: translateY(-100px);
	transition: transform 0.3s ease-in-out;

	${PhoneCard}:hover & {
		transform: translateY(0%);
	}
`;

const PrevNextButtons = styled.div`
	display: flex;
	gap: var(--size-4xl);
`;

const Phones = ({ onOpen }) => {
	const [phones, setPhones] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchPhones(page);
				setPhones(response.data.phones);
				setTotalPages(response.data.pages);
			} catch (error) {
				console.error("Error consiguiendo los móviles:", error);
			}
		};

		fetchData();
	}, [page]);

	const handleNextPage = () => {
		setPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePreviousPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	return (
		<PhoneSection>
			<Slider aria-label="slider-ex-1" defaultValue={30}>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<PhoneDisplay>
				{phones.map((phone) => (
					<PhoneCard key={phone._id} phone={phone}>
						<PhoneImg src={phone.imageUrl} alt={phone.name} />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "start",
								width: "80%",
								margin: "auto",
								gap: "4px",
							}}>
							<p style={{ fontWeight: "var(--font-weight-semibold)" }}>{phone.name}</p>
							<p style={{ fontWeight: "var(--font-weight-semibold)" }}>{phone.brand}</p>
							<p style={{ fontWeight: "var(--font-weight-bold)" }}>{phone.price}€</p>
							<p style={{ color: phone.condition === "Usado" ? "#e0986e" : "green" }}>
								{phone.condition}
							</p>
						</div>

						<AddCartButton>
							<CartIcon phone={phone} onOpen={onOpen} />
						</AddCartButton>
						<StyledHeartSVG />
					</PhoneCard>
				))}
			</PhoneDisplay>
			<PrevNextButtons>
				<Button
					onClick={handlePreviousPage}
					disabled={page === 1}
					leftIcon={<ArrowBackIcon />}
					variant="outline">
					Anterior
				</Button>
				<Button
					onClick={handleNextPage}
					disabled={page === totalPages}
					rightIcon={<ArrowForwardIcon />}
					variant="outline">
					Siguiente
				</Button>
			</PrevNextButtons>
		</PhoneSection>
	);
};

export default Phones;
