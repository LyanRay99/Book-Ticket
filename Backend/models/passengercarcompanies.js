"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class passengerCarCompanies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip }) {
      // define association here
      this.belongsTo(Trip, { foreignKey: "id" });
    }
  }
  passengerCarCompanies.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 100],
          notEmpty: true,
        },
      },
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "passengerCarCompanies",
    }
  );
  return passengerCarCompanies;
};
