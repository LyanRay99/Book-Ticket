/*
 * Completed: Role:
 * Create: Admin, User(Register)
 * Read: Admin
 * Read detail: Admin, User (profile of user)
 * Update: Admin, User (change profile).
 * Delete: Admin
 * Upload: Admin, User
 *
 * Completed: Validations
 * Create: Check email duplicate
 * Read: check authentication
 * Read detail: check authentication, Check Id Exist
 * Update: check authentication, check Id exist, check duplicate (If the same "name", check the id to decide next or not)
 * Delete: check authentication, check Id exist
 * Upload: check authentication, validate image
 */

//* Library
const express = require("express");

//* model
const { Users } = require("../models");

//* routers
const userRouter = express.Router();

//* Controller
const {
  C_register,
  C_login,
  C_uploadAvatar,
  C_getUsers,
  C_getUsersDetail,
  C_updateUsers,
  C_deleteUsers,
} = require("../Controllers/user.controller");

//* Middleware
const {
  M_checkEmailExist,
  M_checkID,
} = require("../Middlewares/validations/validation");
const { M_uploadAvatar } = require("../Middlewares/Uploads/uploadImg");
const { M_authentication } = require("../Middlewares/auth/authentication");
const { M_authorize } = require("../Middlewares/auth/authorize");

userRouter.post(`/register`, M_checkEmailExist, C_register);
userRouter.post(`/login`, C_login);
userRouter.post(
  `/upload-avatar`,
  M_authentication,
  M_uploadAvatar("Avatar"),
  C_uploadAvatar
);
userRouter.get(`/`, M_authentication, M_authorize, C_getUsers);
userRouter.get(`/:id`, M_authentication, M_checkID(Users), C_getUsersDetail);
userRouter.put(`/:id`, M_authentication, M_checkID(Users), C_updateUsers);
userRouter.delete(
  `/:id`,
  M_authentication,
  M_authorize,
  M_checkID(Users),
  C_deleteUsers
);

module.exports = {
  userRouter,
};
