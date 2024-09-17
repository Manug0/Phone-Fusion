const Client = require("../models/clients");
const Sale = require("../models/sales");
const Phone = require("../models/phones");

const getSales = async (req, res, next) => {
	try {
		const sale = await Sale.find().populate("clients").populate("phones");
		return res.status(200).json(sale);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const getSaleById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const sales = await Sale.findById(id).populate("clients").populate("phones");
		return res.status(200).json(sales);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const createSale = async (req, res, next) => {
	try {
		const { clientId, items, saleDate } = req.body;

		const newSale = new Sale({ clientId, items, saleDate });
		const savedSale = await newSale.save();

		const client = await Client.findById(clientId);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}

		client.saleId.push(savedSale._id);
		await client.save();

		for (const item of items) {
			const phone = await Phone.findById(item.phoneId);
			if (phone) {
				phone.saleId.push(savedSale._id);
				await phone.save();
			}
		}

		return res.status(201).json(savedSale);
	} catch (error) {
		console.error(error);
		return res.status(400).json({ error: "Error creating sale", details: error.message });
	}
};

const updateSale = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updates = { ...req.body };
		const saleUpdated = await Sale.findByIdAndUpdate(id, updates, { new: true });
		return res.status(200).json({ message: "Venta actualizada", saleUpdated });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

module.exports = { getSales, getSaleById, createSale, updateSale };
