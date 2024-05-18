const loadFeed = async () => {
    const token = localStorage.getItem('token');
    const posts = await apiRequest('/posts/feed', 'GET', null, token);

    if (posts) {
        const feed = document.getElementById('feed');
        feed.innerHTML = '';

        posts.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p>${post.userId.name} (@${post.userId.username})</p>
                <p>${post.content}</p>
                ${post.mediaUrl ? `<img src="${post.mediaUrl}" alt="Post media">` : ''}
                <button onclick="likePost('${post._id}')">Like (${post.likes.length})</button>
                <button onclick="showComments('${post._id}')">Comments (${post.comments.length})</button>
                <div id="comments-${post._id}" class="hidden">
                    <ul></ul>
                    <form onsubmit="addComment(event, '${post._id}')">
                        <input type="text" placeholder="Add a comment">
                        <button type="submit">Comment</button>
                    </form>
                </div>
            `;
            feed.appendChild(li);
        });
    }
};

const likePost = async (postId) => {
    const token = localStorage.getItem('token');
    const response = await apiRequest(`/posts/${postId}/like`, 'POST', {}, token);

    if (response) {
        alert(response.message);
        loadFeed();
    }
};

const showComments = (postId) => {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.classList.toggle('hidden');
};

const addComment = async (e, postId) => {
    e.preventDefault();
    const commentContent = e.target.querySelector('input').value;
    const token = localStorage.getItem('token');
    const response = await apiRequest(`/posts/${postId}/comment`, 'POST', { content: commentContent }, token);

    if (response) {
        alert(response.message);
        loadFeed();
    }
};
