const { Op } = require("sequelize");
const moment = require("moment");
const { Station } = require("../../models");
const { Trip } = require("../../models");

//* Completed: Validate for Trips
//* check fromStation & toStation equal? and exist in Station?
const M_checkIdStation = () => async (req, res, next) => {
  const { fromStation, toStation } = req.body;

  const checkIdDifferent = fromStation === toStation;
  const checkIdExist = await Station.count({
    where: {
      id: {
        [Op.in]: [fromStation, toStation],
      },
    },
  });

  checkIdDifferent
    ? res.status(404).send(`id: ${fromStation} and ${toStation} equal!`)
    : checkIdExist !== 2
    ? res.status(404).send(`not found id: ${fromStation} or ${toStation}!`)
    : next();
};

//* check starTime when fromStation & toStation existed in Trips
const checkStartTime = () => async (req, res, next) => {
  const { fromStation, toStation, startTime } = req.body;

  const checkStation = await Trip.findOne({
    where: {
      fromStation: fromStation,
      toStation: toStation,
    },
  });

  if (!checkStation) {
    next();
  } else {
    const checkStartTimeDifferent = moment(checkStation.startTime).format(
      "YYYY-MM-DD hh:mm:ss"
    );

    if (checkStartTimeDifferent === startTime) {
      res.status(500).send(`Trip have existed`);
    } else {
      next();
    }
  }
};

module.exports = {
  M_checkIdStation,
  checkStartTime,
};
