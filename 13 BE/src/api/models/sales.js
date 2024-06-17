const { default: mongoose } = require("mongoose");

// review, rating a phone?

const saleSchema = new mongoose.Schema(
	{
		clientId: { type: mongoose.Types.ObjectId, ref: "clients" },
		phoneId: { type: mongoose.Types.ObjectId, ref: "phones" },
		// review: { type: String, required: true },
		// rating: { type: Number, required: true },
		saleDate: { type: String, required: true },
	},
	{
		timesmtaps: true,
		collection: "sales",
	}
);

const Sale = mongoose.model("sales", saleSchema, "sales");

module.exports = Sale;
