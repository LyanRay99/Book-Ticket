//* import model Users
const { Users } = require("../models");

const C_register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    const newUser = await Users.create({
      name,
      email,
      password,
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
