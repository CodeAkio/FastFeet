import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'delivery_problems',
        paranoid: true,
        deletedAt: 'deleted_at',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}

export default DeliveryProblem;
