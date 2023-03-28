/*
 * Completed: Role:
 * Create: Admin, User(Register)
 * Read: All customer
 * Read detail: All customer
 * Update: Admin
 * Delete: Admin, User (cancel ticket)
 *
 * Completed: Validations
 * Create: check authentication, Check user_id & trip_id existed
 * Read: No
 * Read detail: Check Id Exist
 * Update: check authentication, check authorize, check Id exist
 * Delete: check authentication, check Id exist
 */

//* Library
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
const { M_authentication } = require("../Middlewares/auth/authentication");
const { M_authorize } = require("../Middlewares/auth/authorize");
const {
  M_checkTicketExist,
  M_checkTicketExistUpdate,
} = require("../Middlewares/validations/ticket.validate");

ticketsRouter.post("/", M_authentication, M_checkTicketExist, C_createTicket);
ticketsRouter.get("/", C_getTicket);
ticketsRouter.get(`/:id`, M_checkID(Tickets), C_getTicketDetail);
ticketsRouter.put(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Tickets),
  M_checkTicketExistUpdate,
  C_updateTicket
);
ticketsRouter.delete(
  `/:id`,
  M_authentication,
  M_checkID(Tickets),
  C_deleteTicket
);

module.exports = {
  ticketsRouter,
};
