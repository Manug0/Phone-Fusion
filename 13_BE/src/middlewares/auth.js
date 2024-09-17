const User = require("../api/models/users");
const { verifyKey } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const parsedToken = token.replace("Bearer ", "");

		const { id } = verifyKey(parsedToken);
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		user.password = null;
		req.user = user;
		next();
	} catch (error) {
		return res.status(400).json("No estás autorizado");
	}
};

module.exports = { isAuth };
