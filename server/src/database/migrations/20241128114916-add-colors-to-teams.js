'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('teams', 'color_1', {
      type: Sequelize.STRING(7), // Assuming hex color codes (e.g., #FFFFFF)
      allowNull: true,
    });
    await queryInterface.addColumn('teams', 'color_2', {
      type: Sequelize.STRING(7), // Assuming hex color codes (e.g., #FFFFFF)
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('teams', 'color_1');
    await queryInterface.removeColumn('teams', 'color_2');
  },
};
