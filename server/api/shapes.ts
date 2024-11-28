import { defineEventHandler, getQuery } from 'h3';
import { handleGetRequest, handlePostRequest, handlePutRequest, handleDeleteRequest } from './handlers';
import { getUser } from './utils';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const query = getQuery(event);

    const user = await getUser(event, Number(query.uid));
    console.log('user', user);
    console.log('query', query);
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