module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'deleted_at');
  },
};
