//* import model
const { Station } = require("../models");

const C_createStation = async (req, res) => {
  const { name, address, province } = req.body;
  try {
    const station = await Station.create({ name, address, province });
    res.status(201).send(station);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  C_createStation,
};
