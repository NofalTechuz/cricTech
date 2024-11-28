'use strict';
module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define(
    'Players',
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
      set_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_sold: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'players',
      modelName: 'Players',
    }
  );

  Players.associate = (models) => {
    Players.belongsTo(models.Sets, {
      foreignKey: 'set_id',
      as: 'set',
    });
    Players.belongsTo(models.Teams, {
      foreignKey: 'team_id',
      as: 'team',
    });
  };

  return Players;
};
