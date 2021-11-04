'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Geolocalisations extends Model {
    static associate(models) {
      Geolocalisations.hasOne(models.Users, {
        foreignKey: 'geolocalisation_id',
        as: 'geolocalisation'
      });
    }
  };
  Geolocalisations.init({
    authorization: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Geolocalisations',
  });
  return Geolocalisations;
};