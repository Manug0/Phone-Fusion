const {
	getClients,
	getClientByUserId,
	createClient,
	updateClient,
} = require("../controllers/clients");
const { isAuth } = require("../../middlewares/auth");

const clientsRouter = require("express").Router();

clientsRouter.get("/", getClients);
clientsRouter.get("/:userId", getClientByUserId);
clientsRouter.post("/", [isAuth], createClient);
clientsRouter.put("/:id", [isAuth], updateClient);

module.exports = clientsRouter;
