//* Library
const bcrypt = require("bcrypt");

//* import model Users
const { Users } = require("../models");

const C_register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
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
      type: "Clients",
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  C_register,
};
