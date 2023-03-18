/*
 * Role for user
 */
const authorize = async (req, res, next) => {
  const { user } = req;
  console.log(user);

  //* check role của user có là Admin không
  if (["Admin"].findIndex((ele) => ele === user.type) > -1) {
    next();
  } else {
    res.status(403).send("You logged in but you aren't Admin");
  }
};

module.exports = {
  authorize,
};
