"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: "UserId" });
      Comment.belongsTo(models.QuestionPost, { foreignKey: "QuestionPostId" });
    }
  }
  Comment.init(
    {
      QuestionPostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Question Post is required",
          },
          notNull: {
            msg: "Question Post is required",
          },
        },
      },
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
      text: DataTypes.STRING,
      vote: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
