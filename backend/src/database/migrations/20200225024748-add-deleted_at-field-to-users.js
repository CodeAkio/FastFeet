module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('users', 'deleted_at');
  },
};
