"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20],
          notEmpty: true,
          is: /^([A-Z][a-z]*\s)+[A-Z][a-z]*$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 20],
          notEmpty: true,
        },
      },
      numberPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10],
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Client",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
