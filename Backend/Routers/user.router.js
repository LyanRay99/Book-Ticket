const express = require("express");

//* routers
const userRouter = express.Router();

//* Controller
const { C_register } = require("../Controllers/user.controller");

//* Middleware
// const { checkID } = require("../Middlewares/Middleware");

userRouter.post(`/register`, C_register);
// stationRouter.get(stationPath, C_getStation);
// stationRouter.get(`${stationPath}/:id`, checkID, C_getStationDetail);
// stationRouter.put(`${stationPath}/:id`, checkID, C_updateStation);
// stationRouter.delete(`${stationPath}/:id`, checkID, C_deleteStation);

module.exports = {
  userRouter,
};
