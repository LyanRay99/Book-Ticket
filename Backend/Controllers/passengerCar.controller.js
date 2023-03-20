//* Library
const { Op } = require("sequelize");

//* import model
const { passengerCarCompanies } = require("../models");

const C_createPsgCCpn = async (req, res) => {
  const { name, image, description, trip_id } = req.body;
  try {
    const PsgCCpn = await passengerCarCompanies.create({
      name,
      image,
      description,
      trip_id,
    });
    res.status(201).send(PsgCCpn);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getPsgCCpn = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const PsgCCpns = await passengerCarCompanies.findAll({
        where: {
          [Op.like]: `%${name}%`,
        },
      });
      res.status(201).send(PsgCCpns);
    } else {
      const PsgCCpns = await passengerCarCompanies.findAll();
      res.status(201).send(PsgCCpns);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getPsgCCpnDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const PsgCCpn = await passengerCarCompanies.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(PsgCCpn);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_updatePsgCCpn = async (req, res) => {
  const { id } = req.params;
  const { name, image, description, trip_id } = req.body;
  try {
    await passengerCarCompanies.update(
      {
        name,
        image,
        description,
        trip_id,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).send(`updated Passenger Car Company have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_deletePsgCCpn = async (req, res) => {
  const { id } = req.params;

  try {
    await passengerCarCompanies.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(`deleted Passenger Car Company have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  C_createPsgCCpn,
  C_getPsgCCpn,
  C_getPsgCCpnDetail,
  C_updatePsgCCpn,
  C_deletePsgCCpn,
};
