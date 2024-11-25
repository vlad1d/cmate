import { ShapeManager } from '../managers/ShapeManager';
import { defineEventHandler, getQuery, readBody, setResponseStatus } from 'h3';

const shapeManager = new ShapeManager();

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    console.log(`HTTP Method: ${method}`); // Add logging
    const query = getQuery(event);
    const body = await readBody(event);
    switch (method) {
        case 'GET':
            console.log('Handling GET request');
            return;
        case 'POST':
            console.log('Handling POST request');
            const {type, x, y, z} = body;
            return shapeManager.createShape(type, x, y, z);
        case 'PUT':
            console.log('Handling PUT request');
            const putId = Number(query.id);
            const {new_x, new_y, new_z} = body;
            return shapeManager.changePosition(putId, new_x, new_y, new_z);
        case 'DELETE':
            console.log('Handling DELETE request');
            const deleteId = Number(query.id);
            shapeManager.deleteShape(deleteId);
            return;
        default:
            console.log('Invalid method');
            throw new Error('Invalid method');
    }
});