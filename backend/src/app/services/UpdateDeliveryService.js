import { getHours, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';

class UpdateDeliveryService {
  async run({ deliverymanId, orderId, start_date, end_date, signature_id }) {
    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error('Order not found!');
    }

    if (order.deliveryman_id !== Number(deliverymanId)) {
      throw new Error(
        'Deliveryman do not have permission to access this order'
      );
    }

    if (start_date && end_date) {
      throw new Error('You cannot perform two operations at the same time');
    }

    if (!start_date && !end_date) {
      throw new Error('No operations detected');
    }

    if (start_date) {
      const hours = getHours(parseISO(start_date));

      if (hours < 8 || hours > 18) {
        throw new Error('Out of delivery hours');
      }

      const ordersDelivered = await Order.findAll({
        where: {
          deliveryman_id: deliverymanId,
          end_date: {
            [Op.ne]: null,
          },
        },
      });

      if (ordersDelivered.length >= 5) {
        throw new Error('You have exceeded the daily limit of 5 orders');
      }

      order.start_date = start_date;
      await order.save();
    }

    if (end_date) {
      if (!signature_id) {
        throw new Error('Signature is required');
      }

      if (!order.start_date) {
        throw new Error('The product has not yet been collected for delivery');
      }

      order.end_date = end_date;
      order.signature_id = Number(signature_id);
      await order.save();
    }

    return order;
  }
}

export default new UpdateDeliveryService();
