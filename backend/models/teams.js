'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teams.init({
    name: DataTypes.STRING,
    lab_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teams',
    timestamps: false
  });
  teams.associate = models => {
    teams.hasMany(models.judges, { foreignKey: 'team_id' });
  }
  return teams;
};