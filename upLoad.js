document.addEventListener('click', preventLinkClick);

//When users click on "sandwich icon", open or show the curtain menu layer

//Write the closeNav() method here
function openNav() {
    document.getElementById("myNav").style.display = "block";
}
//Write the closeNav() method here
function closeNav() {
    document.getElementById("myNav").style.display = "none";
}

function resetToDefault() {
    document.getElementById("customize-div").style.backgroundColor = "white";
    document.getElementById("customize-div").style.fontSize = "16px";
    document.getElementById("customize-div").style.color = "black";
    document.getElementById("colorOption").value = "white";
    document.getElementById("sizeOption").value = "16px";
    document.getElementById("fontOption").value = "black";
}


// Get the necessary elements
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');

// Add an event listener that fires whenever a file is selected or changed
fileInput.addEventListener('change', function() {
    // Check if any file was selected
    if (this.files && this.files[0]) {
        const file = this.files[0];
        
        // 1. Create a FileReader object
        const reader = new FileReader();

        // 2. Set up the function to run when the file is successfully read
        reader.onload = function(e) {
            // Set the result (the data URL) as the image source
            imagePreview.src = e.target.result;
            // Make the image visible
            imagePreview.style.display = 'block';
        };

        // 3. Read the selected file as a Data URL
        // This triggers the reader.onload function above
        reader.readAsDataURL(file);
    } else {
        // If the user clears the selection, hide the preview
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
    }
});

