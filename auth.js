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
const uploadButton2 = document.querySelector('.upload-box2');
const galleryButton = document.querySelector('.open-gallery');
const galleryButton2 = document.querySelector('.open-gallery2');
const usernameInput = document.getElementById('loginname');
const passwordInput = document.getElementById('password');
const joinUsButton = document.getElementById('signUpButton2');
const joinUsCurtain = document.getElementById('signUpCurtain');

// Set initial UI state immediately (before Supabase loads)
function setInitialUIState() {
    window.userIsLoggedIn = false;
    if (loginText) loginText.textContent = 'Connecting...';
    if (loginBox) loginBox.textContent = 'Login';
    if (uploadButton) uploadButton.classList.add('disabled-link');
    if (uploadButton2) uploadButton2.classList.add('disabled-link');
    if (galleryButton) galleryButton.classList.add('disabled-link');
    if (galleryButton2) galleryButton2.classList.add('disabled-link');
    if (joinUsButton) 
        {
            joinUsButton.classList.remove('disabled-link');
            joinUsButton.removeAttribute('inert', '')    
        }
    if (joinUsCurtain) 
        {
            joinUsCurtain.classList.remove('disabled-link');
            joinUsCurtain.removeAttribute('inert', '')    
        }

}

// Call immediately to show page is loading auth
setInitialUIState();

// Update UI based on login state
function updateUIForLoginState(isLoggedIn, userEmail = '') {
    if (isLoggedIn) {
        window.userIsLoggedIn = true;
        if (loginText) loginText.textContent = `${userEmail}`;
        if (loginBox) loginBox.textContent = 'Logout';
        if (uploadButton) uploadButton.classList.remove('disabled-link');
        if (uploadButton2) uploadButton2.classList.remove('disabled-link');
        if (galleryButton) galleryButton.classList.remove('disabled-link');
        if (galleryButton2) galleryButton2.classList.remove('disabled-link');

        if (joinUsButton) 
        {
                    joinUsButton.classList.add('disabled-link');        
                    joinUsButton.setAttribute('inert', '');
        }

        if (joinUsCurtain) 
        {
                    joinUsCurtain.classList.add('disabled-link');        
                    joinUsCurtain.setAttribute('inert', '');
        }

        // Clear password field for security
        if (passwordInput) passwordInput.value = '';
        
        console.log('UI Updated: User Logged In');
    } else {
        window.userIsLoggedIn = false;
        if (loginText) loginText.textContent = 'Logged Out';
        if (loginBox) loginBox.textContent = 'Login';
        if (uploadButton) uploadButton.classList.add('disabled-link');
        if (uploadButton2) uploadButton2.classList.add('disabled-link');
        if (galleryButton) galleryButton.classList.add('disabled-link');
        if (galleryButton2) galleryButton2.classList.add('disabled-link');
        if (joinUsButton) 
            {
                joinUsButton.classList.remove('disabled-link');
                joinUsButton.removeAttribute('inert', '')    
            }

        if (joinUsCurtain) 
            {
                joinUsCurtain.classList.remove('disabled-link');
                joinUsCurtain.removeAttribute('inert', '')    
            }


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
        window.location.replace('/index.html');
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


        if (error.message.includes("Auth session missing!")) {
            console.log("Logout successful (session was already gone).");
            updateUIForLoginState(false);
            // Proceed with redirecting the user or updating UI as if logout succeeded
        } 
            else 
        {
            alert('Logout failed: ' + error.message);
            console.error('Logout error:', error);
            window.location.replace('/index.html');
            return false;
        }
    } 
    else 
    {
        updateUIForLoginState(false);
        alert('Logged out successfully!');
        console.log('User logged out.');
        window.location.replace('/index.html');
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
        window.location.replace('/index.html');
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

//------------------------------------------------
// Sign up a new user
async function signUpUser(email, password) {
  //Sign up a new user with email and password
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });
  //Error handling
  if (error) {    
   alert('ERROR! PLEASE TRY AGAIN');   
  } else {    
    alert('SIGNED UP SUCCESSFULLY! PLEASE SIGN IN NOW');
    window.location.replace('/index.html');    
  }
}

//Handle sign up button click
const signUpButton = document.getElementById('signUpButton');
if (signUpButton) {
    document.getElementById('signUpButton').addEventListener('click', () => {
    let email = document.getElementById('signupemail').value.trim();
    let password = document.getElementById('signuppassword').value.trim();
    signUpUser(email, password);
    })};











//----------------------------------------------------------------------- Database work ---------------------------------
// Supabase client setup

//------------------------------------------------


//------------------------------------------------
// Insert message into the database
async function insertMessageToDB(name, email, message) {
 //Insert a new message into the "messages" table
 const { data, error } = await supabase
  .from('messages')
  .insert([
   { name: name, email: email, message: message }
  ]);
  //Error handling
 if (error) {
  console.error('Error inserting message:', error);
  return null;
 }
 return data;
}

