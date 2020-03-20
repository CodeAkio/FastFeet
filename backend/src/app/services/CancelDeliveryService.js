import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class CancelDeliveryService {
  async run({ id }) {
    const deliveryProblem = await DeliveryProblem.findByPk(id);

    if (!deliveryProblem) {
      throw new Error('Delivery problem not found!');
    }

    const order = await Order.findByPk(deliveryProblem.delivery_id);
    order.canceled_at = new Date();

    await order.save();

    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    await Queue.add(CancellationMail.key, {
      deliveryman,
      product: order.product,
    });

    return order;
  }
}

export default new CancelDeliveryService();
