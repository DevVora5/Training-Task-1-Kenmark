// Importing necessary modules from Sequelize
const { DataTypes } = require("sequelize");
// Importing Sequelize instance from dbconfig module
const { sequelise } = require("../dbconfig");

// Define the Users model using Sequelize
const Users = sequelise.define("users", {
  // Define the 'id' field as the primary key with auto-increment
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  // Define the 'username' field with type INTEGER and disallowing null values
  username:  DataTypes.STRING,
  
  // Define the 'email' field with type STRING
  email: DataTypes.STRING,

  // Define the 'password' field with type STRING
  password: DataTypes.STRING,

  // Define the 'createdAt' field to store creation timestamp
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  // Define the 'updatedAt' field to store update timestamp
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

// Export the Users model for use in other parts of the application
module.exports = Users;
