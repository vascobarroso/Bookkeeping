'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.addColumn('users', 'full_name', {
        type: Sequelize.STRING,
        allowNull: false,
    }),

    down: async (queryInterface, _) => queryInterface.removeColumn('users', 'full_name'),
};
