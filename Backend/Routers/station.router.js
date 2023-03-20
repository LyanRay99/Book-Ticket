/*
 * Completed: Role:
 * Create: Admin
 * Read: All customer
 * Read detail: All customer
 * Update: Admin
 * Delete: Admin
 *
 * Completed: Validations
 * Create: check authentication, Check duplicate
 * Read: No,
 * Read detail: Check Id Exist
 * Update: check authentication, check Id exist, check duplicate (If the same "name", check the id to decide next or not)
 * Delete: check authentication, check Id exist
 */

//* Library
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
const {
  M_checkNameDuplicate,
  M_checkNameDuplicateUpdate,
} = require("../Middlewares/validations/station.validate");

stationRouter.post(
  "/",
  M_authentication,
  M_authorize,
  M_checkNameDuplicate,
  C_createStation
);
stationRouter.get("/", C_getStation);
stationRouter.get(`/:id`, M_checkID(Station), C_getStationDetail);
stationRouter.put(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Station),
  M_checkNameDuplicateUpdate,
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
