// Initialize Supabase lazily - don't block page load
let supabase = null;
let supabaseInitialized = false;

async function initializeSupabase() {
    if (supabaseInitialized) return supabase;
    
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
        const supabaseUrl = 'https://hcqhtsoqwayepuebvuyu.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcWh0c29xd2F5ZXB1ZWJ2dXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQ4NjUsImV4cCI6MjA3NTg3MDg2NX0.CW5tsqbuiiAiIJ5INEIFH9dzLmms789IcQq3Z01TCLI';
        supabase = createClient(supabaseUrl, supabaseKey);
        supabaseInitialized = true;
        console.log('Supabase initialized');
        return supabase;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        return null;
    }
}

//------------------------------------------------
// SUPABASE AUTHENTICATION
//------------------------------------------------

// Get references to UI elements
const loginText = document.querySelector('.loginText');
const loginBox = document.querySelector('.login-box');
const uploadButton = document.querySelector('.upload-box');
const galleryButton = document.querySelector('.open-gallery');
const usernameInput = document.getElementById('loginname');
const passwordInput = document.getElementById('password');

// Set initial UI state immediately (before Supabase loads)
function setInitialUIState() {
    window.userIsLoggedIn = false;
    if (loginText) loginText.textContent = 'Connecting...';
    if (loginBox) loginBox.textContent = 'Login';
    if (uploadButton) uploadButton.classList.add('disabled-link');
    if (galleryButton) galleryButton.classList.add('disabled-link');
}

// Call immediately to show page is loading auth
setInitialUIState();

// Update UI based on login state
function updateUIForLoginState(isLoggedIn, userEmail = '') {
    if (isLoggedIn) {
        window.userIsLoggedIn = true;
        if (loginText) loginText.textContent = `Logged In: ${userEmail}`;
        if (loginBox) loginBox.textContent = 'Logout';
        if (uploadButton) uploadButton.classList.remove('disabled-link');
        if (galleryButton) galleryButton.classList.remove('disabled-link');
        
        // Clear password field for security
        if (passwordInput) passwordInput.value = '';
        
        console.log('UI Updated: User Logged In');
    } else {
        window.userIsLoggedIn = false;
        if (loginText) loginText.textContent = 'Logged Out';
        if (loginBox) loginBox.textContent = 'Login';
        if (uploadButton) uploadButton.classList.add('disabled-link');
        if (galleryButton) galleryButton.classList.add('disabled-link');
        
        console.log('UI Updated: User Logged Out');
    }
}

// Check for existing session on page load (runs in background)
async function checkExistingSession() {
    const client = await initializeSupabase();
    if (!client) {
        updateUIForLoginState(false);
        return;
    }
    
    const { data: { session }, error } = await client.auth.getSession();
    
    if (session) {
        // User is already logged in
        updateUIForLoginState(true, session.user.email);
        console.log('Existing session found:', session.user.email);
    } else {
        // No active session
        updateUIForLoginState(false);
        console.log('No active session.');
    }
}

// Defer auth check until after page content loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(checkExistingSession, 100); // Small delay to let images start loading
    });
} else {
    setTimeout(checkExistingSession, 100);
}

// Listen for auth state changes (handles sign in/out across tabs)
async function setupAuthListener() {
    const client = await initializeSupabase();
    if (!client) return;
    
    client.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            updateUIForLoginState(true, session.user.email);
            console.log('Auth state: User signed in');
        } else if (event === 'SIGNED_OUT') {
            updateUIForLoginState(false);
            console.log('Auth state: User signed out');
        }
    });
}

// Set up listener in background
setupAuthListener();

// Sign in user
async function signInUser(email, password) {
    const client = await initializeSupabase();
    if (!client) {
        alert('Authentication service not available');
        return false;
    }
    
    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        alert('Login failed: ' + error.message);
        console.error('Login error:', error);
        return false;
    } else {
        updateUIForLoginState(true, email);
        alert('Login successful! Welcome back!');
        console.log('User signed in:', data.user);
        return true;
    }
}

// Sign out user
async function signOutUser() {
    const client = await initializeSupabase();
    if (!client) {
        alert('Authentication service not available');
        return false;
    }
    
    const { error } = await client.auth.signOut();
    
    if (error) {
        alert('Logout failed: ' + error.message);
        console.error('Logout error:', error);
        return false;
    } else {
        updateUIForLoginState(false);
        alert('Logged out successfully!');
        console.log('User logged out.');
        return true;
    }
}

// Main login/logout handler (replaces the old loginUser function)
async function loginUserSupabase() {
    if (window.userIsLoggedIn) {
        // User is currently logged in, so log them out
        await signOutUser();
    } else {
        // User is currently logged out, so log them in
        const email = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        
        await signInUser(email, password);
    }
}

// Make function globally accessible
window.loginUserSupabase = loginUserSupabase;

// Optional: Allow Enter key to submit login
if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !window.userIsLoggedIn) {
            loginUserSupabase();
        }
    });
}

if (usernameInput) {
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !window.userIsLoggedIn) {
            loginUserSupabase();
        }
    });
}