const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Menu = sequelize.define("menu", {
    title: DataTypes.STRING
})

module.exports = {Menu};