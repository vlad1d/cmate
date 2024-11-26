
const apiUrl = 'https://localhost:3000/api/shapes'; //to change
const userId = 1; //to change

async function apiRequest(endpoint, options = {}) {
    const url = apiUrl + endpoint + `?uid=${userId}`;
    const response = await fetch(url, options);
    return response.json();
}

export async function getShapes() {
    return apiRequest('/');
}

export async function getShapeById(id) {
    return apiRequest(`/${id}`);
}

export async function createShape(type, x, y, z) {
    return apiRequest('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, x, y, z })
    });
}

export async function updateShape(id, x, y, z) {
    return apiRequest(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ x, y, z })
    });
}

export async function deleteShape(id) {
    return apiRequest(`/${id}`, {
        method: 'DELETE'
    });
}


