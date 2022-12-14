'use strict';
module.exports = (sequelize, DataTypes) => {
  var userAuth = sequelize.define('userAuth', {
    authToken: DataTypes.STRING,
    lastActivity: DataTypes.DATE
  }, {
    paranoid:true,
    timestamps:true
  });
  
  userAuth.associate = function(models) {
    // associations can be defined here
    userAuth.belongsTo(models.user,{
      foreignKey: 'userId'
    })
  }
  
  return userAuth;
};