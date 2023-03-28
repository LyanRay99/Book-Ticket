const { Trip } = require("../models");

const C_createTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    const trip = await Trip.create({
      fromStation,
      toStation,
      startTime,
      price,
    });
    res.status(201).send(trip);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getTrip = async (req, res) => {
  try {
    const trip = await Trip.findAll();
    res.status(200).send(trip);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getTripDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findOne({
      where: {
        id,
      },
    });
    res.status(201).send(trip);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_updateTrip = async (req, res) => {
  const { id } = req.params;
  const { fromStation, toStation, starTime, price } = req.body;
  try {
    await Trip.update(
      {
        fromStation: fromStation,
        toStation: toStation,
        starTime: starTime,
        price: price,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send(`updated Trip have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    await Trip.destroy({
      where: {
        id,
      },
    });
    res.status(201).send(`deleted Trip have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  C_createTrip,
  C_getTrip,
  C_getTripDetail,
  C_updateTrip,
  C_deleteTrip,
};
