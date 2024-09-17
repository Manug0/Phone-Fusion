import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import { Checkbox } from "@chakra-ui/react";
import styled from "styled-components";

const BrandsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--size-xs);
	margin: auto;
	font-weight: var(--font-weight-medium);

	@media (max-width: 756px) {
		width: 80%;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--size-xl);
	}
`;

const BrandsH2 = styled.h2`
	font-size: var(--size-xl);
	font-weight: var(--font-weight-semibold);
	color: var(--color-dark);
	margin-bottom: var(--size-xl);
`;

const BrandFilter = ({ onBrandChange }) => {
	const [brands, setBrands] = useState([]);
	const [checkedBrands, setCheckedBrands] = useState({});

	const handleCheck = (brand) => {
		setCheckedBrands((prevState) => {
			const newState = { ...prevState, [brand]: !prevState[brand] };
			const selectedBrands = Object.keys(newState).filter((key) => newState[key]);
			onBrandChange(selectedBrands);
			localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
			return newState;
		});
	};

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await fetchPhones(1, 100);
				const phones = response.data.phones;
				const uniqueBrands = [...new Set(phones.map((phone) => phone.brand))];

				const savedBrands = JSON.parse(localStorage.getItem("selectedBrands")) || [];
				const initialCheckedState = {};
				uniqueBrands.forEach((brand) => {
					initialCheckedState[brand] = savedBrands.length === 0 || savedBrands.includes(brand);
				});

				setCheckedBrands(initialCheckedState);
				setBrands(uniqueBrands);
				onBrandChange(savedBrands.length === 0 ? uniqueBrands : savedBrands);
			} catch (error) {
				console.error("Error al conseguir las marcas:", error);
			}
		};

		fetchBrands();
	}, [onBrandChange]);

	return (
		<div>
			<BrandsH2>Marcas</BrandsH2>
			<BrandsContainer>
				{brands.map((brand, index) => (
					<Checkbox
						key={index}
						isChecked={checkedBrands[brand]}
						onChange={() => handleCheck(brand)}>
						{brand}
					</Checkbox>
				))}
			</BrandsContainer>
		</div>
	);
};

export default BrandFilter;
