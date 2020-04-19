import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to login', async () => {
    await factory.create('User', {
      email: 'admin@fastfeet.com',
      password_hash: bcrypt.hashSync('123456', 8),
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@fastfeet.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });
})
