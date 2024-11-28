import { H3Event, readBody } from 'h3';
import { User } from '../models/User';
import { Shape } from '../models/Shape';

export async function handleGetRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    if (query.sid) {
        const shapeId = Number(query.sid);
        return await Shape.findOne({ where: { id: shapeId, userId: user.id }} );
    }
    return await Shape.findAll({ where: { userId: user.id } });
}

export async function handlePostRequest(event: H3Event, user: User) {
    const postBody = await readBody(event);
    const { type, color, x, y, z } = postBody;
    return await Shape.create({ type, color, x, y, z, userId: user.id });
}

export async function handlePutRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    const putBody = await readBody(event);
    const putId = parseInt(query.sid, 10);
    const shape = await Shape.findOne({ where: { id: putId, userId: user.id } });
    if (!shape) {
        throw new Error('Shape not found');
    }

    if (putBody.color !== undefined) {
        return handleColorPutRequest(shape, putBody.color);
    } else {
        return handlePositionPutRequest(shape, putBody);
    }
}

async function handleColorPutRequest(shape: Shape, color: string) {
    await shape.update({ color });
    return shape;
}

async function handlePositionPutRequest(shape: Shape, putBody: any) {
    const updateData: any = {};

    const parsedX = parseInt(putBody.x, 10);
    updateData.x = parsedX;
    
    const parsedY = parseInt(putBody.y, 10);
    updateData.y = parsedY;
    
    const parsedZ = parseInt(putBody.z, 10);
    updateData.z = parsedZ;

    await shape.update(updateData);
    return shape;
}

export async function handleDeleteRequest(event: H3Event, user: User) {
    const query = getQuery(event);
    const deleteId = Number(query.sid);
    const shape = await Shape.findOne({ where: { id: deleteId, userId: user.id } });
    if (!shape) {
        throw new Error('Shape not found');
    }
    await shape.destroy();
    return { message: 'Shape deleted' };
}