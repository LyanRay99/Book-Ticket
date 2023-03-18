const express = require("express");

//* routers
const stationRouter = express.Router();

//* Controller
const {
  C_createStation,
  C_getStation,
  C_getStationDetail,
  C_updateStation,
  C_deleteStation,
} = require("../Controllers/station.controller");

//* Middleware
const { checkID } = require("../Middlewares/station.middleware");

const stationPath = "/stations";
stationRouter.post(stationPath, C_createStation);
stationRouter.get(stationPath, C_getStation);
stationRouter.get(`${stationPath}/:id`, checkID, C_getStationDetail);
stationRouter.put(`${stationPath}/:id`, checkID, C_updateStation);
stationRouter.delete(`${stationPath}/:id`, checkID, C_deleteStation);

module.exports = {
  stationRouter,
};
