document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('postContent').value;
    const mediaUrl = document.getElementById('postMediaUrl').value;
    const token = localStorage.getItem('token');

    const response = await apiRequest('/posts/create', 'POST', { content, mediaUrl }, token);

    if (response._id) {
        alert('Post created successfully!');
        loadFeed();
    } else {
        alert(response.message);
    }
});