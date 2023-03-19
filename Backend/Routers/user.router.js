const express = require("express");
const multer = require("multer");

//* routers
const userRouter = express.Router();

//* Controller
const {
  C_register,
  C_login,
  C_uploadAvatar,
} = require("../Controllers/user.controller");

//* Middleware
const { M_checkEmailExist } = require("../Middlewares/validations/validation");
const { M_uploadAvatar } = require("../Middlewares/Uploads/uploadImg");
const { M_authentication } = require("../Middlewares/auth/authentication");
// const { M_authorize } = require("../Middlewares/auth/authorize");

userRouter.post(`/register`, M_checkEmailExist, C_register);
userRouter.post(`/login`, C_login);
userRouter.post(
  `/upload-avatar`,
  M_authentication,
  M_uploadAvatar("Avatar"),
  C_uploadAvatar
);

module.exports = {
  userRouter,
};
