// User Authentication Module
const auth = (() => {
    // Store users in localStorage
    const users = JSON.parse(localStorage.getItem('blogUsers')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    // DOM Elements
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeLogin = document.getElementById('close-login');
    const closeSignup = document.getElementById('close-signup');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authSection = document.getElementById('auth-section');
    const userProfile = document.getElementById('user-profile');
    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('user-avatar');
    const logoutLink = document.getElementById('logout-link');

    // Initialize auth state
    const init = () => {
        updateAuthUI();
        bindEvents();
    };

    // Update UI based on auth state
    const updateAuthUI = () => {
        if (currentUser) {
            authSection.style.display = 'none';
            userProfile.style.display = 'flex';
            usernameDisplay.textContent = currentUser.username;
            userAvatar.src = currentUser.avatar || 'assets/default-avatar.png';
        } else {
            authSection.style.display = 'flex';
            userProfile.style.display = 'none';
        }
    };

    // Bind event listeners
    const bindEvents = () => {
        // Login/Signup button clicks
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
        
        signupBtn.addEventListener('click', () => {
            signupModal.style.display = 'flex';
        });
        
        // Close modals
        closeLogin.addEventListener('click', () => {
            loginModal.style.display = 'none';
            loginForm.reset();
        });
        
        closeSignup.addEventListener('click', () => {
            signupModal.style.display = 'none';
            signupForm.reset();
        });
        
        // Switch between login and signup
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });
        
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
        
        // Handle form submissions
        loginForm.addEventListener('submit', handleLogin);
        signupForm.addEventListener('submit', handleSignup);
        
        // Handle logout
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === signupModal) {
                signupModal.style.display = 'none';
            }
        });
    };

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Find user by email
        const user = users.find(u => u.email === email);
        
        if (!user || user.password !== password) {
            showMessage(loginForm, 'Invalid email or password', 'error');
            return;
        }
        
        // Login successful
        currentUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        loginModal.style.display = 'none';
        loginForm.reset();
        
        // Trigger event
        const event = new CustomEvent('userLoggedIn', { detail: currentUser });
        document.dispatchEvent(event);
    };

    // Handle signup form submission
    const handleSignup = (e) => {
        e.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Validate password match
        if (password !== confirmPassword) {
            showMessage(signupForm, 'Passwords do not match', 'error');
            return;
        }
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            showMessage(signupForm, 'Email already in use', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
            avatar: null,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('blogUsers', JSON.stringify(users));
        
        // Login the new user
        currentUser = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        signupModal.style.display = 'none';
        signupForm.reset();
        
        // Trigger event
        const event = new CustomEvent('userSignedUp', { detail: currentUser });
        document.dispatchEvent(event);
    };

    // Logout user
    const logout = () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
        
        // Trigger event
        const event = new CustomEvent('userLoggedOut');
        document.dispatchEvent(event);
    };

    // Helper to show error/success messages
    const showMessage = (form, message, type) => {
        let messageElement = form.querySelector('.message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'message';
            form.insertBefore(messageElement, form.firstChild);
        }
        
        messageElement.textContent = message;
        messageElement.className = `message ${type}-message`;
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    };

    // Public API
    return {
        init,
        isLoggedIn: () => !!currentUser,
        getCurrentUser: () => currentUser,
        logout
    };
})();

// Initialize auth when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});