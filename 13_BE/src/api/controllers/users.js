const { deleteFile } = require("../../utils/deleteFile");
const { generateKey } = require("../../utils/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find().populate("inCart");
		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const users = await User.findById(id).populate("inCart");
		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (req.user._id.toString() !== id) {
			return res.status(400).json("No puedes modificar a alguien que no seas tú");
		}

		const updates = { ...req.body };

		if (req.file) {
			const oldUser = await User.findById(id);
			deleteFile(oldUser.profilePic);
			updates.profilePic = req.file.path;
		}

		const userUpdated = await User.findByIdAndUpdate(id, updates, {
			new: true,
		});

		return res.status(200).json(userUpdated);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);

		if (deletedUser.profilePic) {
			deleteFile(deletedUser.profilePic);
		}

		const deletedClient = await Client.findOneAndDelete({ _id: deletedUser.clientId });

		if (deletedClient) {
			console.log("Cliente eliminado");
		} else {
			console.log("No se encontró un cliente asociado para eliminar");
		}

		return res.status(200).json({ message: "Usuario eliminado", deletedUser });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "El nombre de usuario o email ya existe" });
		}

		const newUser = new User({ name, email, password, rol: "user" });

		const saveUser = await newUser.save();
		return res.status(201).json(saveUser);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !email || !bcrypt.compareSync(password, user.password)) {
			return res.status(400).json("Usuario o contraseña incorrectos");
		}

		const token = generateKey(user._id);
		return res.status(200).json({ user, token });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const updateCart = async (req, res) => {
	try {
		const userId = req.user._id;
		const { cart } = req.body;

		const user = await User.findByIdAndUpdate(userId, { inCart: cart }, { new: true });

		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		return res.status(200).json({ message: "Carrito actualizado", cart: user.inCart });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const updateFavorites = async (req, res) => {
	try {
		const userId = req.user._id;
		const { favorites } = req.body;

		const user = await User.findByIdAndUpdate(userId, { inFav: favorites }, { new: true });

		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		return res.status(200).json({ message: "Favoritos actualizados", favorites: user.inFav });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const getUserData = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		return res.status(200).json({
			cart: user.inCart,
			favorites: user.inFav,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

module.exports = {
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	register,
	login,
	updateCart,
	updateFavorites,
	getUserData,
};
