const express = require("express");
const rootRouter = express.Router();
const { stationRouter } = require("./station.router");

rootRouter.use("/", stationRouter);

module.exports = {
  rootRouter,
};
