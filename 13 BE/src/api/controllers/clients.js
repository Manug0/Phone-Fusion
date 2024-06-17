const Client = require("../models/clients");
const Sale = require("../models/sales");
const User = require("../models/users");

const getClients = async (req, res, next) => {
	try {
		const client = await Client.find().populate("userId").populate("saleId");
		return res.status(200).json(client);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const getClientById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const clients = await Client.findById(id).populate("userId").populate("saleId");
		return res.status(200).json(clients);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const createClient = async (req, res, next) => {
	try {
		const userId = req.user._id;

		const newClient = new Client({
			name: req.user.username,
			email: req.user.email,
		});
		const savedClient = await newClient.save();

		const user = await User.findById(userId);
		user.clientId.push(savedClient._id);
		await user.save();

		return res.status(200).json(savedClient);
	} catch (error) {
		console.error(error);
		return res.status(400).json({ error: "Error al crear cliente", details: error.message });
	}
};

const updateClient = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updates = { ...req.body };
		const clientUpdated = await Client.findByIdAndUpdate(id, updates, { new: true });
		return res.status(200).json({ message: "Cliente actualizado", clientUpdated });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

module.exports = { getClients, getClientById, createClient, updateClient };
