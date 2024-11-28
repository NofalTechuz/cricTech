'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define(
    'Teams',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'teams',
      modelName: 'Teams',
    }
  );

  Teams.associate = (models) => {
    Teams.hasMany(models.Players, {
      foreignKey: 'team_id',
      as: 'players',
    });
  };

  return Teams;
};
