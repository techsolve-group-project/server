"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionPost.belongsTo(models.User, { foreignKey: "UserId" });
      QuestionPost.hasMany(models.Comment, { foreignKey: "QuestionPostId" });
    }
  }
  QuestionPost.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User is required",
          },
          notNull: {
            msg: "User is required",
          },
        },
      },
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      aiAnswer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QuestionPost",
    }
  );
  return QuestionPost;
};
