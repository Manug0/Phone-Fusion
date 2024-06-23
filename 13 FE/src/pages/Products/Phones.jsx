import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import styled from "styled-components";
import CartSVG from "../../components/CartSVG";
import HeartSVG from "../../components/HeartSVG";

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
	border: 1px solid #ffffff66;
	border-radius: 12.5px;
	box-shadow: 1.56px 1.56px 3.12px #a6aabc, -1.56px -1.56px 3.12px #f9faff;
	&:hover {
		scale: 1.01;
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

const PhoneName = styled.p`
	font-weight: var(--font-weight-bold);
`;

const PhoneBrand = styled.p`
	max-width: 250px;
	width: 80%;
	margin: auto;
	height: fit-content;
	border-radius: 8px;
`;

const PhonePrice = styled.p`
	max-width: 250px;
	width: 80%;
	margin: auto;
	height: fit-content;
	border-radius: 8px;
`;

const PhoneCondition = styled.p`
	max-width: 250px;
	width: 80%;
	margin: auto;
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

const Phones = () => {
	const [phones, setPhones] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

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
							Añadir al carrito <CartSVG />
						</AddCartButton>
						<StyledHeartSVG />
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
