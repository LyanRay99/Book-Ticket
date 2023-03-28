const express = require("express");
const rootRouter = express.Router();
const { stationRouter } = require("./station.router");
const { userRouter } = require("./user.router");
const { tripRouter } = require("./trip.router");
const { ticketsRouter } = require("./ticket.router");
const { psgCarCpnRouter } = require("./passengerCar.router");

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/trips", tripRouter);
rootRouter.use("/tickets", ticketsRouter);
rootRouter.use("/passenger-car-companies", psgCarCpnRouter);

module.exports = {
  rootRouter,
};
