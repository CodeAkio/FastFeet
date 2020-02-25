module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('delivery_problems', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('delivery_problems', 'deleted_at');
  },
};
