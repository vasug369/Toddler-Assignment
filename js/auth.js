document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const name = document.getElementById('registerName').value;

        const response = await apiRequest('/users/register', 'POST', { username, password, name });

        if (response.message === 'User registered successfully!') {
            alert('Registration successful! Please log in.');
        } else {
            alert(response.message);
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await apiRequest('/users/login', 'POST', { username, password });

        if (response.token) {
            localStorage.setItem('token', response.token);
            document.getElementById('auth').classList.add('hidden');
            document.getElementById('main').classList.remove('hidden');
            loadFeed();
        } else {
            alert(response.message);
        }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        document.getElementById('auth').classList.remove('hidden');
        document.getElementById('main').classList.add('hidden');
    });
});
