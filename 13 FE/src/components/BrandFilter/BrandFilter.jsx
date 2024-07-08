import React, { useEffect, useState } from "react";
import { fetchPhones } from "../../services/Api";
import { Checkbox } from "@chakra-ui/react";
import styled from "styled-components";

const BrandsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--size-xs);
	width: 50%;
	margin: auto;
	font-weight: var(--font-weight-medium);
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
			onBrandChange(Object.keys(newState).filter((key) => newState[key]));
			return newState;
		});
	};

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await fetchPhones(1, 100);
				const phones = response.data.phones;
				const uniqueBrands = new Set(phones.map((phone) => phone.brand));
				const initialCheckedState = {};
				[...uniqueBrands].forEach((brand) => {
					initialCheckedState[brand] = true;
				});
				setCheckedBrands(initialCheckedState);
				setBrands([...uniqueBrands]);
				onBrandChange([...uniqueBrands]);
			} catch (error) {
				console.error("Error al conseguir las marcas:", error);
			}
		};

		fetchBrands();
	}, []);

	return (
		<div>
			<BrandsH2>Marcas</BrandsH2>
			<BrandsContainer>
				{brands.map((brand, index) => (
					<Checkbox
						key={index}
						defaultChecked={checkedBrands[brand]}
						onChange={() => handleCheck(brand)}>
						{brand}
					</Checkbox>
				))}
			</BrandsContainer>
		</div>
	);
};

export default BrandFilter;
