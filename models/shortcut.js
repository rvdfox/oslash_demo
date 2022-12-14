'use strict';
module.exports = (sequelize, DataTypes) => {
  var shortcut = sequelize.define('shortcut', {
    shortlink: DataTypes.STRING,
    fullurl: DataTypes.STRING,
    tags: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('tags'));
      },
      set: function(val){
        return this.setDataValue('tags',JSON.stringify(val));
      }
    },
    description: DataTypes.TEXT
  },{
    paranoid:true,
    timestamps:true
  });
  
  shortcut.associate = function(models) {
    // associations can be defined here
    shortcut.belongsTo(models.user,{
      foreignKey:'userId'
    })
  }
  
  return shortcut;
};