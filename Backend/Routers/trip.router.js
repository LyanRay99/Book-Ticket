/*
 * Completed: Role:
 * Create: Admin
 * Read: All customer
 * Read detail: All customer
 * Update: Admin, User (change profile).
 * Delete: Admin
 * Upload: Admin, User
 *
 * Completed: Validations
 * Create: Check fromStation & toStation duplicate (if they same, check startTime to decide next or not)
 * Read: No
 * Read detail: Check Id Exist
 * Update: check authentication, check Id exist, check duplicate (If the same "name", check the id to decide next or not)
 * Delete: check authentication, check Id exist
 * Upload: check authentication, validate image
 */

//* Library
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
  M_checkIdStation(),
  checkStartTime(),
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
