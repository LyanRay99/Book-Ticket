const express = require("express");
const stationRouter = express.Router();
const { C_createStation } = require("../Controllers/station.controller");

stationRouter.post("/", C_createStation);

module.exports = {
  stationRouter,
};
