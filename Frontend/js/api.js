const apiUrl = 'http://localhost:3000/api';

const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${apiUrl}${endpoint}`, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
};

// Usage example
// apiRequest('/path/to/endpoint', 'POST', { key: 'value' }, 'your-auth-token')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
