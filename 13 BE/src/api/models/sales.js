const { default: mongoose } = require("mongoose");

const saleSchema = new mongoose.Schema(
	{
		clientId: { type: mongoose.Types.ObjectId, ref: "clients" },
		items: [
			{
				phoneId: [{ type: mongoose.Types.ObjectId, ref: "phones" }],
				quantity: { type: Number, required: true },
				selectedOption: { type: String, required: true },
				price: { type: Number, required: true },
			},
		],
		saleDate: { type: String, required: true },
	},
	{
		timestamps: true,
		collection: "sales",
	}
);

const Sale = mongoose.model("sales", saleSchema, "sales");

module.exports = Sale;