//------------------------------------------------
// Handle form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) 
    {document.getElementById('contactForm').addEventListener('submit', async function(e) {


        //Prevent the default form submission behavior
        e.preventDefault();
        //Get form values and trim whitespace
        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let message = document.getElementById('message').value.trim();
        
        //Basic validation to ensure all fields are filled
        if (!name || !email || !message) {
        document.getAnimationsById('notification').textContent = 'Please fill in all fields.';
        document.getElementById('dialogContainer').showModal();
        return;
        }
        
        //Insert the message into the database
        insertMessageToDB(name, email, message).then( () => {
        //Display success message and reset the form  
        document.getElementById('notification').textContent = 'Your message has been sent! Thank you';
        document.getElementById('dialogContainer').showModal();
        document.getElementById('contactForm').reset();
        displayMessages();
        })
        })
    };



//------------------------------------------------
// Upload file to Supabase Storage
// Handles both logged-in users (private folder) and anonymous users (public root)
async function uploadFileToDB() {
 let fileInput = document.getElementById('fileInput');
 let file = fileInput.files[0];
 let BUCKET_NAME = 'uploads';
 
 // Basic validation to ensure a file is selected
 if (!file) {
  alert('Please select a file to upload.');
  return;
 }
 
 // Check if user is logged in
 const { data: { session } } = await supabase.auth.getSession();
 
 let filePath;
 if (session) {
  // LOGGED IN: Upload to user's private folder
  const userId = session.user.id;
  filePath = `${userId}/${Date.now()}_${file.name}`;
  console.log('Uploading to user folder:', filePath);
 } else {
  // NOT LOGGED IN: Upload to public root
  filePath = `${Date.now()}_${file.name}`;
  console.log('Uploading to public root:', filePath);
 }
 
 // Upload the file to the 'uploads' bucket
 let { data, error } = await supabase
  .storage
  .from(BUCKET_NAME)
  .upload(filePath, file);
 
 // Error handling
 if (error) {
  console.error('Error uploading file:', error);
  alert('File upload failed: ' + error.message);
  return;
 }
 
 // File uploaded successfully
 alert('File uploaded successfully: ' + data.path);
 console.log('File upload data:', data);
 fileInput.value = ''; // Clear the input
 
 // Refresh the displayed images
 displayAllImages();
}


// Handle file upload button click
const uploadBtn = document.getElementById('contactForm');
if (uploadBtn) 
    {
        document.getElementById('uploadBtn').addEventListener('click', uploadFileToDB);


        //------------------------------------------------
        // Display images based on login status
        // - If logged in: show ONLY user's private images
        // - If NOT logged in: show ONLY public (root level) images
        async function displayAllImages() {
        let bucketName = 'uploads';
        let imageContainer = document.getElementById('images-gallery');
        
        // Initialize Supabase if needed
        const client = await initializeSupabase();
        if (!client) {
        imageContainer.innerHTML = '<p>Unable to load images - service unavailable.</p>';
        return;
        }

        // Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {const userId = session.user.id;
        
        // List files in the user's folder
        let { data: files, error: listError } = await supabase
        .storage
        .from(bucketName)
        .list(userId);
        
        // Error handling
        if (listError) {
        console.error('Error listing user images:', listError.message);
        imageContainer.innerHTML = '<p>Error loading your images.</p>';
        return;
        }
        
        // Clear previous images
        imageContainer.innerHTML = '';
        
        // Filter out placeholder files
        let userFiles = files.filter(file => file.name !== '.emptyFolderPlaceholder');
        
        if (userFiles.length === 0) {
        imageContainer.innerHTML = '<p>You have no uploaded images yet.</p>';
        return;
        }
        
        // Display user's images
        for (const file of userFiles) {
        let { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(`${userId}/${file.name}`);
        
        if (publicUrlData && publicUrlData.publicUrl) {
            let imgElement = document.createElement('img');
            imgElement.src = publicUrlData.publicUrl;
            imgElement.alt = file.name;
            imgElement.style.maxWidth = '200px';
            imgElement.style.margin = '10px';
            imgElement.style.border = '2px solid green'; // Visual indicator for user images
            imageContainer.appendChild(imgElement);
        }
        }
        
        } else {
        // USER NOT LOGGED IN: Show only public (root level) images
        
        // List all items in the ROOT of the bucket
        let { data: files, error: listError } = await supabase
        .storage
        .from(bucketName)
        .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
        });
        
        // Error handling
        if (listError) {
        console.error('Error listing public images:', listError.message);
        imageContainer.innerHTML = '<p>Error loading public images.</p>';
        return;
        }
        
        // Clear previous images
        imageContainer.innerHTML = '';
        
        // Filter: Only show FILES (not folders) at root level
        // Folders have id === null, files have actual IDs
        let publicFiles = files.filter(item => {
        return item.id !== null && item.name !== '.emptyFolderPlaceholder';
        });
        
        if (publicFiles.length === 0) {
        imageContainer.innerHTML = '<p>No public images available.</p>';
        return;
        }
        
        // Display public images
        for (const file of publicFiles) {
        let { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(file.name);
        
        if (publicUrlData && publicUrlData.publicUrl) {
            let imgElement = document.createElement('img');
            imgElement.src = publicUrlData.publicUrl;
            imgElement.alt = file.name;
            imgElement.style.maxWidth = '200px';
            imgElement.style.margin = '10px';
            imgElement.style.border = '2px solid blue'; // Visual indicator for public images
            imageContainer.appendChild(imgElement);
        }
        }
        }
        }
    displayAllImages();
    }
// Display images on page load

