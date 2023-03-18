const express = require("express");
const rootRouter = express.Router();
const { stationRouter } = require("./station.router");
const { userRouter } = require("./user.router");

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);

module.exports = {
  rootRouter,
};
