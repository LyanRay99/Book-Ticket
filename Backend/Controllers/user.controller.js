//* Library
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const gravatar = require("gravatar");

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

    //* create image default
    const userAvatar = gravatar.url(email);

    const newUser = await Users.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      type,
      avatar: userAvatar,
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

  res.status(200).send({
    message: "feature upload avatar",
    user: userInfo,
    file: file,
  });
};

const C_getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getUsersDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({
      where: {
        id,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_updateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, password, numberPhone } = req.body;
  try {
    await Users.update(
      {
        name: name,
        password: password,
        numberPhone: numberPhone,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send(`updated User have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    await Users.destroy({
      where: {
        id,
      },
    });
    res.status(201).send(`deleted User have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  C_register,
  C_login,
  C_uploadAvatar,
  C_getUsers,
  C_getUsersDetail,
  C_updateUsers,
  C_deleteUsers,
};
