const { Station } = require("../../models");

//* check when create
const M_checkNameDuplicate = (Model) => async (req, res, next) => {
  const { name } = req.body;

  const checkName = await Model.findOne({
    where: {
      name,
    },
  });

  checkName ? res.status(500).send(`${name} existed`) : next();
};

//* check when update
const M_checkNameDuplicateUpdate = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const checkName = await Model.findOne({
    where: {
      name,
    },
  });

  !checkName
    ? next()
    : checkName.id === Number(id)
    ? next()
    : res.status(500).send(`${name} existed`);
};

module.exports = {
  M_checkNameDuplicate,
  M_checkNameDuplicateUpdate,
};
