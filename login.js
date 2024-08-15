document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotForm = document.getElementById('forgot-form');

    document.getElementById('show-signup').addEventListener('click', () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', () => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    document.getElementById('show-login-forgot').addEventListener('click', () => {
        forgotForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    document.getElementById('show-forgot').addEventListener('click', () => {
        loginForm.classList.add('hidden');
        forgotForm.classList.remove('hidden');
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Fetch users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = 'blog.html';
        } else {
            alert('Invalid email or password');
        }
    });

    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Fetch users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Email already registered');
        } else {
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign up successful. Please log in.');
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        }
    });

    document.getElementById('forgotForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;

        // Perform forgot password (Add your forgot password logic here)
        alert('Reset link sent to ' + email);
    });
});
