const Phone = require("../models/phones");

const getPhones = async (req, res, next) => {
	const { page = 1, limit = 10 } = req.query;

	try {
		const pageInt = parseInt(page);
		const limitInt = parseInt(limit);

		const phones = await Phone.find()
			.skip((pageInt - 1) * limitInt)
			.limit(limitInt);

		const total = await Phone.countDocuments();

		res.json({
			phones,
			total,
			page: pageInt,
			pages: Math.ceil(total / limitInt),
		});
	} catch (error) {
		res.status(500).json({ message: "Error consiguiendo los móviles", error });
	}
};

const getAllPhones = async (req, res, next) => {
	try {
		const phones = await Phone.find();
		res.json(phones);
	} catch (error) {
		res.status(500).json({ message: "Error consiguiendo los móviles", error });
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
		const phoneUpdated = await Phone.findByIdAndUpdate(id, updates, {
			new: true,
			useFindAndModify: false,
		});
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

module.exports = { getPhones, getAllPhones, getPhoneById, updatePhone, deletePhone };
