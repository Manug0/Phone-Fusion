const { isAuth } = require("../../middlewares/auth");
const {
	getUserById,
	getUsers,
	updateUser,
	register,
	login,
	deleteUser,
	updateCart,
	updateFavorites,
	getUserData,
} = require("../controllers/users");

const usersRouter = require("express").Router();

// usersRouter.post("/update-cart", [isAuth], updateCart);
// usersRouter.post("/update-favorites", [isAuth], updateFavorites);
// usersRouter.get("/user-data", [isAuth], getUserData);

// usersRouter.get("/", getUsers);
// usersRouter.get("/:id", getUserById);
// usersRouter.post("/register", register);
// usersRouter.post("/login", login);
// usersRouter.put("/:id", isAuth, updateUser);
// usersRouter.put("/:id", isAuth, deleteUser);

module.exports = usersRouter;
