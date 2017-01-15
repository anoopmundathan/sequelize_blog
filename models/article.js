'use strict';
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Article;
};