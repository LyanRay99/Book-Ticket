const { Station } = require("../../models");
const { Users } = require("../../models");

//* checkID to Get data detail & update & delete
const checkID = async (req, res, next) => {
  const { id } = req.params;

  const check = await Station.findOne({
    where: {
      id,
    },
  });

  check ? next() : res.status(404).send(`not found id: ${id}`);
};

//* check email
const checkEmailExist = async (req, res, next) => {
  const { email } = req.body;
  (await Users.findOne({ where: { email } }))
    ? res.status(409).send("Email exist")
    : next();
};

module.exports = {
  checkID,
  checkEmailExist,
};
