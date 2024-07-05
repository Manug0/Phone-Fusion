import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import styled from "styled-components";
import {
	Button,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Spinner,
	Badge,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import HeartButton from "../../components/HeartButton/HeartButton";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

const SpinnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	min-height: 70vh;
`;

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
`;

const PhoneImg = styled.img`
	max-width: 250px;
	max-height: 166px;
	min-height: 166px;
	width: 80%;
	margin: 0 auto;
	height: fit-content;
	border-radius: 8px;
	transition: scale 0.3s;

	&:hover {
		scale: 1.02;
	}
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

const StyledHeartButton = styled(HeartButton)`
	position: absolute;
	top: var(--size-2xl);
	right: var(--size-2xl);
	width: 24px;
	height: 25px;
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
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [selected, setSelected] = useState("6GB x 128GB");

	const navigate = useNavigate();

	const goToPhone = (phone) => navigate(`/phone/${phone._id}`);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchPhones(page);
				setPhones(response.data.phones);
				setTotalPages(response.data.pages);
				setLoading(false);
			} catch (error) {
				console.error("Error consiguiendo los móviles:", error);
				setLoading(false);
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

	if (loading) {
		return (
			<SpinnerContainer>
				<Spinner size="xl" />
			</SpinnerContainer>
		);
	}

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
					<PhoneCard key={phone._id} phone={phone} onClick={() => goToPhone(phone)}>
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
							<Badge colorScheme={phone.condition === "Usado" ? "orange" : "green"}>
								{phone.condition}
							</Badge>
						</div>

						<AddCartButton>
							<AddToCartButton phone={phone} onOpen={onOpen} selectedOption={selected} />
						</AddCartButton>
						<StyledHeartButton phone={phone} />
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
