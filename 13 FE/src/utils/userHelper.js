export const getUserFromLocalStorage = () => {
	const userString = localStorage.getItem("user");
	if (!userString) return null;

	const user = JSON.parse(userString);

	if (!user || !user._id) return null;

	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		token: user.token,
		createdAt: user.createdAt,
	};
};

export const setUserToLocalStorage = (userData) => {
	console.log("Guardando datos de usuario en localStorage:", userData);

	const userToStore = userData.user ? { ...userData.user, token: userData.token } : userData;

	localStorage.setItem("user", JSON.stringify(userToStore));
};
