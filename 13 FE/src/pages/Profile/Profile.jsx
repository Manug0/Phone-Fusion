import React from "react";

const Profile = () => {
	const user = localStorage.getItem("user");

	return (
		<div>
			<p>{user.name}</p>
			<p>{user.email}</p>
		</div>
	);
};

export default Profile;
