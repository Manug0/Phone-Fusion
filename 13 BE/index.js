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

app.use(cors());

app.use(express.json());

app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/phones", phonesRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/users", usersRouter);

app.use("*", (req, res, next) => {
	return res.status(404).json("Route Not Found");
});

app.listen(3000, () => {
	console.log("http://localhost:3000");
});
