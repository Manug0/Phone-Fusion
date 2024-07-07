import React, { useState, useEffect } from "react";
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	Box,
	Tooltip,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import styled from "styled-components";
import { fetchPhones } from "../../services/Api";

const PriceH2 = styled.h2`
	font-size: var(--size-xl);
	font-weight: var(--font-weight-semibold);
	color: var(--color-dark);
	margin-bottom: var(--size-xl);
`;

const PriceSlider = ({ onChange }) => {
	const [sliderValues, setSliderValues] = useState([0, 1000]);
	const [showTooltip, setShowTooltip] = useState(false);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [inputValues, setInputValues] = useState([0, 1000]);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetchPhones(1, 100);
				const phones = response.data.phones;

				if (Array.isArray(phones)) {
					const prices = phones.map((phone) => phone.price);
					const min = Math.min(...prices);
					const max = Math.max(...prices);

					setMinPrice(min);
					setMaxPrice(max);
					setSliderValues([min, max]);
					setInputValues([min, max]);
				} else {
					console.error("Error: phones no es un array");
				}
			} catch (error) {
				console.error("Error fetching phone prices:", error);
			}
		};

		fetchPrices();
	}, []);

	useEffect(() => {
		onChange(sliderValues);
	}, [sliderValues, onChange]);

	const handleSliderChange = (val) => {
		setSliderValues(val);
		setInputValues(val);
	};

	const handleInputChange = (index, value) => {
		const newValues = [...inputValues];
		newValues[index] = value === "" ? "" : Number(value);
		setInputValues(newValues);

		if (value === "") return;

		const numericValues = [...sliderValues];
		numericValues[index] = Number(value);
		setSliderValues(numericValues);
	};

	const handleInputBlur = (index) => {
		if (inputValues[index] === "") {
			const newValues = [...inputValues];
			newValues[index] = sliderValues[index];
			setInputValues(newValues);
		}
	};

	return (
		<div>
			<PriceH2>Precio</PriceH2>
			<RangeSlider
				aria-label={["min", "max"]}
				min={minPrice}
				max={maxPrice}
				value={sliderValues}
				onChange={handleSliderChange}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}>
				<RangeSliderTrack>
					<RangeSliderFilledTrack />
				</RangeSliderTrack>
				{sliderValues.map((value, index) => (
					<Tooltip
						key={index}
						hasArrow
						bg="blue.500"
						color="white"
						placement="top"
						isOpen={showTooltip}
						label={`${value}`}>
						<RangeSliderThumb index={index} />
					</Tooltip>
				))}
			</RangeSlider>
			<Box display="flex" justifyContent="space-between" mt="4">
				<InputGroup>
					<InputLeftElement children="€" />
					<Input
						type="number"
						value={inputValues[0]}
						min={minPrice}
						max={inputValues[1]}
						onChange={(e) => handleInputChange(0, e.target.value)}
						onBlur={() => handleInputBlur(0)}
					/>
				</InputGroup>
				<InputGroup>
					<InputRightElement children="€" />
					<Input
						type="number"
						value={inputValues[1]}
						min={inputValues[0]}
						max={maxPrice}
						onChange={(e) => handleInputChange(1, e.target.value)}
						onBlur={() => handleInputBlur(1)}
					/>
				</InputGroup>
			</Box>
		</div>
	);
};

export default PriceSlider;
