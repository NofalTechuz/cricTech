'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('players', 'team_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'teams', // Reference the `teams` table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Set to NULL if the team is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('players', 'team_id');
  },
};
