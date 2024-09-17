const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log("Conectado correctamente ✅");
	} catch (error) {
		console.log(error, "Error al conectar ❌");
	}
};

module.exports = { connectDB };
