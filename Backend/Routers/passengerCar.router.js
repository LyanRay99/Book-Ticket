/*
 * Completed: Role:
 * Create: Admin
 * Read: All customer
 * Read detail: All customer
 * Update: Admin
 * Delete: Admin
 * Upload: Admin
 *
 * Completed: Validations
 * Create: Check authentication, check authorize, Check name exist, check trip_id exist?
 * Read: No
 * Read detail: Check Id Exist
 * Update: check authentication, check authorize, check Id exist, check name exist, check trip_id exist
 * Delete: check authentication,check authorize, check Id exist
 * Upload: check authentication,check authorize, validate image
 */

//* Library
const express = require("express");

//* Model
const { passengerCarCompanies } = require("../models");

//* routers
const psgCarCpnRouter = express.Router();

//* Controller
const {
  C_createPsgCCpn,
  C_getPsgCCpn,
  C_getPsgCCpnDetail,
  C_updatePsgCCpn,
  C_deletePsgCCpn,
} = require("../Controllers/passengerCar.controller");

//* Middleware
const { M_checkID } = require("../Middlewares/validations/validation");
const { M_authentication } = require("../Middlewares/auth/authentication");
const { M_authorize } = require("../Middlewares/auth/authorize");
const {
  M_checkNameDuplicate,
  M_checkNameDuplicateUpdate,
} = require("../Middlewares/validations/station.validate");
const {
  M_checkTrip_ID,
} = require("../Middlewares/validations/passengerCar.validate");

psgCarCpnRouter.post(
  "/",
  M_authentication,
  M_authorize,
  M_checkTrip_ID,
  M_checkNameDuplicate(psgCarCpnRouter),
  C_createPsgCCpn
);
psgCarCpnRouter.get("/", C_getPsgCCpn);
psgCarCpnRouter.get(
  `/:id`,
  M_checkID(passengerCarCompanies),
  C_getPsgCCpnDetail
);
psgCarCpnRouter.put(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(passengerCarCompanies),
  M_checkTrip_ID,
  M_checkNameDuplicateUpdate(passengerCarCompanies),
  C_updatePsgCCpn
);
psgCarCpnRouter.delete(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(passengerCarCompanies),
  C_deletePsgCCpn
);

module.exports = {
  psgCarCpnRouter,
};
