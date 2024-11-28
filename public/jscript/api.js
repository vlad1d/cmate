

const apiUrl = 'http://localhost:3000/api/shapes/'; // of course this would not be hardcoded in a real application

// Handle general API requests by using the native fetch API
async function apiRequest(url, options = {}) {
    try {
        // Add the Content-Type header and stringify the body if it exists
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
        // Parse the response body as JSON and return
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

// Get the user ID from local storage. If there is none, throw an error
function getUserId() {
    const user = localStorage.getItem('userId');
    if (!user) {
        throw new Error('User not logged in');
    }
    return user;
}

export async function getShapes() {
    const userId = getUserId();
    const url = apiUrl + `?uid=${userId}`;
    return apiRequest(url);
}

export async function getShapeById(id) {
    const userId = getUserId();
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url);
}

export async function createShape(type) {
    const userId = getUserId();
    const x = 0;
    const y = 0;
    const z = 0;
    const color = '#ffffff'; // by default, shapes are white
    const url = apiUrl + `?uid=${userId}`;
    return apiRequest(url, {
        method: 'POST',
        body: { type, color, x, y, z }
    });
}

export async function updateShapePosition(id, x, y, z) {
    const userId = getUserId();
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url, {
        method: 'PUT',
        body: { x, y, z }
    });
}

export async function updateShapeColor(id, color) {
    const userId = getUserId();
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url, {
        method: 'PUT',
        body: { color }
    });
}

export async function deleteShape(id) {
    const userId = getUserId();
    const url = apiUrl + `?uid=${userId}&sid=${id}`;
    return apiRequest(url, {
        method: 'DELETE'
    });
}