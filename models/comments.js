// Importing necessary modules from Sequelize
const { DataTypes } = require("sequelize");
// Importing Sequelize instance from dbconfig module
const { sequelise } = require("../dbconfig"); // Change from sequelise to sequelize
const User = require("./users")

// Define the Comments model using Sequelize
const Comments = sequelise.define("comments", {
  // Define the 'id' field as the primary key with auto-increment
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  // Define the 'content' field with type TEXT and disallowing null values
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Define the 'postId' field with type INTEGER and disallowing null values
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Define the 'userId' field with type INTEGER and disallowing null values
  userId: {
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

// Export the Comments model for use in other parts of the application
module.exports = Comments;
