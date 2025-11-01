//import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://hcqhtsoqwayepuebvuyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcWh0c29xd2F5ZXB1ZWJ2dXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQ4NjUsImV4cCI6MjA3NTg3MDg2NX0.CW5tsqbuiiAiIJ5INEIFH9dzLmms789IcQq3Z01TCLI';
const supabase = createClient(supabaseUrl, supabaseKey);

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
});


// Upload file to Supabase Storage
async function uploadFileToDB() {
 // Get the file from the input element  
 let fileInput = document.getElementById('fileInput');
 let file = fileInput.files[0];
 let BUCKET_NAME = 'uploads'; // Ensure you have a bucket named 'uploads'
 // Basic validation to ensure a file is selected
 if (!file) {
  alert('Please select a file to upload.');
  return;
 } 
 // Create a unique file path using timestamp and original file name
 const filePath = `${Date.now()}_${file.name}`;
 // Upload the file to the 'uploads' bucket in Supabase Storage
 let { data, error } = await supabase
  .storage
  .from(BUCKET_NAME)
  .upload(filePath, file); 
 // Error handling
 if (error) {
  console.error('Error uploading file:', error);
  alert('File upload failed.');
  return;
 }
 // File uploaded successfully
 alert('File uploaded successfully: ' + data.path);
 console.log('File upload data:', data);  
 fileInput.value = ''; // Clear the input
 // Refresh the displayed images

}
// Handle file upload button click
document.getElementById('uploadBtn').addEventListener('click', uploadFileToDB);


// Display all images from Supabase Storage
async function displayAllImages() {
 let bucketName = 'uploads'; // Replace with your bucket name
 // List all files in the specified bucket
 let { data: files, error: listError } = await supabase
  .storage
  .from(bucketName)
  .list();
 // Error handling
 if (listError) {
  console.error('Error listing images:', listError.message);
  return;
 }
 // Get the container element to display images
 let imageContainer = document.getElementById('images-gallery');
 imageContainer.innerHTML = ''; // Clear previous images
 // Iterate through the files and create image elements
 for (const file of files) {
  if (file.name !== '.emptyFolderPlaceholder') { // Exclude placeholder files
   // Get the public URL for each file
   let { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(file.name);
   // Create and append image element if public URL is available
   if (publicUrlData && publicUrlData.publicUrl) {
    let imgElement = document.createElement('img');
    imgElement.src = publicUrlData.publicUrl;
    imgElement.alt = file.name;
    imgElement.style.maxWidth = '200px'; // Example styling
    imgElement.style.margin = '10px';
    imageContainer.appendChild(imgElement);
   }
  }
 }
}

// Call this function to display images on page load or after an upload
displayAllImages();


