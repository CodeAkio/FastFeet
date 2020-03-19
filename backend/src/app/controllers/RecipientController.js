import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q: query } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query || ''}%`,
        },
      },
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({
        message: 'Recipient not found!',
      });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        cep: req.body.cep,
        number: req.body.number,
      },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    const { name, cep, number } = req.body;

    if (
      (name && name !== recipient.name) ||
      (cep && cep !== recipient.cep) ||
      (number && number !== recipient.number)
    ) {
      const recipientExists = await Recipient.findOne({
        where: { name, cep, number },
      });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const { street, complement, state, city } = await recipient.update(
      req.body
    );

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({
        message: 'Recipient not found ',
      });
    }

    await recipient.destroy();

    return res.status(204).json();
  }
}

export default new RecipientController();
