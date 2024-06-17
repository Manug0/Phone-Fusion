const { isAdmin } = require("../../middlewares/admin");
const { getPhones, getPhoneById, updatePhone, deletePhone } = require("../controllers/phones");

const phonesRouter = require("express").Router();

phonesRouter.get("/", getPhones);
phonesRouter.get("/:id", getPhoneById);
phonesRouter.put("/:id", [isAdmin], updatePhone);
phonesRouter.delete("/:id", [isAdmin], deletePhone);

module.exports = phonesRouter;
