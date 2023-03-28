const { Tickets } = require("../../models");
const { Users } = require("../../models");
const { Trip } = require("../../models");

//* check user, trip & ticket exist ? + amount of ticket (max 50 tickets)
const M_checkTicketExist = async (req, res, next) => {
  const { user_id, trip_id } = req.body;

  const checkUser = await Users.findOne({
    where: {
      id: user_id,
    },
  });

  const checkTrip = await Trip.findOne({
    where: {
      id: trip_id,
    },
  });

  const check = await Tickets.findOne({
    where: {
      user_id,
      trip_id,
    },
  });

  const checkTicketAmount = await Tickets.count({
    where: {
      trip_id,
    },
  });

  !checkUser
    ? res.status(500).send(`User have id ${user_id} not existed`)
    : !checkTrip
    ? res.status(500).send(`Trip have id ${trip_id} not existed`)
    : check
    ? res.status(500).send(`Ticket have existed`)
    : checkTicketAmount >= 50
    ? res.status(500).send(`Tickets're sold out`)
    : next();
};

const M_checkTicketExistUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { user_id, trip_id } = req.body;

  const checkUser = await Users.findOne({
    where: {
      id: user_id,
    },
  });

  const checkTrip = await Trip.findOne({
    where: {
      id: trip_id,
    },
  });

  const check = await Tickets.findOne({
    where: {
      user_id,
      trip_id,
    },
  });

  !checkUser
    ? res.status(500).send(`User have id ${user_id} not existed`)
    : !checkTrip
    ? res.status(500).send(`Trip have id ${trip_id} not existed`)
    : check
    ? res.status(500).send(`Ticket have existed`)
    : next();
};

module.exports = {
  M_checkTicketExist,
  M_checkTicketExistUpdate,
};
