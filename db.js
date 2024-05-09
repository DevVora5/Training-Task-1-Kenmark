const { Sequelize } = require ("sequelize");
require('dotenv').config();

const sequelize = new Sequelize('blogging_platform', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
})


module.exports=sequelize;