import { defineEventHandler, readBody } from 'h3';
import { User } from '../models/User';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const user = await User.findOne({ where: { name: username, password: password } });
  if (!user) {
    return { res: false, message: 'Invalid username or password' };
  }
  return { res: true, userId: user.id };
});