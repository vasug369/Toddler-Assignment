document.getElementById('searchButton').addEventListener('click', async () => {
    const name = document.getElementById('searchName').value;
    const token = localStorage.getItem('token');

    const users = await apiRequest(`/users/find-people?name=${name}`, 'GET', null, token);

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (@${user.username})`;
        const followButton = document.createElement('button');
        followButton.textContent = 'Follow';
        followButton.addEventListener('click', () => followUser(user.id));
        li.appendChild(followButton);
        searchResults.appendChild(li);
    });
});

const followUser = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await apiRequest('/follows/follow', 'POST', { userId }, token);
    alert(response.message);
};
