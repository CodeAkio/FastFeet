import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import ListDeliveriesService from '../services/ListDeliveriesService';
import UpdateDeliveryService from '../services/UpdateDeliveryService';

class DeliveryController {
  async index(req, res) {
    try {
      const orders = await ListDeliveriesService.run({
        deliveryman_id: req.params.id,
        delivered: req.query.delivered,
      });

      return res.json(orders);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req, res) {
    const { deliverymanId, orderId } = req.params;

    const order = await Order.findByPk(orderId, {
      where: {
        deliveryman_id: deliverymanId,
        canceled_at: null,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(order);
  }

  async update(req, res) {
    try {
      const { deliverymanId, orderId } = req.params;
      const { start_date, end_date, signature_id } = req.body;

      const order = await UpdateDeliveryService.run({
        deliverymanId,
        orderId,
        start_date,
        end_date,
        signature_id,
      });

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new DeliveryController();
