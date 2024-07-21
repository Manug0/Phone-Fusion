import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import styled from "styled-components";
import { Button, Spinner, Badge } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import HeartButton from "../../components/HeartButton/HeartButton";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import BrandFilter from "../../components/BrandFilter/BrandFilter";

const PhoneSection = styled.section`
	width: 90%;
	margin: auto;
	padding: var(--size-5xl) 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 60px;
`;

const FilterH2 = styled.h2`
	font-size: var(--size-2xl);
	font-weight: var(--font-weight-bold);
	color: var(--color-dark);
	margin-bottom: var(--size-2xl);
`;

const SearchFilter = styled.div`
	display: flex;
	position: relative;
	right: 20px;
	gap: var(--size-5xl);
	flex-direction: column;
	min-width: 250px;
	height: fit-content;
`;

const SpinnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	min-height: 70vh;
`;

const PhoneDisplay = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 60px;
	width: 100%;
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
	align-items: center;
	gap: var(--size-4xl);
`;

const Phones = ({ onOpen }) => {
	const [phones, setPhones] = useState([]);
	const [filteredPhones, setFilteredPhones] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [priceRange, setPriceRange] = useState([0, 1000]);
	const [selected, setSelected] = useState("6GB x 128GB");

	const navigate = useNavigate();
	const phonesPerPage = 10;

	const goToPhone = (phone) => navigate(`/phone/${phone._id}`);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchPhones(1, 100);
				const allPhones = response.data.phones;
				setPhones(allPhones);
				setFilteredPhones(allPhones);
				setLoading(false);
			} catch (error) {
				console.error("Error consiguiendo los móviles:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleNextPage = () => {
		setPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePreviousPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	useEffect(() => {
		const filtered = phones.filter(
			(phone) =>
				selectedBrands.includes(phone.brand) &&
				phone.price >= priceRange[0] &&
				phone.price <= priceRange[1]
		);
		setFilteredPhones(filtered);
		setPage(1);
	}, [phones, selectedBrands, priceRange]);

	useEffect(() => {
		setTotalPages(Math.ceil(filteredPhones.length / phonesPerPage));
	}, [filteredPhones]);

	const paginatedPhones = filteredPhones.slice((page - 1) * phonesPerPage, page * phonesPerPage);

	if (loading) {
		return (
			<SpinnerContainer>
				<Spinner size="xl" />
			</SpinnerContainer>
		);
	}

	return (
		<PhoneSection>
			<div style={{ display: "flex", width: "100%" }}>
				<SearchFilter>
					<FilterH2>Filtros de búsqueda</FilterH2>
					<PriceSlider onChange={setPriceRange} />
					<BrandFilter onBrandChange={setSelectedBrands} />
				</SearchFilter>

				<PhoneDisplay>
					{paginatedPhones.map((phone) => (
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
			</div>

			<PrevNextButtons>
				<Button
					onClick={handlePreviousPage}
					disabled={page === 1}
					leftIcon={<ArrowBackIcon />}
					variant="outline">
					Anterior
				</Button>
				<div>
					{page} de {totalPages}
				</div>
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
