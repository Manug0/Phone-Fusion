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
		const { name, email, userId } = req.body;

		if (!name || !email || !userId) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const newClient = new Client({
			name,
			email,
			userId,
		});

		const savedClient = await newClient.save();

		return res.status(201).json(savedClient);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error creating client", details: error.message });
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
