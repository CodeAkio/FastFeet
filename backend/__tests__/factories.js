import bcrypt from 'bcryptjs';
import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password_hash: bcrypt.hashSync(faker.internet.password(), 8),
  created_at: new Date(),
  updated_at: new Date(),
});

export default factory;
