export const getUserFromLocalStorage = () => {
	const userString = localStorage.getItem("user");
	if (!userString) return null;

	const user = JSON.parse(userString);

	if (user.user) {
		return {
			_id: user.user._id,
			name: user.user.name,
			email: user.user.email,
			token: user.token,
		};
	}

	return user;
};

export const setUserToLocalStorage = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};
