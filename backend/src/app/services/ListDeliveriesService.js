import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class ListDeliveriesService {
  async run({ deliveryman_id, delivered }) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id,
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

    switch (delivered) {
      case 'true':
        return orders.filter(order => order.end_date !== null);
      case 'false':
        return orders.filter(order => order.end_date === null);
      default:
        return orders;
    }
  }
}

export default new ListDeliveriesService();
