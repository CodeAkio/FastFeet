import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
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
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id);

    if (!deliveryProblem) {
      return res.status(400).json({
        message: 'Delivery problem not found!',
      });
    }

    const order = await Order.findByPk(deliveryProblem.delivery_id);
    order.canceled_at = new Date();

    await order.save();

    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    await Queue.add(CancellationMail.key, {
      deliveryman,
      product: order.product,
    });

    return res.json(order);
  }
}

export default new DeliveryController();
