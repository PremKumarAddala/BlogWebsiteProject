document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!sessionStorage.getItem('loggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    const postForm = document.getElementById('create-post-form');
    const postsContainer = document.getElementById('posts-container');
    const postCountElement = document.getElementById('post-count');
    const logoutLink = document.getElementById('logout');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Logout functionality
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedIn');
        window.location.href = 'index.html';
    });

    // Load posts from local storage
    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = ''; // Clear previous content
        postCountElement.textContent = posts.length; // Update post count
        posts.forEach(post => {
            createPostElement(post);
        });
    };

    const savePosts = (posts) => {
        localStorage.setItem('posts', JSON.stringify(posts));
    };

    const createPostElement = (post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.id = post.id;
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
            </div>
            <div class="post-timestamp">${post.timestamp}</div> <!-- Add this line -->
            <button class="delete-btn">Delete Post</button>
        `;
        postsContainer.appendChild(postElement);
    
        postElement.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('Can I delete this post?')) {
                deletePost(post.id);
            }
        });
    };
    


const addPost = (title, content, image) => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        id: Date.now(),
        title,
        content,
        image,
        timestamp: new Date().toLocaleString() // Add this line
    };
    posts.push(newPost);
    savePosts(posts);
    createPostElement(newPost);
    postCountElement.textContent = posts.length; // Update post count
    alert('Post created successfully!');
};

    const deletePost = (postId) => {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.id !== postId);
        savePosts(posts);
        loadPosts();
    };

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const imageFile = document.getElementById('post-image').files[0];
        let imageUrl = '';

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = () => {
                imageUrl = reader.result;
                addPost(title, content, imageUrl);
            };
            reader.readAsDataURL(imageFile);
        } else {
            addPost(title, content, imageUrl);
        }

        postForm.reset();
    });

    loadPosts(); // Initial load of posts
});

