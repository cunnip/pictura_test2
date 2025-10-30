if (isProduction) {
    console.log = function() {};
    //console.warn = function() {};
    //console.error = function() {}; 
    // also available to override. .info, .debug, etc.
}

// --- Configuration ---
// The single session key used to store the array of all 13 picture objects.
const GALLERY_DATA_KEY = 'GalleryPictureDetails'; 

// Default structure for a single picture item
const DEFAULT_PICTURE_ITEM = {
    path: "",      // String: The file path or URL of the picture
    isPortrait: false // Boolean: True if the picture is portrait orientation, false otherwise
};

// Default data for all 13 items. 
// Note: We use an array of 13 items, 0-indexed, but the user will access 1-based.
// This structure must be defined here, potentially with initial picture paths.
const DEFAULT_GALLERY_DATA = Array(13).fill(null).map((_, index) => ({
    ...DEFAULT_PICTURE_ITEM,
    // Example placeholder: replace these with your actual initial paths if known
    path: `initial_path/image_${index + 1}.jpg` 
}));


// --- Session Storage Management Functions ---

/**
 * Retrieves the complete array of 13 picture detail objects from session storage.
 * @returns {Array} An array of 13 picture objects.
 */

function getGalleryPictureDetails() {
    const storedString = sessionStorage.getItem(GALLERY_DATA_KEY);
    if (!storedString) {
        // If nothing is stored, return a deep copy of the default structure
        return JSON.parse(JSON.stringify(DEFAULT_GALLERY_DATA));
    }
    try {
        const storedArray = JSON.parse(storedString);

        // Basic validation: ensure it's an array and has the right length
        if (Array.isArray(storedArray) && storedArray.length === 13) {
            // Merge stored data with defaults to ensure data structure integrity
            return storedArray.map((item, index) => ({
                ...DEFAULT_PICTURE_ITEM, // Ensure structure is maintained
                ...item
            }));
        } else {
            console.warn("Stored gallery data is malformed or wrong length. Returning defaults.");
            return JSON.parse(JSON.stringify(DEFAULT_GALLERY_DATA));
        }
    } catch (e) {
        console.error("Error parsing gallery data from session storage. Returning defaults.", e);
        return JSON.parse(JSON.stringify(DEFAULT_GALLERY_DATA));
    }
}

/**
 * Stores the complete array of 13 picture detail objects into session storage.
 * @param {Array} dataArray - The array of 13 picture objects to save.
 */
function setGalleryPictureDetails(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length !== 13) {
        console.error("Cannot save: Data must be an array of 13 items.");
        return;
    }
    try {
        const dataString = JSON.stringify(dataArray);
        sessionStorage.setItem(GALLERY_DATA_KEY, dataString);
        if (isProduction==false) {console.log("Gallery data successfully saved to session storage.");}
    } catch (e) {
        console.error("Failed to serialize and save gallery data.", e);
    }
}

/**
 * Retrieves the details for a single picture based on its 1-based index (1 to 13).
 * @param {number} pictureNumber - The 1-based index (1-13) of the picture to retrieve.
 * @returns {Object|null} The picture detail object or null if index is out of range.
 */
function getPictureDetails(pictureNumber) {
    if (pictureNumber < 1 || pictureNumber > 13 || !Number.isInteger(pictureNumber)) {
        console.error(`Invalid picture number: ${pictureNumber}. Must be between 1 and 13.`);
        return null;
    }
    
    const galleryData = getGalleryPictureDetails();
    
    // Convert 1-based index to 0-based array index (e.g., Picture 1 is index 0)
    const arrayIndex = pictureNumber - 1;
    //console.info(`Picture number: ${pictureNumber}. Retrieved.`);
    
    return galleryData[arrayIndex];
}


/**
 * Updates the details (path and/or isPortrait status) for a single picture 
 * based on its 1-based index (1 to 13) and saves the entire array.
 * @param {number} pictureNumber - The 1-based index (1-13) of the picture to update.
 * @param {string} [path] - Optional: The new path string.
 * @param {boolean} [isPortrait] - Optional: The new portrait status.
 */
function updatePictureDetails(pictureNumber, path, isPortrait) {
    if (isProduction==false) {console.log(`Gallery Save to DataArray STARTED. ${pictureNumber} ${path} `);}

    if (pictureNumber < 1 || pictureNumber > 13 || !Number.isInteger(pictureNumber)) {
        console.error(`Invalid picture number for update: ${pictureNumber}. Must be between 1 and 13.`);
        return;
    }
    
    const galleryData = getGalleryPictureDetails();
    const arrayIndex = pictureNumber - 1;
    
    // Get a reference to the specific item to modify
    const item = galleryData[arrayIndex];

    if (path !== undefined) {
        item.path = path;
    }
    
    if (isPortrait !== undefined) {
        item.isPortrait = isPortrait;
    }
    
    // Save the entire modified array back to session storage
    setGalleryPictureDetails(galleryData);
    if (isProduction==false) {console.log(`Details updated and saved for Picture ${pictureNumber} ${isPortrait}.`);}
}


// --- Example Usage and Initialization ---

// 1. Initialize data structure on load (this will load defaults if nothing is stored)
//let galleryData = getGalleryPictureDetails();
//console.log("Gallery data loaded:", galleryData);

// 2. Example: Accessing the details for picture 5 (index 4)
//const detailsPic5 = getPictureDetails(5);
//console.log("Details for Picture 5:", detailsPic5); 

// 3. Example: Updating the path and portrait status for Picture 1
//updatePictureDetails(1, "new/images/my_vacation.jpg", true);

// 4. Example: Reading the updated value back
//const updatedDetailsPic1 = getPictureDetails(1);
//console.log("Updated Details for Picture 1:", updatedDetailsPic1);

// 5. Example: Only updating the boolean for Picture 7
//updatePictureDetails(7, undefined, false); 