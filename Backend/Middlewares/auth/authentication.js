const JWT = require("jsonwebtoken");

/**
 *
 * @logic
 * * Lấy token mà user gửi lên để check authen
 * * Ta dùng jsonWebToken để mã hóa nó ra
 * * sau đó so sánh với password mà user đã register
 * @return
 * * Nếu đúng thì cho next()
 * * Sai thì báo lỗi
 */
const authentication = async (req, res, next) => {
  const token = req.header("token");

  try {
    const isAuthen = JWT.verify(token, "taidn99");
    console.log(req.user);
    isAuthen
      ? next()
      : res.status(401).send({ message: "You are not logged in" });
  } catch (error) {
    res.status(401).send({ message: "You are not logged in" });
  }
};

module.exports = {
  authentication,
};
