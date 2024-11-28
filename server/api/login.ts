import { defineEventHandler, readBody } from 'h3';
import { User } from '../models/User';

// Handle login requests by checking if the username and password are correct.
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // Look them up in the database
  const user = await User.findOne({ where: { name: username, password: password } });
  if (!user) {
    return { res: false, message: 'Invalid username or password' };
  }

  // Return the user ID if the login is successful
  return { res: true, userId: user.id };
});