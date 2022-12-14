'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.BOOLEAN,
    hashedPassword: DataTypes.STRING,
    accountStatus: DataTypes.BOOLEAN
  }, {
    paranoid:true,
    timestamps:true
  });
  
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.shortcut, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    user.hasOne(models.userAuth, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
  
  return user;
};