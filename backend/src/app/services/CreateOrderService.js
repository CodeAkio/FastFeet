import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import NewOrderMail from '../jobs/NewOrderMail';
import Queue from '../../lib/Queue';

class CreateOrderService {
  async run({ deliveryman_id, recipient_id, signature_id, orderData }) {
    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      throw new Error('Deliveryman not found!');
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      throw new Error('Recipient not found!');
    }

    if (signature_id) {
      const signatureExists = await File.findByPk(signature_id);

      if (!signatureExists) {
        throw new Error('Signature not found!');
      }
    }

    const order = await Order.create(orderData);

    await Queue.add(NewOrderMail.key, {
      deliveryman: deliverymanExists,
      product: order.product,
    });

    return order;
  }
}

export default new CreateOrderService();
