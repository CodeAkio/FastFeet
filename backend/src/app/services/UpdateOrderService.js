import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import NewOrderMail from '../jobs/NewOrderMail';
import Queue from '../../lib/Queue';

class UpdateOrderService {
  async run({ orderId, deliverymanId, recipientId, signatureId, orderData }) {
    let deliverymanChanged = false;

    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error('Order not found!');
    }

    if (deliverymanId && deliverymanId !== order.deliveryman_id) {
      const deliverymanExists = await Deliveryman.findByPk(deliverymanId);

      if (!deliverymanExists) {
        throw new Error('Deliveryman not found!');
      }

      deliverymanChanged = true;
    }

    if (recipientId && recipientId !== order.recipient_id) {
      const recipientExists = await Recipient.findByPk(recipientId);

      if (!recipientExists) {
        throw new Error('Recipient not found!');
      }
    }

    if (signatureId && signatureId !== order.signature_id) {
      const signatureExists = await File.findByPk(signatureId);

      if (!signatureExists) {
        throw new Error('Signature not found!');
      }
    }

    await order.update(orderData);

    if (deliverymanChanged) {
      const deliveryman = await Deliveryman.findByPk(deliverymanId);

      await Queue.add(NewOrderMail.key, {
        deliveryman,
        product: order.product,
      });
    }

    return order;
  }
}

export default new UpdateOrderService();
