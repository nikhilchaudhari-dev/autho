// API Base URL
const API_URL = window.location.origin + '/api';

// ==================== UTILITY FUNCTIONS ====================

// Show message to user
function showMessage(elementId, message, type) {
    const messageEl = document.getElementById(elementId);
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `message show ${type}`;
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageEl.className = 'message';
            }, 3000);
        }
    }
}

// Get auth token from localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

// Save token to localStorage
function saveToken(token) {
    localStorage.setItem('authToken', token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem('authToken');
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getToken();
}

// Redirect based on authentication status
function redirectBasedOnAuth() {
    const token = getToken();
    const currentPath = window.location.pathname;
    
    // Protected routes
    const protectedRoutes = ['/dashboard'];
    
    // Public routes that should redirect if logged in
    const publicRoutes = ['/login', '/signup', '/'];
    
    if (token && publicRoutes.includes(currentPath)) {
        window.location.href = '/dashboard';
    }
    
    if (!token && protectedRoutes.includes(currentPath)) {
        window.location.href = '/login';
    }
}

// Make authenticated API request
async function apiRequest(endpoint, options = {}) {
    const token = getToken();
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// ==================== AUTHENTICATION FUNCTIONS ====================

// Signup function
async function signup(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token to localStorage
            saveToken(data.token);
            
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            throw new Error(data.message || 'Signup failed');
        }
    } catch (error) {
        throw error;
    }
}

// Login function
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token to localStorage
            saveToken(data.token);
            
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        throw error;
    }
}

// Logout function
async function logout() {
    try {
        // Call logout API endpoint
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always remove token and redirect to login
        removeToken();
        window.location.href = '/login';
    }
}

// Fetch dashboard data
async function fetchDashboard() {
    try {
        const data = await apiRequest('/dashboard');
        return data;
    } catch (error) {
        throw error;
    }
}

// ==================== EVENT LISTENERS ====================

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        try {
            await signup(name, email, password);
        } catch (error) {
            showMessage('message', error.message, 'error');
        }
    });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        try {
            await login(email, password);
        } catch (error) {
            showMessage('message', error.message, 'error');
        }
    });
}

// Logout button handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await logout();
    });
}

// Dashboard page handler
const dashboardContent = document.getElementById('dashboardContent');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');

if (dashboardContent && loadingMessage) {
    // Check authentication on dashboard page
    if (!isAuthenticated()) {
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
    } else {
        // Fetch and display dashboard data
        fetchDashboard()
            .then(data => {
                loadingMessage.style.display = 'none';
                dashboardContent.style.display = 'grid';
                
                // Populate user information
                document.getElementById('userName').textContent = data.user.name;
                document.getElementById('userEmail').textContent = data.user.email;
                document.getElementById('userId').textContent = data.user.id;
                
                // Format created_at date
                const memberSince = new Date(data.user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('memberSince').textContent = memberSince;
                
                // Update navigation with user name
                const userNav = document.getElementById('userNav');
                if (userNav) {
                    userNav.innerHTML = `<span style="color: var(--text-light)">👤 ${data.user.name}</span>`;
                }
            })
            .catch(error => {
                console.error('Dashboard error:', error);
                loadingMessage.style.display = 'none';
                
                if (error.message.includes('expired') || error.message.includes('Invalid')) {
                    // Token expired or invalid
                    removeToken();
                    errorMessage.style.display = 'block';
                } else {
                    errorMessage.style.display = 'block';
                    errorMessage.querySelector('p').textContent = 'Error loading dashboard data.';
                }
            });
    }
}

// ==================== INITIALIZATION ====================

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    redirectBasedOnAuth();
});
