const { isAdmin } = require("../../middlewares/admin");
const {
	getPhones,
	getAllPhones,
	getPhoneById,
	updatePhone,
	deletePhone,
} = require("../controllers/phones");

const phonesRouter = require("express").Router();

phonesRouter.get("/", getPhones);
phonesRouter.get("/all", getAllPhones);
phonesRouter.get("/:id", getPhoneById);
// phonesRouter.put("/:id", updatePhone);
// phonesRouter.delete("/:id", [isAdmin], deletePhone);

module.exports = phonesRouter;
