require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const cors = require("cors");
const usersRouter = require("./src/api/routes/users");
const phonesRouter = require("./src/api/routes/phones");
const salesRouter = require("./src/api/routes/sales");
const clientsRouter = require("./src/api/routes/clients");

const app = express();

connectDB();

const corsOptions = {
	origin: process.env.ALLOWED_ORIGINS
		? process.env.ALLOWED_ORIGINS.split(",")
		: "https://phone-fusion.vercel.app",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/phones", phonesRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/users", usersRouter);

app.use("*", (req, res) => {
	return res.status(404).json("Route Not Found");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
