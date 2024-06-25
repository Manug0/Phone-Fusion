const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		userId: { type: mongoose.Types.ObjectId, ref: "users" },
		saleId: [{ type: mongoose.Types.ObjectId, ref: "sales" }],
	},
	{
		timestamps: true,
		collection: "clients",
	}
);

const Client = mongoose.model("clients", clientSchema, "clients");

module.exports = Client;
