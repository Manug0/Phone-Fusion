const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		brand: { type: String, required: true },
		price: { type: Number, required: true },
		condition: { type: String, required: true },
		review: { type: String, required: false },
		rating: { type: Number, required: false },
		imageUrl: { type: String, required: true },
		saleId: [{ type: mongoose.Types.ObjectId, ref: "sales" }],
	},
	{
		timestamps: true,
		collection: "phones",
	}
);

const Phone = mongoose.model("phones", phoneSchema, "phones");
module.exports = Phone;
