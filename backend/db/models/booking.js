'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore(value){
        if (this.endDate && value >= this.endDate) {
          throw new Error('Start date must be before end date');
      }
    }
  }
},
endDate: {
  type: DataTypes.DATE,
  allowNull: false,
  validate: {
    isDate: true,
    isAfter(value){
      if (this.startDate && value <= this.startDate) {
        throw new Error('End date must be after start date');
      }
    }
  }
}
}, {
  sequelize,
  modelName: 'Booking',
  timestamps: true, // Automatically manage createdAt and updatedAt columns
});
return Booking;
};
