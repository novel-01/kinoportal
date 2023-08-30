const authRouter = require("./auth.route");
const filmRouter = require("./film.route");
const userRouter = require("./user.route");
const ordersRouter = require("./orders.route");

module.exports = [authRouter, filmRouter, userRouter, ordersRouter];
