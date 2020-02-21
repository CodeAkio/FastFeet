import Mail from '../../lib/Mail';

class NewOrdernMail {
  get key() {
    return 'NewOrdernMail';
  }

  async handle({ data }) {
    const { deliveryman, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova Encomenda',
      template: 'new_order',
      context: {
        deliveryman: deliveryman.name,
        product,
      },
    });
  }
}

export default new NewOrdernMail();
