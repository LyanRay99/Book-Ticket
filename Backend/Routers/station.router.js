const express = require("express");

//* model
const { Station } = require("../models");

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
const { M_checkID } = require("../Middlewares/validations/validation");
const { M_authentication } = require("../Middlewares/auth/authentication");
const { M_authorize } = require("../Middlewares/auth/authorize");

stationRouter.post("/", M_authentication, M_authorize, C_createStation);
stationRouter.get("/", C_getStation);
stationRouter.get(`/:id`, M_checkID(Station), C_getStationDetail);
stationRouter.put(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Station),
  C_updateStation
);
stationRouter.delete(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Station),
  C_deleteStation
);

module.exports = {
  stationRouter,
};
