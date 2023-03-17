const express = require("express");
const rootRouter = express.Router();
const { stationRouter } = require("./station.router");

rootRouter.use("/stations", stationRouter);

module.exports = {
  rootRouter,
};
