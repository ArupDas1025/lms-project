const sequelize = require("../../config/database");
const Sequelize = require('sequelize')

const Book = sequelize.define('Book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING
      },
      bookname: {
        type: Sequelize.STRING
      },
      subject:{
        type:Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      copies: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type:Sequelize.DATE
      },
    },
    {
      paranoid:true,
      freezeTableName:true,
      modelName:'Book'
    
    }
  );

    module.exports = Book;