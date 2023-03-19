const express = require("express");

//* Model
const { Trip } = require("../models");

//* routers
const tripRouter = express.Router();

//* Controller
const {
  C_createTrip,
  C_getTrip,
  C_getTripDetail,
  C_updateTrip,
  C_deleteTrip,
} = require("../Controllers/trip.controller");

//* Middleware
const { M_checkID } = require("../Middlewares/validations/validation");
const {
  M_checkIdStation,
  checkStartTime,
} = require("../Middlewares/validations/trip.validate");
const { M_authentication } = require("../Middlewares/auth/authentication");
const { M_authorize } = require("../Middlewares/auth/authorize");

tripRouter.post(
  "/",
  M_authentication,
  M_authorize,
  M_checkIdStation(),
  checkStartTime(),
  C_createTrip
);
tripRouter.get("/", C_getTrip);
tripRouter.get(`/:id`, M_checkID(Trip), C_getTripDetail);
tripRouter.put(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Trip),
  C_updateTrip
);
tripRouter.delete(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Trip),
  C_deleteTrip
);

module.exports = {
  tripRouter,
};
