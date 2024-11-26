import { UserManager } from '../managers/UserManager';
import { H3Event, setResponseStatus } from 'h3';

export function getUser(event: H3Event, userManager: UserManager, uid: number) {
    let user;
    try {
        user = userManager.getUserById(uid);
    } catch (e) {
        setResponseStatus(event, 400);
        throw new Error('No user selected.');
    }
    return user;
}