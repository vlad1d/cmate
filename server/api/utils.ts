import { H3Event, setResponseStatus } from 'h3';
import { User } from '../models/User';

// Get a user by ID
export async function getUser(event: H3Event, uid: number) {
    const user = await User.findOne({ where: { id: uid } });
    
    if (!user) {
        setResponseStatus(event, 400);
        throw new Error('User not found');
    }
    return user;
}