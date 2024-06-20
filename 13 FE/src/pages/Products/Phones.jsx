import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import styled from "styled-components";
import CartSVG from "../../components/CartSVG";
import HeartSVG from "../../components/HeartSVG";
import { position } from "@chakra-ui/react";

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
	position: relative;
	width: 250px;
	height: 400px;
	cursor: pointer;
	padding: var(--size-xl);
	border-radius: 10px;
	transition: box-shadow 0.5s;
	border: 0.31px solid;
	border-color: #ffffff66;
	border-radius: 12.5px;
	box-shadow: 1.56px 1.56px 3.12px #a6aabc, -1.56px -1.56px 3.12px #f9faff;
	&:hover {
		background-color: lightblue;
	}
`;

const PhoneImg = styled.img`
	max-width: 250px;
	width: 80%;
	margin: auto;
	height: fit-content;
	border-radius: 8px;
`;

const PhoneCartButton = styled.button`
	display: flex;
	gap: var(--size-xl);
	max-width: 250px;
	width: 100%;
	height: fit-content;
	border-radius: 8px;
`;

const PrevNextButtons = styled.div`
	display: flex;
	gap: var(--size-4xl);
`;

const StyledCartSVG = styled(CartSVG)`
	position: absolute;
	bottom: -50px;
	left: 50%;
	transform: translateX(-50%);
	transition: bottom 0.3s ease-out, opacity 0.3s ease-out, visibility 0.3s;
	opacity: 0;
	visibility: hidden;
	top: var(--size-xl);
	right: var(--size-xl);

	${PhoneCard}:hover & {
		bottom: 10px;
		opacity: 1;
		visibility: visible;
	}
`;

const Phones = () => {
	const [phones, setPhones] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [hoveredPhone, setHoveredPhone] = useState(null);

	const hoverButtons = (phoneId) => {
		setHoveredPhone(phoneId);
	};

	const leaveButtons = () => {
		setHoveredPhone(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchPhones(page);
				setPhones(response.data.phones);
				setTotalPages(response.data.pages);
				// setLoading(false);
			} catch (error) {
				console.error("Error consiguiendo los móviles:", error);
				// setLoading(false);
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
			<PhoneDisplay>
				{phones.map((phone) => (
					<PhoneCard
						key={phone._id}
						phone={phone}
						onMouseEnter={() => hoverButtons(phone._id)}
						onMouseLeave={leaveButtons}>
						<PhoneImg src={phone.imageUrl} alt={phone.name} />
						<p>{phone.name}</p>
						<p>{phone.brand}</p>
						<p>{phone.price}</p>
						<p>{phone.condition}</p>
						{hoveredPhone === phone._id && (
							<PhoneCartButton>
								Añadir al carrito <StyledCartSVG /> <HeartSVG />
							</PhoneCartButton>
						)}
					</PhoneCard>
				))}
			</PhoneDisplay>
			<PrevNextButtons>
				<button onClick={handlePreviousPage} disabled={page === 1}>
					Anterior
				</button>
				<button onClick={handleNextPage} disabled={page === totalPages}>
					Siguiente
				</button>
			</PrevNextButtons>
		</PhoneSection>
	);
};

export default Phones;
