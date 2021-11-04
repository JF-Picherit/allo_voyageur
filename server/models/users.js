'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // HasOne :

      Users.hasOne(models.Adresse_Vehicles, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Ads, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Messages, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Ads_Favorites, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Reviews, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Spots_Publications, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Spots_Favorites, {
        foreignKey: 'user_id'
      });
      Users.hasOne(models.Journeys, {
        foreignKey: 'user_id'
      });


      // BelongTo :

      Users.belongsTo(models.Geolocalisations, {
        foreignKey: 'geolocalisation_id',
        as: 'geolocalisation',
        allowNull: true,
        constraints: false
      });

    }
  };

  Users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    location: DataTypes.GEOGRAPHY('Point'),
    geolocalisation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};