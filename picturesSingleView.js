if (isProduction) {
    console.log = function() {};
}

let viewPortWidth = window.innerWidth;
let viewPortHeight = window.innerHeight;
if (isProduction==false) {console.log(`CurrentScreenDimensions: ${(viewPortWidth)} x ${(viewPortHeight)}`);}
let screenOrientationPortrait = window.matchMedia("(orientation: portrait)");

function showSingleImage() {
    if (isProduction==false) {console.log(`************Show Single Image Code Running***********: ${(now)}`);}
    if (isProduction==false) {console.log(`CurrentScreenDimensions: ${(viewPortWidth)} x ${(viewPortHeight)}`);}
    const photoImg14 = document.querySelector('#photoitem14 img'); 
    const photoItem14 = photoImg14.parentElement; 
    let viewportScale = viewPortWidth/viewPortHeight
    let galleryGrid = false
    photoImg14.onload = function() {
        const actualWidth14 = this.naturalWidth;
        const actualHeight14 = this.naturalHeight;
        if (actualWidth14 < actualHeight14) {pic14rientationPortrait = true} else {pic14rientationPortrait = false};

        updateGalleryOrientation(screenOrientationPortrait,pic14rientationPortrait,viewportScale,viewPortHeight)
        if (isProduction==false) {displayGridDetails()};
    }
}

function displayGridDetails() {
    galleryGrid = document.getElementById("gallerygrid2");
    let computedStyle = getComputedStyle(galleryGrid);
    const liveRowCount = computedStyle.getPropertyValue('--rows');
    const liveColumnCount = computedStyle.getPropertyValue('--columns');
    
    let gridBoxCount = liveRowCount * liveColumnCount;
    if (isProduction==false) {console.log(`Rows: ${(liveRowCount)}`);}
    if (isProduction==false) {console.log(`Columns: ${(liveColumnCount)}`);}
    if (isProduction==false) {console.log(`Grid Box Count: ${(gridBoxCount)}`);}
}

function showSingleImageReload() {
    if (isProduction==false) {console.log(`************Show Single Image Code RELOAD Running***********: ${(now)}`);}
    if (isProduction==false) {console.log(`CurrentScreenDimensions: ${(viewPortWidth)} x ${(viewPortHeight)}`);}

    const photoImg14 = document.querySelector('#photoitem14 img'); 
    let viewportScale = viewPortWidth/viewPortHeight
    let galleryGrid = false;
    
    if (isProduction==false) {console.log(`Image URL: ${photoImg14.src}`);}
    const actualWidth14 = photoImg14.naturalWidth;
    const actualHeight14 = photoImg14.naturalHeight;
    if (actualWidth14 < actualHeight14) {pic14rientationPortrait = true} else {pic14rientationPortrait = false};

    updateGalleryOrientation(screenOrientationPortrait,pic14rientationPortrait,viewportScale,viewPortHeight)
    if (isProduction==false) {displayGridDetails()};
}

