if (isProduction) {
    // Override the console methods to be empty functions (No operation - NOOP)
    //console.log = function() {}; // Manually controlled for better control of logging to console.
    //console.warn = function() {};
    //console.error = function() {}; 
    // also available to override. .info, .debug, etc.
}

function getCurrentPictureIndex() {
    const storedValue = sessionStorage.getItem(pictureIndexKey);
    const index = parseInt(storedValue, 10);
    return isNaN(index) ? 0 : index;
}

function setCurrentPictureIndex(index) {
    if (typeof index === 'number' && !isNaN(index)) {
        sessionStorage.setItem(pictureIndexKey, index.toString());
    } else {
        console.error("Attempted to set an invalid index value to session storage.");
    }
}

const pictureIndexKey = 'PictureIndexSessionKey'; 
let firstItemHeight = 0;

let currentPictureIndex1 = 0

function showBaseImages() {

    if (isProduction==false) {console.log('************Show Image Code Running***********');}
 
    //Reference main pictures for home page.
    const photoImg1 = document.querySelector('#photoitem1 img'); 
    const photoImg2 = document.querySelector('#photoitem2 img'); 
    const photoImg3 = document.querySelector('#photoitem3 img'); 
    const photoImg4 = document.querySelector('#photoitem4 img'); 
    const photoImg5 = document.querySelector('#photoitem5 img'); 
    const photoImg6 = document.querySelector('#photoitem6 img'); 
    const photoImg7 = document.querySelector('#photoitem7 img'); 
    const photoImg8 = document.querySelector('#photoitem8 img'); 
    const photoImg9 = document.querySelector('#photoitem9 img'); 
    const photoImg10 = document.querySelector('#photoitem10 img'); 
    const photoImg11 = document.querySelector('#photoitem11 img'); 
    const photoImg12 = document.querySelector('#photoitem12 img'); 
    const photoImg13 = document.querySelector('#photoitem13 img'); 

    // Load default pictures for Home Page.
    photoImg1.src = images[5].picPath;
    photoImg2.src = images[10].picPath;
    photoImg3.src = images[8].picPath;
    photoImg4.src = images[3].picPath;
    photoImg5.src = images[12].picPath;
    photoImg6.src = images[7].picPath;
    photoImg7.src = images[0].picPath;
    photoImg8.src = images[6].picPath;
    photoImg9.src = images[3].picPath;
    photoImg10.src = images[9].picPath;
    photoImg11.src = images[1].picPath;
    photoImg12.src = images[4].picPath;
}

//When users click on "sandwich icon", open or show the curtain menu layer
function openNav() {
    document.getElementById("myNav").style.display = "block";
}
//Write the closeNav() method here
function closeNav() {
    document.getElementById("myNav").style.display = "none";
}

function updateImageLinks() {
    console.info('Running Update Image Links');
    
    // Select all <a> tags that are children of .gallery-grid
    const imageLinks = document.querySelectorAll('.gallery-grid a');
    
    imageLinks.forEach(link => {
        const img = link.querySelector('img'); 
        if (img) {
            // Get the current (potentially new) source of the image
            const imgSrc = encodeURIComponent(img.src);
            
            // Update the link's href with the new source
            link.href = `pictureSingleView.html?src=${imgSrc}`;
            console.log(`Link Updated for : ${link.href}`);
        }
    });
}

// Global variable to store the debounce timeout ID
let resizeTimeout;

// 5. Initial Execution and Resizing
window.addEventListener('load', setScreenUp);

// Debounce the resize event: Wait 50ms after the user stops resizing
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setScreenUp, 50);
});
