const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Item = sequelize.define("item", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN
})

module.exports = {Item};