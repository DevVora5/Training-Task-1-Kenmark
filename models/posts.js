// Importing necessary modules from Sequelize
const { DataTypes } = require("sequelize");
// Importing Sequelize instance from dbconfig module
const { sequelise } = require("../dbconfig");
const User = require("./users")

// Define the Posts model using Sequelize
const Posts = sequelise.define("posts", {
  // Define the 'id' field as the primary key with auto-increment
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  // Define the 'title' field with type STRING and disallowing null values
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the 'content' field with type TEXT and disallowing null values
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Define the 'authorId' field with type INTEGER and disallowing null values
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Referencing the Users model
      key: "id", // Referencing the id field in the Users model
    },
  },
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

// Export the Posts model for use in other parts of the application
module.exports = Posts;

