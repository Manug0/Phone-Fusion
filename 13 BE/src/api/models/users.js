const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: false },
		email: { type: String, required: true },
		password: { type: String, required: true },
		// clientId: [{ type: mongoose.Types.ObjectId, ref: "clients" }],
		inCart: [{ type: mongoose.Types.ObjectId, ref: "phones" }],
		// profilePic: { type: String, required: false },
		rol: {
			type: String,
			required: false,
			default: "user",
			enum: ["admin", "user"],
		},
	},
	{
		timestamps: true,
		collection: "users",
	}
);

userSchema.pre("save", function () {
	this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;
