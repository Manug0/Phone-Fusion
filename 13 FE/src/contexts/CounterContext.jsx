import React, { createContext, useContext, useState } from "react";

const Counter = createContext();

export const CounterContext = ({ children }) => {
	const [counter, setCounter] = useState({});

	const incrementCounter = (productName) => {
		setCounter((prevCounter) => ({
			...prevCounter,
			[productName]: (prevCounter[productName] || 0) + 1,
		}));
	};

	const getCounter = (productName) => counter[productName] || 0;

	return (
		<Counter.Provider value={{ counter, setCounter, incrementCounter, getCounter }}>
			{children}
		</Counter.Provider>
	);
};

export const useCounter = () => useContext(Counter);
