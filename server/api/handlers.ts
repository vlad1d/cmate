import { H3Event, readBody } from 'h3';
import { User } from '../models/User';

export async function handleGetRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    if (query.sid) {
        const shapeId = Number(query.sid);
        return user.getShapeById(shapeId);
    }
    return user.getShapes();
}

export async function handlePostRequest(event: H3Event, user: User) {
    const postBody = await readBody(event);
    const { type, x, y, z } = postBody;
    return user.createShape(type, x, y, z);
}

export async function handlePutRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    const putBody = await readBody(event);
    const putId = Number(query.sid);
    const { x, y, z } = putBody;
    return user.changeShapePosition(putId, x, y, z);
}

export async function handleDeleteRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    const deleteId = Number(query.sid);
    user.deleteShape(deleteId);
}