import React from "react";
import { useCounter } from "../../contexts/CounterContext";
import { IconButton, Box } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const PhoneCounter = ({ productName }) => {
	const { getCounter, incrementCounter, decrementCounter } = useCounter();
	const counter = getCounter(productName);

	const handleIncrease = () => {
		incrementCounter(productName);
	};

	const handleDecrease = () => {
		if (counter > 1) {
			decrementCounter(productName);
		}
	};

	return (
		<Box display="flex" alignItems="center" gap="8px">
			<IconButton icon={<MinusIcon />} onClick={handleDecrease} />
			<span>{counter}</span>
			<IconButton icon={<AddIcon />} onClick={handleIncrease} />
		</Box>
	);
};

export default PhoneCounter;
