'use strict';
const { 
  Model 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define associations here
      Exercise.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Exercise.init({
    postDate: DataTypes.DATE,
    username: DataTypes.STRING,
    exerciseName: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    reps: DataTypes.INTEGER,
    sets: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};