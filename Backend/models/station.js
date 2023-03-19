"use strict";

const { Model } = require("sequelize");
const { cities } = require("../Constants/constants");

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //* liên kết table station và trip
    static associate({ Trip }) {
      // define association here

      //* định nghĩa 1 station có nhiểu trip
      this.hasMany(Trip, { foreignKey: "fromStation" });
      this.hasMany(Trip, { foreignKey: "toStation" });
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkLength(value) {
            if (value.length >= 5 && value.length <= 20) {
              return true;
            } else {
              throw new Error(
                "Length address of station must from 5 to 20 character"
              );
            }
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [cities],
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
