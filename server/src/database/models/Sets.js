'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sets = sequelize.define(
    'Sets',
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'sets',
      modelName: 'Sets',
    }
  );

  Sets.associate = (models) => {
    Sets.hasMany(models.Players, {
      foreignKey: 'set_id',
      as: 'players',
    });
  };

  return Sets;
};