function updateGalleryOrientation(screenOrientationPortrait, pic14rientationPortrait, viewportScale, viewPortHeight) {
    const galleryGrid = document.querySelector('.page-single-view .gallery-grid2');

    if (!galleryGrid) {
        console.error("Error: .page-single-view .gallery-grid2 not found.");
        return;
    }

    let newTransform = 'rotate(0deg) scale(1)';
    let logMessage = "Screen is in Landscape mode (no transform)";

    if (screenOrientationPortrait.matches) {
        console.log(`Screen is in Portrait`);

        if (pic14rientationPortrait === true) {
            console.log(`Picture is in Portrait`);

            if (viewPortWidth === 375 && viewPortHeight == 667) {
                console.log(`viewPortWidth === 375 && viewPortHeight == 667`);
                galleryGrid.style.top = '0%';
                galleryGrid.style.left= '0%';
                maincontent.style.height = '66vh';
                newTransform = 'rotate(0deg) scale(1)';
                logMessage = "Screen and picture are both portrait (no transform)";
            } else {
                if (viewPortWidth >= 768) {
                    console.log(`viewPortWidth >= 768`);
                    newTransform = 'rotate(0deg) scale(1)';
                    logMessage = "Screen and picture are both portrait (no transform)";
                } else {
                    console.log(`viewPortWidth < 768`);
                    maincontent.style.height = '68vh';
                    newTransform = 'rotate(0deg) scale(1)';
                    logMessage = "Screen and picture are both portrait (no transform)";
                }
            }
        } else if (viewportScale > 0.57 && viewPortHeight <= 767 && pic14rientationPortrait === false) {
            console.log(`Picture is in Landscape 1`);
            
            if (viewPortWidth === 375 && viewPortHeight === 667) {
                console.log(`viewPortWidth = 375 && viewPortHeight = 667`);
                galleryGrid.style.top = '0%';
                galleryGrid.style.left= '0%';
                maincontent.style.height = '66vh';
                newTransform = 'rotate(90deg) scale(1.15)';
                console.log(`maincontent.style.height = '66vh'`);
                logMessage = "Screen is portrait, picture is landscape, and space allows (transform and enlarge)";
            } else {
                console.log(`viewPortWidth NOT 375 viewPortHeight NOT 667`);
                maincontent.style.height = '68vh';
                console.log(`maincontent.style.height = '68vh'`);
                newTransform = 'rotate(0deg) scale(1)';
                logMessage = "Screen portrait, picture landscape, but view size is constrained (no transform)";
            }
        } else {
            console.log(`Picture is in Landscape 2`);
            if (viewPortWidth === 375 && viewPortHeight == 667) {
                console.log(`viewPortWidth === 375 && viewPortHeight == 667`);
                galleryGrid.style.top = '0%';
                galleryGrid.style.left= '0%';
                maincontent.style.height = '66vh';
                console.log(`maincontent.style.height = '66vh'`);
                newTransform = 'rotate(90deg) scale(1.08)';
                logMessage = "Screen is portrait, picture is landscape, and space allows (transform and enlarge)";
            } else {
                console.log(`viewPortWidth NOT 375 && viewPortHeight == 667`);
                if (viewPortWidth >= 768) {
                    console.log(`viewPortWidth >= 768`);
                    galleryGrid.style.top = '0%';
                    galleryGrid.style.left= '0%';
                    maincontent.style.height = '88vh';
                    console.log(`maincontent.style.height = '88vh'`);
                    newTransform = 'rotate(90deg) scale(1.35)';
                    console.log('rotate(90deg) scale(1.35)');
                } else {
                    console.log(`viewPortWidth < 768`);
                    galleryGrid.style.top = '0%';
                    galleryGrid.style.left= '0%';
                    
                    maincontent.style.width = '100%';
                    console.log(`maincontent.style.width = '100%'`);
                    maincontent.style.height = '68vh';
                    console.log(`maincontent.style.height = '68vh'`);

                    newTransform = 'rotate(90deg) scale(1.45)';
                    console.log('rotate(90deg) scale(1.45)');
                }
                logMessage = "Screen is portrait, picture is landscape, and space allows (transform and enlarge)";
            }
        }
    } else {
        console.log(`"Screen is in Landscape (no transform)"`);
        newTransform = 'rotate(0deg) scale(1)';
        logMessage = "Screen is in Landscape mode (no transform)";
    }
    galleryGrid.style.transform = newTransform;
    if (isProduction==false) {console.log(`Applied transform: ${newTransform} to .gallery-grid2. Details: ${logMessage}`);}
}

function updateStarsFromCurrentImage() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageSourcePath = urlParams.get('src');

    let simplePath = null;
    if (imageSourcePath) {
        try {
            const url = new URL(imageSourcePath);
            simplePath = url.pathname.substring(1); 
        } catch (e) {
            simplePath = decodeURIComponent(imageSourcePath);
        }
    }
    
    if (!simplePath) {
        console.error("Could not find a valid image source in the URL parameters.");
        return;
    }

    const photoObject = images.find(img => img.picPath === simplePath); 

    if (!photoObject) {
        console.error(`Photo object for path '${simplePath}' not found in the images list.`);
        return;
    }

    const starContainer = document.getElementById('photoStarRatingDisplay');
    
    if (!starContainer) {
        console.error("Star rating container element not found.");
        return;
    }

    renderStars(photoObject.picStarRating, starContainer, photoObject);
}

function renderStars(rating, container, photoObject) {
    container.innerHTML = '';
    container.style.cursor = 'pointer';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.innerHTML = i <= rating ? '★' : '☆';
        star.style.fontSize = '24px';
        star.style.color = i <= rating ? '#ffd700' : '#ccc';
        star.style.cursor = 'pointer';
        star.dataset.rating = i;
        
        star.addEventListener('click', function() {
            photoObject.picStarRating = i;
            renderStars(i, container, photoObject);
            if (!isProduction) {
                console.log(`Updated rating for ${photoObject.picPath}: ${i} stars`);
            }
        });
        
        star.addEventListener('mouseenter', function() {
            for (let j = 1; j <= 5; j++) {
                const starToUpdate = container.children[j - 1];
                if (j <= i) {
                    starToUpdate.innerHTML = '★';
                    starToUpdate.style.color = '#ffd700';
                } else {
                    starToUpdate.innerHTML = '☆';
                    starToUpdate.style.color = '#ccc';
                }
            }
        });
        
        container.appendChild(star);
    }
    
    container.addEventListener('mouseleave', function() {
        renderStars(photoObject.picStarRating, container, photoObject);
    });
}