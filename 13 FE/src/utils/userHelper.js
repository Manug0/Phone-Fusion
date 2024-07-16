export const getUserFromLocalStorage = () => {
	const userString = localStorage.getItem("user");
	if (!userString) return null;

	const userData = JSON.parse(userString);
	const user = userData.user;

	if (!user) return null;

	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		token: userData.token,
	};
};
export const setUserToLocalStorage = (userData) => {
	console.log("Guardando datos de usuario en localStorage:", userData);

	const userToStore = userData.user ? { ...userData.user, token: userData.token } : userData;

	localStorage.setItem("user", JSON.stringify(userToStore));
};
