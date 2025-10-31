const isProduction = false; 

if (isProduction) {
    // Override the console methods to be empty functions (No operation - NOOP)
    console.log = function() {};
    //console.warn = function() {};
    //console.error = function() {}; 
    // also available to override. .info, .debug, etc.
}

const images = [
    {picPath: 'images/beach.jpg', picOrientation: 'Landscape', picCategory: 'Landscape', picOwnersAccount: 'user_A', picStarRating: 4},
    {picPath: 'images/moon.jpg', picOrientation: 'Landscape', picCategory: 'Space', picOwnersAccount: 'user_B', picStarRating: 5},
    {picPath: 'images/geese.jpg', picOrientation: 'Landscape', picCategory: 'Wildlife', picOwnersAccount: 'user_A', picStarRating: 3},
    {picPath: 'images/skytowersmall.jpg', picOrientation: 'Landscape', picCategory: 'Cityscape', picOwnersAccount: 'user_C', picStarRating: 4},
    {picPath: 'images/botanicalgardens.jpg', picOrientation: 'Landscape', picCategory: 'Nature', picOwnersAccount: 'user_B', picStarRating: 4},
    {picPath: 'images/rangitotoisland.jpg', picOrientation: 'Landscape', picCategory: 'Landmarks', picOwnersAccount: 'user_D', picStarRating: 5},
    {picPath: 'images/hellicopter.jpg', picOrientation: 'Landscape', picCategory: 'Vehicles', picOwnersAccount: 'user_C', picStarRating: 3},
    {picPath: 'images/motorbike.jpg', picOrientation: 'Landscape', picCategory: 'Vehicles', picOwnersAccount: 'user_A', picStarRating: 2},
    {picPath: 'images/flowerssmall.jpg', picOrientation: 'Landscape', picCategory: 'Floral', picOwnersAccount: 'user_B', picStarRating: 5},
    {picPath: 'images/clintonsparentssmall.jpg', picOrientation: 'Landscape', picCategory: 'UrbanLandscape', picOwnersAccount: 'user_D', picStarRating: 5},
    {picPath: 'images/aucklandcity.jpg', picOrientation: 'Landscape', picCategory: 'Cityscape', picOwnersAccount: 'user_C', picStarRating: 4},
    {picPath: 'images/kawakawabayportrait.jpg', picOrientation: 'Portrait', picCategory: 'Landscape', picOwnersAccount: 'user_A', picStarRating: 5},
    {picPath: 'images/whiteducksmall.jpg', picOrientation: 'Landscape', picCategory: 'Wildlife', picOwnersAccount: 'user_D', picStarRating: 3},
    {picPath: 'images/themeg.jpg', picOrientation: 'Portrait', picCategory: 'Movies', picOwnersAccount: 'user_B', picStarRating: 1},
    //Add additional Images for Gallery from here down
    {picPath: 'images/aigenerated.jpg', picOrientation: 'Landscape', picCategory: 'AI', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/commoncopperskink.jpg', picOrientation: 'Landscape', picCategory: 'Reptile', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/sheepai.jpg', picOrientation: 'Portrait', picCategory: 'AI', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/puppyeyes.jpg', picOrientation: 'Landscape', picCategory: 'Pets', picOwnersAccount: 'clinton', picStarRating: 5},
    {picPath: 'images/kyivukraine.jpg', picOrientation: 'Landscape', picCategory: 'CityLife', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/monarch.jpg', picOrientation: 'Portrait', picCategory: 'Bugs', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/bushstream.jpg', picOrientation: 'Landscape', picCategory: 'Landscape', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/mounttaranaki.jpg', picOrientation: 'Landscape', picCategory: 'Landscape', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/ahuririnapier.jpg', picOrientation: 'Landscape', picCategory: 'Landscape', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/pinkflowerbudding.jpg', picOrientation: 'Landscape', picCategory: 'Floral', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/seagull.jpg', picOrientation: 'Landscape', picCategory: 'Wildlife', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/aucklandnight.jpg', picOrientation: 'Landscape', picCategory: 'Urban Landscape', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/cakes.jpg', picOrientation: 'Landscape', picCategory: 'Food', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/comet.jpg', picOrientation: 'Landscape', picCategory: 'Pets', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/christchurch.jpg', picOrientation: 'Portrait', picCategory: 'Landscape', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/landscape.jpg', picOrientation: 'Landscape', picCategory: 'Nature', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/sheep.jpg', picOrientation: 'Landscape', picCategory: 'Animals', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/whitefacedheron.jpg', picOrientation: 'Landscape', picCategory: 'Wildlife', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/auckland2.jpg', picOrientation: 'Landscape', picCategory: 'Movies', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/orangeflower.jpg', picOrientation: 'Landscape', picCategory: 'Floral', picOwnersAccount: 'user_B', picStarRating: 1},
    {picPath: 'images/clintpetermbikes.jpg', picOrientation: 'Landscape', picCategory: 'Friends', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/ram.jpg', picOrientation: 'Landscape', picCategory: 'Animals', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/michellecost.jpg', picOrientation: 'Portrait', picCategory: 'Friends', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/clintonwork.jpg', picOrientation: 'Portrait', picCategory: 'AI', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/carvstruck.jpg', picOrientation: 'Landscape', picCategory: 'Different', picOwnersAccount: 'clinton', picStarRating: 1},
    {picPath: 'images/bratislavaai.jpg', picOrientation: 'Portrait', picCategory: 'AI', picOwnersAccount: 'clinton', picStarRating: 1}
];


// Time Control
const clockInterval = setInterval(updateClock, 1000);
let now = new Date();

function updateClock() 
{
    now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function debounce(func, timeout = 150) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

// Wrapper function to call Supabase auth (is defined in auth.js module)
function loginUser() {
    if (typeof window.loginUserSupabase === 'function') {
        window.loginUserSupabase();
    } else {
        console.error('Supabase auth not loaded yet');
    }
}

function preventLinkClick(event) 
{
    // Find the closest ancestor <a> element that was clicked
    let targetLink = event.target.closest('.photo-link');

    if (targetLink && targetLink.id) {
        const itemId = targetLink.id;
        // Check the lock status in our global state map
        const isCurrentlyLocked = itemLockedStates[itemId];

        if (isCurrentlyLocked) {
            // IMPORTANT: Stops the browser from navigating.
            event.preventDefault(); 
            statusMessage.textContent = `Click on ${itemId} prevented (LOCKED).`;
        } else {
            // Item is unlocked, allow default behavior (navigation)
            statusMessage.textContent = `${itemId} is UNLOCKED and will navigate.`;
        }
    }
}