const { getClients, getClientById, createClient, updateClient } = require("../controllers/clients");
const { isAuth } = require("../../middlewares/auth");

const clientsRouter = require("express").Router();

clientsRouter.get("/", getClients);
clientsRouter.get("/:id", getClientById);
clientsRouter.post("/", [isAuth], createClient);
clientsRouter.put("/:id", [isAuth], updateClient);

module.exports = clientsRouter;
