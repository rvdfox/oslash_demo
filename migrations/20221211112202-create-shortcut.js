'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shortcuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'users',
          key:'id'
        }
      },
      shortlink: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fullurl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tags: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    },
    {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["userId","shortlink"]
        }
      }
    }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shortcuts');
  }
};