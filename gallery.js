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
let pic13OrientationPortrait = false;
let pic14OrientationPortrait = false;

let currentPictureIndex = getCurrentPictureIndex()
if (isProduction==false) {console.log(`Picture Index Initialized: ${currentPictureIndex}`);}

/*
const D344_882 = window.matchMedia('(width: 344px) and (height:882px)');
const D360 = window.matchMedia('(min-width: 360px)')
const D360_740 = window.matchMedia('(min-width: 360px) and (min-height: 740px)');
const D424_859 = window.matchMedia('(min-width: 424px) and (max-height: 859px)');
const D424_860 = window.matchMedia('(min-width:424px) and (min-height:860px)');
const D540_600 = window.matchMedia('(min-width: 540px) and (min-height: 600px)');
const D768 = window.matchMedia('(max-width: 768px)');
const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1200px)');
const D1000_750 = window.matchMedia('(min-width: 1000px) and (min-height: 750px)');
const AR15_9 = window.matchMedia('(min-aspect-ratio: 15/9)');
const D1024_600 = window.matchMedia('(min-width: 1024px) and (min-height: 600px)');
// To use         if (D1024_600.matches) {}
*/


function showImage(firstload) {

    if (isProduction==false) {console.log('************Show Image Code Running***********');}
 
    const photoImg1 = document.querySelector('#photoitem1 img'); 
    //const photoItem1 = photoImg1.parentElement.parentElement;  
    const photoImg2 = document.querySelector('#photoitem2 img'); 
    //const photoItem2 = photoImg2.parentElement.parentElement; 
    const photoImg3 = document.querySelector('#photoitem3 img'); 
    //const photoItem3 = photoImg3.parentElement.parentElement; 
    const photoImg4 = document.querySelector('#photoitem4 img'); 
    //const photoItem4 = photoImg4.parentElement.parentElement; 
    const photoImg5 = document.querySelector('#photoitem5 img'); 
    //const photoItem5 = photoImg5.parentElement.parentElement; 
    const photoImg6 = document.querySelector('#photoitem6 img'); 
    //const photoItem6 = photoImg6.parentElement.parentElement; 
    const photoImg7 = document.querySelector('#photoitem7 img'); 
    //const photoItem7 = photoImg7.parentElement.parentElement; 
    const photoImg8 = document.querySelector('#photoitem8 img'); 
    //const photoItem8 = photoImg8.parentElement.parentElement; 
    const photoImg9 = document.querySelector('#photoitem9 img'); 
    //const photoItem9 = photoImg9.parentElement.parentElement; 
    const photoImg10 = document.querySelector('#photoitem10 img'); 
    //const photoItem10 = photoImg10.parentElement.parentElement; 
    const photoImg11 = document.querySelector('#photoitem11 img'); 
    //const photoItem11 = photoImg11.parentElement.parentElement; 
    const photoImg12 = document.querySelector('#photoitem12 img'); 
    //const photoItem12 = photoImg12.parentElement.parentElement; 
    const photoImg13 = document.querySelector('#photoitem13 img'); 
    //const photoItem13 = photoImg13.parentElement.parentElement; 
   

    let portrait1 = false; let portrait2 = false; let portrait3 = false; let portrait4 = false; let portrait5 = false;
    let portrait6 = false;let portrait7 = false; let portrait8 = false;; let portrait9 = false;; let portrait10 = false;
    let portrait11 = false;let portrait12 = false;let portrait13 = false;

    const openGalleryButton = document.querySelector('.open-gallery');
    openGalleryButton.disabled = true; //Disabled to ensure this can not run again until Image 13 is fully loaded
    console.log('Button Disabled'); // Image 13 onload enables the button.
 
    if (firstload) 
        {   
            console.log('FirstLoad');
            console.log(photoImg1.src)
            if (photoImg1.src.endsWith("gallery.html"))
            //if (photoImg1.src=='https://cunnip.github.io/pictura_test2/gallery.html')
            {
                console.log('No Current Pictures Found - Loading Pictures');
                //currentPictureIndex = 0

                let pictureDetails = getPictureDetails(13).path;
                console.log(`Picture Details: ${pictureDetails}`);

                pictureDetails = getPictureDetails(1).path;
                console.log(`Picture Details: ${pictureDetails}`);

                if (pictureDetails != 'initial_path/image_1.jpg')
                    {
                        console.log('FoundPicturesInArray');

                        photoImg1.src = getPictureDetails(1).path
                        portrait1 = getPictureDetails(1).isPortrait

                        photoImg2.src = getPictureDetails(2).path
                        portrait2 = getPictureDetails(2).isPortrait

                        photoImg3.src = getPictureDetails(3).path
                        portrait3 = getPictureDetails(3).isPortrait

                        photoImg4.src = getPictureDetails(4).path
                        portrait4 = getPictureDetails(4).isPortrait
                        photoImg5.src = getPictureDetails(5).path
                        portrait5 = getPictureDetails(5).isPortrait
                        photoImg6.src = getPictureDetails(6).path
                        portrait6 = getPictureDetails(6).isPortrait
                        photoImg7.src = getPictureDetails(7).path
                        portrait7 = getPictureDetails(7).isPortrait
                        photoImg8.src = getPictureDetails(8).path
                        portrait8 = getPictureDetails(8).isPortrait
                        photoImg9.src = getPictureDetails(9).path
                        portrait9 = getPictureDetails(9).isPortrait
                        photoImg10.src = getPictureDetails(10).path
                        portrait10 = getPictureDetails(10).isPortrait
                        photoImg11.src = getPictureDetails(11).path
                        portrait11 = getPictureDetails(11).isPortrait
                        photoImg12.src = getPictureDetails(12).path
                        portrait12 = getPictureDetails(12).isPortrait
                        photoImg13.src = getPictureDetails(13).path
                        portrait13 = getPictureDetails(13).isPortrait
                        pic13OrientationPortrait = portrait13
                        console.log(`Image pic13OrientationPortrait: ${pic13OrientationPortrait}`);
                        console.log(`Portrait 13: ${portrait13}`);

                            photoImg13.onload = function() {
                                console.log(`Image 13 URL: ${photoImg13.src}`);
                                console.log(`Image pic13OrientationPortrait: ${pic13OrientationPortrait}`);
                                console.log(`Portrait 13: ${portrait13}`);

                                const actualWidth13 = this.naturalWidth;
                                const actualHeight13 = this.naturalHeight;
                                const openGalleryButton = document.querySelector('.open-gallery');
                                openGalleryButton.disabled = false; 
                                console.log('Button Enabled');
                                console.log(`Image 13 Safely loaded: ${actualWidth13}x${actualHeight13}`);
                                //setScreenUp()
                                }
                        
                        return
                    }
                else
                    {
                        currentPictureIndex = 0;
                        console.log('No photos found in my array, manually loading photos');
                        photoImg1.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg2.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg3.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg4.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg5.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg6.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg7.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg8.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg9.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg10.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg11.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg12.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                        photoImg13.src = images[currentPictureIndex].picPath;
                        currentPictureIndex = (currentPictureIndex + 1) % images.length;
                        setCurrentPictureIndex(currentPictureIndex);
                            photoImg13.onload = function() {
                                console.log(`Image URL: ${photoImg13.src}`);
                                const actualWidth13 = this.naturalWidth;
                                const actualHeight13 = this.naturalHeight;
                                if (actualWidth13 < actualHeight13) {pic13OrientationPortrait = true} else {pic13OrientationPortrait = false};
                                const openGalleryButton = document.querySelector('.open-gallery');
                                openGalleryButton.disabled = false; 
                                console.log('Button Enabled');
                                console.log(`Image 13 Safely loaded: ${actualWidth13}x${actualHeight13}`);
                                setScreenUp()
                                }
                        return
                    }
                return  
            }
            else
            {
                const openGalleryButton = document.querySelector('.open-gallery');
                openGalleryButton.disabled = false; 
                console.log('Button Enabled');
                console.log('PicturesFound');
                return
            }
        }
    else
        {
            console.log('DID NOT RUN FIRST LOAD');
            portrait13 = pic13OrientationPortrait

        }
    //if (userIsLoggedIn==false) {return};
    
    if (portrait13)
            {
                photoImg1.src = photoImg13.src;
                photoImg13.src = images[currentPictureIndex].picPath;
            }
        else
            {    
                photoImg1.src = photoImg2.src;
                photoImg2.src = photoImg3.src;
                photoImg3.src = photoImg4.src;
                photoImg4.src = photoImg5.src;
                photoImg5.src = photoImg6.src;
                photoImg6.src = photoImg7.src;
                photoImg7.src = photoImg8.src;
                photoImg8.src = photoImg9.src;
                photoImg9.src = photoImg10.src;
                photoImg10.src = photoImg11.src;
                photoImg11.src = photoImg12.src;
                photoImg12.src = photoImg13.src;
                photoImg13.src = images[currentPictureIndex].picPath;
            }

    updateImageLinks()

    console.log(`Image 1 URL: ${photoImg1.src}`);
    photoImg1.onload = function() {
        const actualWidth1 = this.naturalWidth;
        const actualHeight1 = this.naturalHeight;
        console.log(`Image 1 During onload check: ${actualWidth1}x${actualHeight1}`);
        updatePictureDetails(1, photoImg1.src, actualWidth1>actualHeight1);
        console.log(`Image 1 Safely loaded: ${actualWidth1}x${actualHeight1}`);
        console.log(`Image 1 Running setScreenUp()`);
        setScreenUp()
    }

    console.log(`Image 2 URL: ${photoImg2.src}`);
    photoImg2.onload = function() {
        const actualWidth2 = this.naturalWidth;
        const actualHeight2 = this.naturalHeight;
        console.log(`Image 2 During onload check: ${actualWidth2}x${actualHeight2}`);
        updatePictureDetails(2, photoImg2.src, actualWidth2>actualHeight2);
        console.log(`Image 2 Safely loaded: ${actualWidth2}x${actualHeight2}`);
    }

    console.log(`Image 3 URL: ${photoImg3.src}`);
    photoImg3.onload = function() {
        const actualWidth3 = this.naturalWidth;
        const actualHeight3 = this.naturalHeight;
        updatePictureDetails(3, photoImg3.src, actualWidth3<actualHeight3);
        console.log(`Image 3 Safely loaded: ${actualWidth3}x${actualHeight3}`);
    }

    console.log(`Image 4 URL: ${photoImg4.src}`);
    photoImg4.onload = function() {
        const actualWidth4 = this.naturalWidth;
        const actualHeight4 = this.naturalHeight;
        updatePictureDetails(4, photoImg4.src, actualWidth4<actualHeight4);
        console.log(`Image 4 Safely loaded: ${actualWidth4}x${actualHeight4}`);
    }

    console.log(`Image 5 URL: ${photoImg5.src}`);
    photoImg5.onload = function() {
        const actualWidth5 = this.naturalWidth;
        const actualHeight5 = this.naturalHeight;
        updatePictureDetails(5, photoImg5.src, actualWidth5<actualHeight5);
        console.log(`Image 5 Safely loaded: ${actualWidth5}x${actualHeight5}`);
    }

    console.log(`Image 6 URL: ${photoImg6.src}`);
    photoImg6.onload = function() {
        const actualWidth6 = this.naturalWidth;
        const actualHeight6 = this.naturalHeight;
        updatePictureDetails(6, photoImg6.src, actualWidth6<actualHeight6);
        console.log(`Image 6 Safely loaded: ${actualWidth6}x${actualHeight6}`);
    }

    console.log(`Image 7 URL: ${photoImg7.src}`);
    photoImg7.onload = function() {
        const actualWidth7 = this.naturalWidth;
        const actualHeight7 = this.naturalHeight;
        updatePictureDetails(7, photoImg7.src, actualWidth7<actualHeight7);
        console.log(`Image 7 Safely loaded: ${actualWidth7}x${actualHeight7}`);
    }

    console.log(`Image 8 URL: ${photoImg8.src}`);
    photoImg8.onload = function() {
        const actualWidth8 = this.naturalWidth;
        const actualHeight8 = this.naturalHeight;
        updatePictureDetails(8, photoImg8.src, actualWidth8<actualHeight8);
        console.log(`Image 8 Safely loaded: ${actualWidth8}x${actualHeight8}`);
    }

    console.log(`Image 9 URL: ${photoImg9.src}`);
    photoImg9.onload = function() {
        const actualWidth9 = this.naturalWidth;
        const actualHeight9 = this.naturalHeight;
        updatePictureDetails(9, photoImg9.src, actualWidth9<actualHeight9);
        console.log(`Image 9 Safely loaded: ${actualWidth9}x${actualHeight9}`);
    }

    console.log(`Image 10 URL: ${photoImg10.src}`);
    photoImg10.onload = function() {
        const actualWidth10 = this.naturalWidth;
        const actualHeight10 = this.naturalHeight;
        updatePictureDetails(10, photoImg10.src, actualWidth10<actualHeight10);
        console.log(`Image 10 Safely loaded: ${actualWidth10}x${actualHeight10}`);
    }

    console.log(`Image 11 URL: ${photoImg11.src}`);
    photoImg11.onload = function() {
        const actualWidth11 = this.naturalWidth;
        const actualHeight11 = this.naturalHeight;
        updatePictureDetails(11, photoImg11.src, actualWidth11<actualHeight11);
        console.log(`Image 11 Safely loaded: ${actualWidth11}x${actualHeight11}`);
    }

    console.log(`Image 12 URL: ${photoImg12.src}`);
    photoImg12.onload = function() {
        const actualWidth12 = this.naturalWidth;
        const actualHeight12 = this.naturalHeight;
        updatePictureDetails(12, photoImg12.src, actualWidth12<actualHeight12);
        console.log(`Image 12 Safely loaded: ${actualWidth12}x${actualHeight12}`);
    }

    // Load an extra picture that is not displayed to ensure getting the right dimensions.
    photoImg13.onload = function() {
        console.log(`Image 13 URL: ${photoImg13.src}`);
        const actualWidth13 = this.naturalWidth;
        const actualHeight13 = this.naturalHeight;
        if (actualWidth13 < actualHeight13) {pic13OrientationPortrait = true} else {pic13OrientationPortrait = false};
        updatePictureDetails(13, photoImg13.src, actualWidth13<actualHeight13);
        const openGalleryButton = document.querySelector('.open-gallery');
        openGalleryButton.disabled = false; 
        console.log('Button Enabled');
        console.log(`Image 13 Safely loaded: ${actualWidth13}x${actualHeight13}`);
    }
    currentPictureIndex = (currentPictureIndex + 1) % images.length;
    setCurrentPictureIndex(currentPictureIndex);

    console.log('ImageQty' + images.length)
    console.log('CurrentPicIndex' + currentPictureIndex)

    // This was unreliable, it sometimes returned extra rows, so I used the variables from the CSS instead.
    //const rowsValueString = computedStyle.getPropertyValue("grid-template-rows");
    //const rowTracks = rowsValueString.split(/\s+/).filter(Boolean);
    //const liveRowCount = rowTracks.length;
    //const ColumnValueString = computedStyle.getPropertyValue("grid-template-columns");
    //const ColumnTracks = ColumnValueString.split(/\s+/).filter(Boolean);
    //const liveColumnCount = ColumnTracks.length;

    const galleryGrid = document.getElementById("gallerygrid");
    let computedStyle = getComputedStyle(galleryGrid);
    const liveRowCount = computedStyle.getPropertyValue('--rows');
    const liveColumnCount = computedStyle.getPropertyValue('--columns');


    //const firstGridItem = document.querySelector('.gallery-grid > *:first-child');
    //if (firstItemHeight===0) {firstItemHeight = firstGridItem.offsetHeight;}
    //console.log(`Row Height: ${(firstItemHeight)} px`);

    //How many portrait photos are included in the first 10 pictures
    
    let gridBoxCount = liveRowCount * liveColumnCount;
    console.log(`Rows: ${(liveRowCount)}`);
    console.log(`Columns: ${(liveColumnCount)}`);
    console.log(`Grid Box Count: ${(gridBoxCount)}`);
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
