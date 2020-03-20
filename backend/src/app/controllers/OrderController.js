import { Op } from 'sequelize';
import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CreateOrderService from '../services/CreateOrderService';
import UpdateOrderService from '../services/UpdateOrderService';

class OrderController {
  async index(req, res) {
    const { q: query } = req.query;

    const orders = await Order.findAll({
      attributes: [
        'id',
        'product',
        'status',
        'canceled_at',
        'start_date',
        'end_date',
      ],
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
      where: {
        product: {
          [Op.iLike]: `%${query || ''}%`,
        },
      },
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      attributes: [
        'id',
        'product',
        'status',
        'canceled_at',
        'start_date',
        'end_date',
      ],
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

    if (!order) {
      return res.status(400).json({
        message: 'Order not found!',
      });
    }

    return res.json(order);
  }

  async store(req, res) {
    try {
      const order = await CreateOrderService.run({
        deliveryman_id: req.body.deliveryman_id,
        recipient_id: req.body.recipient_id,
        signature_id: req.body.signature_id,
        orderData: req.body,
      });

      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const order = await UpdateOrderService.run({
        orderId: req.params.id,
        deliverymanId: req.body.deliveryman_id,
        recipientId: req.body.recipient_id,
        signatureId: req.body.signature_id,
        orderData: req.body,
      });

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({
        message: 'Order not found ',
      });
    }

    await order.destroy();

    return res.status(204).json();
  }
}

export default new OrderController();
