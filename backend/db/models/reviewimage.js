'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      })
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl: true, //Basic URL validation
      },
    },
    }, {
    sequelize,
    modelName: 'ReviewImage',
    timestamps: true, // Automatically manage createdAt and updatedAt columns
  });
  return ReviewImage;
};
