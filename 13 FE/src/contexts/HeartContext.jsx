import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserData, updateFavorites } from "../services/Api";
import { getUserFromLocalStorage } from "../utils/userHelper";

const Heart = createContext();

export const HeartContext = ({ children }) => {
	const [heart, setHeart] = useState([]);
	const [isFavoritesUpdated, setIsFavoritesUpdated] = useState(false);

	useEffect(() => {
		const loadHeart = async () => {
			const user = getUserFromLocalStorage();
			const token = user ? user.token : null;
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
		if (isFavoritesUpdated) {
			const user = getUserFromLocalStorage();
			const token = user ? user.token : null;
			if (token) {
				updateFavorites(heart, token)
					.then(() => setIsFavoritesUpdated(false))
					.catch((error) => console.error("Error updating favorites:", error));
			}
			localStorage.setItem("heart", JSON.stringify(heart));
		}
	}, [heart, isFavoritesUpdated]);

	const addHeart = (phone) => {
		setHeart((prevHeart) => {
			if (!prevHeart.some((item) => item._id === phone._id)) {
				setIsFavoritesUpdated(true);
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
			setIsFavoritesUpdated(true);
			return updatedHeart;
		});
	};

	const heartCount = heart.length;

	return (
		<Heart.Provider value={{ heart, setHeart, addHeart, removeHeart, heartCount }}>
			{children}
		</Heart.Provider>
	);
};

export const useHeart = () => useContext(Heart);
