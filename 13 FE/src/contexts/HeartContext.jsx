import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserData, updateFavorites } from "../services/Api";

const Heart = createContext();

export const HeartContext = ({ children }) => {
	const [heart, setHeart] = useState([]);

	useEffect(() => {
		const loadHeart = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const response = await getUserData(token);
					if (response.data && response.data.favorites) {
						setHeart(response.data.favorites);
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				const localHeart = JSON.parse(localStorage.getItem("heart") || "[]");
				setHeart(localHeart);
			}
		};
		loadHeart();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			updateFavorites(heart, token).catch((error) =>
				console.error("Error updating favorites:", error)
			);
		}
		localStorage.setItem("heart", JSON.stringify(heart));
	}, [heart]);

	const addHeart = (phone) => {
		setHeart((prevHeart) => {
			if (!prevHeart.some((item) => item._id === phone._id)) {
				return [...prevHeart, phone];
			}
			return prevHeart;
		});
	};

	const removeHeart = (phone, e) => {
		if (e) e.stopPropagation();
		setHeart((prevHeart) => {
			const updatedHeart = prevHeart.filter((h) => h._id !== phone._id);
			localStorage.setItem("heart", JSON.stringify(updatedHeart));
			return updatedHeart;
		});
	};

	useEffect(() => {
		const loadData = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const response = await getUserData(token);
					if (response.data) {
						setHeart(response.data.favorites || []);
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				setHeart([]);
			}
		};
		loadData();
	}, [localStorage.getItem("token")]);

	const heartCount = heart.length;

	return (
		<Heart.Provider value={{ heart, setHeart, addHeart, removeHeart, heartCount }}>
			{children}
		</Heart.Provider>
	);
};

export const useHeart = () => useContext(Heart);
