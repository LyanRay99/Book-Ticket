"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station }) {
      // define association here
      this.belongsTo(Station, { foreignKey: "fromStation" });
      this.belongsTo(Station, { foreignKey: "toStation" });
    }
  }
  Trip.init(
    {
      starTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
