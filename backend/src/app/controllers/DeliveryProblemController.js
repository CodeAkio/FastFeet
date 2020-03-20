import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

import CancelDeliveryService from '../services/CancelDeliveryService';

class DeliveryController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      include: [
        {
          model: Order,
          as: 'delivery',
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: id },
      include: [
        {
          model: Order,
          as: 'delivery',
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({
        message: 'Order not found!',
      });
    }

    const newOrder = req.body;
    newOrder.delivery_id = id;

    const deliveryProblem = await DeliveryProblem.create(newOrder);

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const order = await CancelDeliveryService.run({ id });

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new DeliveryController();
