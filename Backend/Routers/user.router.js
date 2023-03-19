const express = require("express");
const multer = require("multer");

//* khai báo storage engine của Multer
const storage = multer.diskStorage({
  //* setup path save image
  destination: (req, res, callback) => {
    callback(null, "./Public/Images/Avatars");
  },

  //* set name of image
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

//* declare middleware upload
const upload = multer({
  storage: storage,

  //* check đuôi file image
  fileFilter: (req, file, callback) => {
    const extensionImage = [".png", ".jpg"];
    const extension = file.originalname.slice(-4);

    extensionImage.includes(extension)
      ? callback(null, true)
      : callback(new Error("extension file image ko hop le"));
  },

  //* check size of image <= 1MB
  limits: {
    fileSize: 1000000,
  },
});

//* routers
const userRouter = express.Router();

//* Controller
const {
  C_register,
  C_login,
  C_uploadAvatar,
} = require("../Controllers/user.controller");

//* Middleware
const { checkEmailExist } = require("../Middlewares/validations/Middleware");

userRouter.post(`/register`, checkEmailExist, C_register);
userRouter.post(`/login`, C_login);
userRouter.post(`/upload-avatar`, upload.single("avatar"), (req, res, next) => {
  res.send("feature upload avatar");
});

module.exports = {
  userRouter,
};
