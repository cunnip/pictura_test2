import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://hcqhtsoqwayepuebvuyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcWh0c29xd2F5ZXB1ZWJ2dXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQ4NjUsImV4cCI6MjA3NTg3MDg2NX0.CW5tsqbuiiAiIJ5INEIFH9dzLmms789IcQq3Z01TCLI';
const supabase = createClient(supabaseUrl, supabaseKey);

//------------------------------------------------
// CHECK FOR EXISTING SESSION ON PAGE LOAD
//------------------------------------------------
async function checkExistingSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (session) {
    // User is logged in
    document.getElementById('login-status').textContent = `Signed in as ${session.user.email}`;
    document.getElementById('logoutBtn').style.display = 'inline-block';
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    console.log('Current session:', session);
  } else {
    // No active session
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('signin-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'block';
    console.log('No active session.');
  }
}

// Call this function when the page loads
checkExistingSession();

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    document.getElementById('login-status').textContent = `Signed in as ${session.user.email}`;
    document.getElementById('logoutBtn').style.display = 'inline-block';
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    console.log('User signed in:', session.user);
    // Refresh images when user signs in
    displayAllImages();
  } else if (event === 'SIGNED_OUT') {
    document.getElementById('login-status').textContent = 'PLEASE SIGN IN';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('signin-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'block';
    console.log('User signed out.');
    // Refresh images when user signs out
    displayAllImages();
  }
});

//------------------------------------------------
// Fetch messages from the database
async function getMessageFromDB() {
 //Fetch all messages from the "messages" table, ordered by creation date (newest first)
 const { data, error } = await supabase
  .from('messages')
  .select('*')
  .order('created_at', { ascending: false });
  //Error handling
 if (error) {
  console.error('Error fetching messages:', error);
  return [];
 }
 return data; 
}

//------------------------------------------------
// Display messages on the page
async function displayMessages() {
 let messages = await getMessageFromDB();
 let container = document.getElementById('messagesContainer');
 if (messages.length === 0) {
  container.innerHTML = '<p>No messages found.</p>';
  return;
 }
 container.innerHTML = messages.map(msg => `
  <div class="message">
   <strong>${msg.name || 'Anonymous'}:</strong>
   <span>${msg.email}</span>
   <span>. Message: ${msg.message}</span>
   <em>. Sent: ${new Date(msg.created_at).toLocaleString()}</em>
  </div>
 `).join('');
}

displayMessages();


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
document.getElementById('contactForm').addEventListener('submit', async function(e) {
 
 //Prevent the default form submission behavior
 e.preventDefault();
 //Get form values and trim whitespace
 let name = document.getElementById('name').value.trim();
 let email = document.getElementById('email').value.trim();
 let message = document.getElementById('message').value.trim();
 
 //Basic validation to ensure all fields are filled
 if (!name || !email || !message) {
  document.getElementById('notification').textContent = 'Please fill in all fields.';
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
});


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
document.getElementById('uploadBtn').addEventListener('click', uploadFileToDB);


//------------------------------------------------
// Display images based on login status
// - If logged in: show ONLY user's private images
// - If NOT logged in: show ONLY public (root level) images
async function displayAllImages() {
 let bucketName = 'uploads';
 let imageContainer = document.getElementById('images-gallery');
 
 // Check if user is logged in
 const { data: { session } } = await supabase.auth.getSession();
 
 if (session) {
  // USER IS LOGGED IN: Show only their private images
  const userId = session.user.id;
  
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

// Display images on page load
displayAllImages();


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
  }
}

//Handle sign up button click
document.getElementById('signUpButton').addEventListener('click', () => {
  let email = document.getElementById('signupemail').value.trim();
  let password = document.getElementById('signuppassword').value.trim();
  signUpUser(email, password);
});

//------------------------------------------------
//Sign in an existing user
async function signInUser(email, password) {
  //Sign in an existing user with email and password  
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  //Error handling
  if (error) {      
    alert('ERROR! PLEASE TRY AGAIN');   
  } else {
    //Update status on successful sign in
    document.getElementById('login-status').textContent = `Signed in as ${email}`; 
    //Show the button LOGOUT
    document.getElementById('logoutBtn').style.display = 'inline-block'; 
    //Hide the sign in section & the sign up section
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    //Display message in dialog box  
    alert('SIGNED IN SUCCESSFULLY! WELCOME BACK!');
    console.log('User signed in:', data.user);
  }
}
//Handle sign in button click
document.getElementById('signInButton').addEventListener('click', () => {
  let email = document.getElementById('signinemail').value.trim();
  let password = document.getElementById('signinpassword').value.trim();
  signInUser(email, password);
});

//------------------------------------------------
// Sign out the current user
async function signOutUser() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    alert('ERROR! PLEASE TRY AGAIN');
    console.error('Error logging out:', error.message);
    return false;
  }
  alert('SIGNED OUT SUCCESSFULLY! BYE FOR NOW!'); 
  console.log('User logged out successfully.');
  //Hide the button LOGOUT
  document.getElementById('logoutBtn').style.display = 'none';
  //Show the sign in section & the sign up section
  document.getElementById('signin-section').style.display = 'block';
  document.getElementById('signup-section').style.display = 'block';
  return true;
}
//Handle logout button click
document.getElementById('logoutBtn').addEventListener('click', () => {
  signOutUser().then( (signedOut) => {
    if (signedOut) {    
      document.getElementById('login-status').textContent = 'PLEASE SIGN IN';
    } 
  });
});