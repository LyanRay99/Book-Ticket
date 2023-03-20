const { Tickets } = require("../models");

const C_createTicket = async (req, res) => {
  const { user_id, trip_id } = req.body;
  try {
    const ticket = await Tickets.create({
      user_id,
      trip_id,
    });
    res.status(201).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getTicket = async (req, res) => {
  try {
    const ticket = await Tickets.findAll();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_getTicketDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Tickets.findOne({
      where: {
        id,
      },
    });
    res.status(201).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_updateTicket = async (req, res) => {
  const { id } = req.params;
  const { user_id, trip_id } = req.body;
  try {
    await Tickets.update(
      {
        user_id: user_id,
        trip_id: trip_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send(`updated Ticket have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const C_deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await Tickets.destroy({
      where: {
        id,
      },
    });
    res.status(201).send(`deleted Ticket have id: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  C_createTicket,
  C_getTicket,
  C_getTicketDetail,
  C_updateTicket,
  C_deleteTicket,
};
