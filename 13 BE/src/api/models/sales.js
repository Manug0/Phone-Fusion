const { default: mongoose } = require("mongoose");

const saleSchema = new mongoose.Schema(
	{
		// saleId: { type: String, required: false },
		clientId: { type: mongoose.Types.ObjectId, ref: "clients" },
		phoneIds: [{ type: mongoose.Types.ObjectId, ref: "phones" }],
		// review: { type: String, required: false },
		// rating: { type: Number, required: false },
		saleDate: { type: String, required: true },
	},
	{
		timesmtaps: true,
		collection: "sales",
	}
);

const Sale = mongoose.model("sales", saleSchema, "sales");

module.exports = Sale;
