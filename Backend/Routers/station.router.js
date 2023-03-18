const express = require("express");
const stationRouter = express.Router();
const {
  C_createStation,
  C_getStation,
  C_getStationDetail,
  C_updateStation,
  C_deleteStation,
} = require("../Controllers/station.controller");

const stationPath = "/stations";
stationRouter.post(stationPath, C_createStation);
stationRouter.get(stationPath, C_getStation);
stationRouter.get(`${stationPath}/:id`, C_getStationDetail);
stationRouter.put(`${stationPath}/:id`, C_updateStation);
stationRouter.delete(`${stationPath}/:id`, C_deleteStation);

module.exports = {
  stationRouter,
};
