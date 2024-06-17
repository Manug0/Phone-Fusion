const { isAuth } = require("../../middlewares/auth");
const uploadFile = require("../../middlewares/uploadFile");
const {
	getUserById,
	getUsers,
	updateUser,
	register,
	login,
	deleteUser,
} = require("../controllers/users");

const uploadConsole = uploadFile("users");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", uploadConsole.single("profilePic"), register);
usersRouter.post("/login", login);
usersRouter.put("/:id", [isAuth], updateUser);
usersRouter.put("/:id", [isAuth], deleteUser);

module.exports = usersRouter;
