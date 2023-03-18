//* Library
const bcrypt = require("bcrypt");

//* import model Users
const { Users } = require("../models");

//* register
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

    isAuthentication
      ? res.status(200).send({ message: "Successfully Login" })
      : res.status(404).send({ message: "Incorrect Password" });
  } catch (error) {
    res.status(500).send({ message: "Not Found Email" });
  }
};
module.exports = {
  C_register,
  C_login,
};
