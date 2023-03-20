const { Trip } = require("../../models");

const M_checkTrip_ID = async (req, res, next) => {
  const { trip_id } = req.body;

  const checkTripID = await Trip.findOne({
    where: {
      id: trip_id,
    },
  });

  checkTripID
    ? next()
    : res.status(500).send(`Trip have id ${user_id} not existed`);
};

module.exports = {
  M_checkTrip_ID,
};
