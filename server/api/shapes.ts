import { defineEventHandler, getQuery } from 'h3';
import { handleGetRequest, handlePostRequest, handlePutRequest, handleDeleteRequest } from './handlers';
import { getUser } from './utils';

// Handle all requests by checking the method and calling the appropriate handler.
export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const query = getQuery(event);

    const user = await getUser(event, Number(query.uid));
    switch (method) {
        case 'GET':
            return handleGetRequest(event, user);
        case 'POST':
            return handlePostRequest(event, user);
        case 'PUT':
            return handlePutRequest(event, user);
        case 'DELETE':
            return handleDeleteRequest(event, user);
        default:
            throw new Error('Invalid method');
    }
});