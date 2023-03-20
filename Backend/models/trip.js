"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station, Tickets, passengerCarCompanies }) {
      // define association here
      this.belongsTo(Station, { foreignKey: "fromStation" });
      this.belongsTo(Station, { foreignKey: "toStation" });
      this.hasMany(Tickets, { foreignKey: "trip_id" });
      this.hasMany(passengerCarCompanies, { foreignKey: "trip_id" });
    }
  }
  Trip.init(
    {
      startTime: {
        type: DataTypes.DATE,
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
