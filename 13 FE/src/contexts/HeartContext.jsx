import React, { createContext, useState, useContext, useEffect } from "react";

const Heart = createContext();

export const HeartContext = ({ children }) => {
	const [heart, setHeart] = useState([]);

	useEffect(() => {
		const storedHeart = JSON.parse(localStorage.getItem("heart")) || [];
		setHeart(storedHeart);
	}, []);

	useEffect(() => {
		localStorage.setItem("heart", JSON.stringify(heart));
	}, [heart]);

	const addHeart = (phone) => {
		setHeart((prevHeart) => {
			if (!prevHeart.some((item) => item._id === phone._id)) {
				return [...prevHeart, phone];
			} else {
				return prevHeart;
			}
		});
	};

	const removeHeart = (phone) => {
		setHeart((prevHeart) => prevHeart.filter((h) => h._id !== phone._id));
	};

	const heartCount = heart.length;

	return (
		<Heart.Provider value={{ heart, setHeart, addHeart, removeHeart, heartCount }}>
			{children}
		</Heart.Provider>
	);
};

export const useHeart = () => useContext(Heart);
