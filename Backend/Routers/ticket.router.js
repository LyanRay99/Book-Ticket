const express = require("express");

//* Model
const { Tickets } = require("../models");

//* routers
const ticketsRouter = express.Router();

//* Controller
const {
  C_createTicket,
  C_getTicket,
  C_getTicketDetail,
  C_updateTicket,
  C_deleteTicket,
} = require("../Controllers/ticket.controller");

//* Middleware
const { M_checkID } = require("../Middlewares/validations/validation");
const {
  M_checkIdStation,
  checkStartTime,
} = require("../Middlewares/validations/trip.validate");
const { M_authentication } = require("../Middlewares/auth/authentication");
const { M_authorize } = require("../Middlewares/auth/authorize");

ticketsRouter.post("/", M_authentication, C_createTicket);
ticketsRouter.get("/", C_getTicket);
ticketsRouter.get(`/:id`, M_checkID(Tickets), C_getTicketDetail);
ticketsRouter.put(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Trip),
  M_checkIdStation(),
  checkStartTime()
);
ticketsRouter.delete(`/:id`, M_authentication, M_authorize, M_checkID(Trip));

module.exports = {
  ticketsRouter,
};
