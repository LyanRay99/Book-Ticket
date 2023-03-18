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
const { checkID } = require("../Middlewares/validations/Middleware");
const { authentication } = require("../Middlewares/auth/authentication");

stationRouter.post("/", authentication, C_createStation);
stationRouter.get("/", C_getStation);
stationRouter.get(`/:id`, checkID, C_getStationDetail);
stationRouter.put(`/:id`, authentication, checkID, C_updateStation);
stationRouter.delete(`/:id`, authentication, checkID, C_deleteStation);

module.exports = {
  stationRouter,
};
