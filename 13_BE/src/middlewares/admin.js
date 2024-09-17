const User = require("../api/models/users");
const { verifyKey } = require("../utils/jwt");

const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(400).json("No estás autorizado para realizar esta función");
		}

		const parsedToken = token.replace("Bearer ", "");
		const { id } = verifyKey(parsedToken);
		const user = await User.findById(id);

		if (user.rol === "admin") {
			next();
		} else {
			return res.status(400).json("Sólo un administrador puede realizar esta función");
		}
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { isAdmin };
