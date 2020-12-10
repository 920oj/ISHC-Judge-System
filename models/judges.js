'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class judges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  judges.init({
    team_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    correct_flg: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    language: DataTypes.STRING,
    memory: DataTypes.STRING,
    answer_time: DataTypes.INTEGER,
    msg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'judges',
    underscored: true,
  });
  judges.associate = models => {
    judges.belongsTo(models.teams);
  }
  return judges;
};