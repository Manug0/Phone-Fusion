const Phone = require("../models/phones");

const getPhones = async (req, res, next) => {
	try {
		const phone = await Phone.find().populate("saleId");
		return res.status(200).json(phone);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const getPhoneById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const phones = await Phone.findById(id).populate("saleId");
		return res.status(200).json(phones);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const updatePhone = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updates = { ...req.body };
		const phoneUpdated = await Phone.findByIdAndUpdate(id, updates, { new: true });
		return res.status(200).json({ message: "Móvil actualizado", phoneUpdated });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const deletePhone = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedPhone = await Phone.findByIdAndDelete(id);
		return res.status(200).json({ message: "Móvil eliminado", deletedPhone });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

module.exports = { getPhones, getPhoneById, updatePhone, deletePhone };
