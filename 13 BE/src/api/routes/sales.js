const { isAuth } = require("../../middlewares/auth");
const { getSales, getSaleById, updateSale, createSale } = require("../controllers/sales");

const salesRouter = require("express").Router();

// salesRouter.get("/", getSales);
// salesRouter.get("/:id", getSaleById);
// salesRouter.post("/", [isAuth], createSale);
// salesRouter.put("/:id", [isAuth], updateSale);

module.exports = salesRouter;
