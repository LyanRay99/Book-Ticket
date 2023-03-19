/*
 * Role for user
 */
const M_authorize = async (req, res, next) => {
  const { user } = req;

  //* check role của user có là Admin không
  if (["Admin"].findIndex((ele) => ele === user.type) > -1) {
    next();
  } else {
    res.status(403).send("You logged in but you aren't Admin");
  }
};

module.exports = {
  M_authorize,
};
