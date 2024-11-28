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
      color_1: {
        type: DataTypes.STRING(7), // For hex color codes
        allowNull: true,
      },
      color_2: {
        type: DataTypes.STRING(7), // For hex color codes
        allowNull: true,
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
