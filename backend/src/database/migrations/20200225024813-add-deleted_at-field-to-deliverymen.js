module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymen', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('deliverymen', 'deleted_at');
  },
};
