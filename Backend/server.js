const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { sequelize } = require("./models");
const { rootRouter } = require("./Routers/router");

//* convert request & response => json
app.use(express.json());

//* set static file
//* trỏ đường dẫn từ file server.js (__dirname) => folder Public
const publicPath = path.join(__dirname, "./Public");
app.use(express.static(publicPath));

//* using router
app.use("/api/v1", rootRouter);

app.listen(port, async () => {
  console.log(`server's runing in port ${port}`);

  try {
    await sequelize.authenticate();
    console.log("successfully connection");
  } catch (error) {
    console.log(error);
  }
});
