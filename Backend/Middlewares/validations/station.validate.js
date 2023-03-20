const { Station } = require("../../models");

//* check when create
const M_checkNameDuplicate = async (req, res, next) => {
  const { name } = req.body;

  const checkName = await Station.findOne({
    where: {
      name,
    },
  });

  checkName ? res.status(500).send(`${name} station existed`) : next();
};

//* check when update
const M_checkNameDuplicateUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const checkName = await Station.findOne({
    where: {
      name,
    },
  });

  console.log(typeof checkName.id);
  console.log(typeof id);

  !checkName
    ? next()
    : checkName.id === Number(id)
    ? next()
    : res.status(500).send(`${name} station existed`);
};

module.exports = {
  M_checkNameDuplicate,
  M_checkNameDuplicateUpdate,
};
