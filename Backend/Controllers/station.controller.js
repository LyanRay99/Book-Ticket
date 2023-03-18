//* Library
const { Op } = require("sequelize");

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

const C_getStation = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const station = await Station.findAll({
        where: {
          [Op.like]: `%${name}%`,
        },
      });
      res.status(201).send(station);
    } else {
      const station = await Station.findAll();
      res.status(201).send(station);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getStationDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findOne({
      where: {
        id,
      },
    });
    res.status(201).send(station);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_updateStation = async (req, res) => {
  const { id } = req.params;
  const { name, address, province } = req.body;
  try {
    await Station.update(
      {
        name: name,
        address: address,
        province: province,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send(`updated Station have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_deleteStation = async (req, res) => {
  const { id } = req.params;

  try {
    await Station.destroy({
      where: {
        id,
      },
    });
    res.status(201).send(`deleted Station have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  C_createStation,
  C_getStation,
  C_getStationDetail,
  C_updateStation,
  C_deleteStation,
};
