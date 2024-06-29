const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
	{
		clientId: { type: mongoose.Types.ObjectId, required: false, ref: "clients" },
		review: { type: String, required: true },
		rating: { type: Number, required: true },
		clientPublicName: { type: String, required: true },
	},
	{
		_id: false,
		timestamps: true,
	}
);

const phoneSchema = new mongoose.Schema(
	{
		phoneId: { type: Number, required: true, unique: true },
		name: { type: String, required: true },
		brand: { type: String, required: true },
		price: { type: Number, required: true },
		condition: { type: String, required: true },
		reviews: [reviewSchema],
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
