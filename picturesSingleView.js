// Camel Case Checked

if (isProduction) {
    console.log = function() {};
    //console.warn = function() {};
    //console.error = function() {}; 
    // also available to override. .info, .debug, etc.
}

let viewPortWidth = window.innerWidth;
let viewPortHeight = window.innerHeight;
if (isProduction==false) {console.log(`CurrentScreenDimensions: ${(viewPortWidth)} x ${(viewPortHeight)}`);}
let screenOrientationPortrait = window.matchMedia("(orientation: portrait)");

function showSingleImage() 
    {
        // Display the image and adjust to ensure rotation is correct.
        console.log(`************Show Single Image Code Running***********: ${(now)}`);
        if (userIsLoggedIn==false) {return};
        const photoImg14 = document.querySelector('#photoitem14 img'); 
        const photoItem14 = photoImg14.parentElement; 
        let viewPortWidth = window.innerWidth;
        let viewPortHeight = window.innerHeight;
        let viewportScale = viewPortWidth/viewPortHeight
        let galleryGrid = false
        photoImg14.onload = function() 
            {
                const actualWidth14 = this.naturalWidth;
                const actualHeight14 = this.naturalHeight;
                if (actualWidth14 < actualHeight14) {pic14rientationPortrait = true} else {pic14rientationPortrait = false};

                updateGalleryOrientation(screenOrientationPortrait,pic14rientationPortrait,viewportScale,viewPortHeight)
                if (isProduction==false) {displayGridDetails()};
            }
    }

function displayGridDetails()
    {
        galleryGrid = document.getElementById("gallerygrid2");
        let computedStyle = getComputedStyle(galleryGrid);
        const liveRowCount = computedStyle.getPropertyValue('--rows');
        const liveColumnCount = computedStyle.getPropertyValue('--columns');
        
        let gridBoxCount = liveRowCount * liveColumnCount;
        if (isProduction==false) {console.log(`Rows: ${(liveRowCount)}`);}
        if (isProduction==false) {console.log(`Columns: ${(liveColumnCount)}`);}
        if (isProduction==false) {console.log(`Grid Box Count: ${(gridBoxCount)}`);}
    }

function showSingleImageReload() 
    {
        // Check the image and adjust to ensure rotation is correct when making changes to the view.
        if (isProduction==false) {console.log(`************Show Single Image Code RELOAD Running***********: ${(now)}`);}

        const photoImg14 = document.querySelector('#photoitem14 img'); 
        let viewPortWidth = window.innerWidth;
        let viewPortHeight = window.innerHeight;
        let viewportScale = viewPortWidth/viewPortHeight
        let galleryGrid = false
        
        if (isProduction==false) {console.log(`Image URL: ${photoImg14.src}`);}
        const actualWidth14 = photoImg14.naturalWidth;
        const actualHeight14 = photoImg14.naturalHeight;
        if (actualWidth14 < actualHeight14) {pic14rientationPortrait = true} else {pic14rientationPortrait = false};

        updateGalleryOrientation(screenOrientationPortrait,pic14rientationPortrait,viewportScale,viewPortHeight)
        if (isProduction==false) {displayGridDetails()};
    }

function updateGalleryOrientation(screenOrientationPortrait, pic14rientationPortrait, viewportScale, viewPortHeight) 
    {
        // Locate the element I need to work with
        const galleryGrid = document.querySelector('.page-single-view .gallery-grid2');

        if (!galleryGrid) {
            console.error("Error: .page-single-view .gallery-grid2 not found.");
            return;
        }

        //let newtop = '10%';
        //let newleft = '0%';
        let newTransform = 'rotate(0deg) scale(1)'; // Default: No transform
        let logMessage = "Screen is in Landscape mode (no transform)";

        // --- Portrait Screen Logic ---
        if (screenOrientationPortrait.matches) 
            {
                // No transformation.
                if (pic14rientationPortrait === true) 
                    {
                        if (viewPortWidth === 375 && viewPortHeight == 667)
                            {
                                galleryGrid.style.top = '0%';
                                galleryGrid.style.left= '0%';
                                maincontent.style.height = '66vh';
                                newTransform = 'rotate(0deg) scale(1)';
                                logMessage = "Screen and picture are both portrait (no transform)";
                            }
                        else
                            {
                                if (viewPortWidth >= 768)                                
                                    {
                                        newTransform = 'rotate(0deg) scale(1)';
                                        logMessage = "Screen and picture are both portrait (no transform)";
                                    }
                                else
                                    {
                                        maincontent.style.height = '68vh';
                                        newTransform = 'rotate(0deg) scale(1)';
                                        logMessage = "Screen and picture are both portrait (no transform)";
                                    }
                            }
                    }
                // No transformation.
                else if (viewportScale > 0.57 && viewPortHeight <= 767 && pic14rientationPortrait === false) 
                    {
                        if (viewPortWidth === 375 && viewPortHeight == 667)
                            {
                                galleryGrid.style.top = '0%';
                                galleryGrid.style.left= '0%';
                                maincontent.style.height = '66vh';
                                newTransform = 'rotate(90deg) scale(1.15)';
                                logMessage = "Screen is portrait, picture is landscape, and space allows (transform and enlarge)";
                            }
                        else
                            {
                                maincontent.style.height = '68vh';
                                newTransform = 'rotate(0deg) scale(1)';
                                logMessage = "Screen portrait, picture landscape, but view size is constrained (no transform)";

                            }
                    }
                            // Rotate 90 degrees and enlarge.
                else 
                    {
                        if (viewPortWidth === 375 && viewPortHeight == 667)
                            {
                                galleryGrid.style.top = '0%';
                                galleryGrid.style.left= '0%';
                                maincontent.style.height = '66vh';
                                newTransform = 'rotate(90deg) scale(1.2)';
                                logMessage = "Screen is portrait, picture is landscape, and space allows (transform and enlarge)";
                            }
                        else
                            {
                                if (viewPortWidth >= 768)                                
                                    {
                                        galleryGrid.style.top = '0%';
                                        galleryGrid.style.left= '0%';
                                    }
                                else
                                    {
                                        galleryGrid.style.top = '0%';
                                        galleryGrid.style.left= '0%';
                                        maincontent.style.height = '68vh';
                                    }
                                newTransform = 'rotate(90deg) scale(1.45)';
                                logMessage = "Screen is portrait, picture is landscape, and space allows (transform and enlarge)";
                            }
                    }
            }
        // --- Landscape Screen
        else 
            {
                // If the screen is not portrait, it is landscape.
                newTransform = 'rotate(0deg) scale(1)';
                logMessage = "Screen is in Landscape mode (no transform)";
            }
        galleryGrid.style.transform = newTransform;
        if (isProduction==false) {console.log(`Applied transform: ${newTransform} to .gallery-grid2. Details: ${logMessage}`);}
    }