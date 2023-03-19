//* Library
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

//* import model Users
const { Users } = require("../models");

//* constants
const { url } = require("../Constants/constants");

//* register
const C_register = async (req, res) => {
  const { name, email, password, numberPhone, type } = req.body;
  try {
    //* tạo 1 chuỗi mã hóa để bảo mật password hơn
    const salt = bcrypt.genSaltSync(10);

    //* mã hóa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await Users.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      type,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

//* login
const C_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    //* check password
    //* vì ta đã mã hóa password khi user register nên ta cần dùng bcrypt.compareSync() để ktr password có đúng ko?
    const isAuthentication = bcrypt.compareSync(password, user.password);

    //* create token by jsonwebtoken package
    const token = JWT.sign({ email: user.email, type: user.type }, "taidn99", {
      expiresIn: 60 * 60,
    });

    isAuthentication
      ? res.status(200).send({ message: "Successfully Login", token: token })
      : res.status(404).send({ message: "Incorrect Password" });
  } catch (error) {
    res.status(500).send({ message: "Not Found Email" });
  }
};

const C_uploadAvatar = async (req, res, next) => {
  //* get user, file in request
  const { user, file } = req;

  //* create path of image
  const urlImg = `${url}${file.path}`;

  //* find user info
  const userInfo = await Users.findOne({
    where: {
      email: user.email,
    },
  });

  //* update & save avatar of user
  userInfo.avatar = urlImg;
  await userInfo.save();

  res.send({
    message: "feature upload avatar",
    user: userInfo,
    file: file,
  });
};

module.exports = {
  C_register,
  C_login,
  C_uploadAvatar,
};
