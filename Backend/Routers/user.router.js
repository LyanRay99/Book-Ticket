const express = require("express");

//* routers
const userRouter = express.Router();

//* Controller
const { C_register, C_login } = require("../Controllers/user.controller");

//* Middleware
const { checkEmailExist } = require("../Middlewares/validations/Middleware");

userRouter.post(`/register`, checkEmailExist, C_register);
userRouter.post(`/login`, C_login);
// stationRouter.get(`${stationPath}/:id`, checkID, C_getStationDetail);
// stationRouter.put(`${stationPath}/:id`, checkID, C_updateStation);
// stationRouter.delete(`${stationPath}/:id`, checkID, C_deleteStation);

module.exports = {
  userRouter,
};
