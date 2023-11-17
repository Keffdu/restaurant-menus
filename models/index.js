const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require("./Item")

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Item.belongsToMany(Menu, {through: "menu-item"})
Menu.belongsToMany(Item, {through: "menu-item"})

module.exports = { Restaurant, Menu, Item }
