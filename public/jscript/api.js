const apiUrl = 'http://localhost:3000/api/shapes/'; //to change
const userId = 1; //to change

async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: options.body ? JSON.stringify(options.body) : undefined
        });
        if (response.status === 204) {
            return null; // No content to parse
        }
        const responseBody = await response.text();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return JSON.parse(responseBody);
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

export async function getShapes() {
    const url = apiUrl + `?uid=${userId}`;
    return apiRequest(url);
}

export async function getShapeById(id) {
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url);
}

export async function createShape(type) {
    const x = 0;
    const y = 0;
    const z = 0;
    const color = '#ffffff';
    const url = apiUrl + `?uid=${userId}`;
    return apiRequest(url, {
        method: 'POST',
        body: { type, color, x, y, z }
    });
}

export async function updateShapePosition(id, x, y, z) {
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url, {
        method: 'PUT',
        body: { x, y, z }
    });
}

export async function updateShapeColor(id, color) {
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url, {
        method: 'PUT',
        body: { color }
    });
}

export async function deleteShape(id) {
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url, {
        method: 'DELETE'
    });
}