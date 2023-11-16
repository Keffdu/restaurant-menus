const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Restaurant = sequelize.define("restaurant", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
})

module.exports = {Restaurant};