const { Station } = require("../../models");

const checkID = async (req, res, next) => {
  const { id } = req.params;

  const check = await Station.findOne({
    where: {
      id,
    },
  });

  check ? next() : res.status(404).send(`not found id: ${id}`);
};

module.exports = {
  checkID,
};
