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
    const { type, color, x, y, z } = postBody;
    const shape = user.createShape(type, color, x, y, z);
    return {
        id: shape.id,
        x: shape.x,
        y: shape.y,
        z: shape.z,
        type: shape.getType()
    };
}

export async function handlePutRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    const putBody = await readBody(event);
    const putId = Number(query.sid);
    const { x, y, z, color } = putBody;

    if (x !== undefined && y !== undefined && z !== undefined) {
        user.changeShapePosition(putId, x, y, z);
    }
    if (color !== undefined) {
        user.changeShapeColor(putId, color);
    }

    return user.getShapeById(putId);
}

export async function handleDeleteRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    const deleteId = Number(query.sid);
    user.deleteShape(deleteId);
}