// googleTranslate.js
// This file handles Google Translate initialization and banner hiding

// Function to hide Google Translate banner
function hideGoogleTranslateBanner() {
    var banner = document.querySelector('.goog-te-banner-frame');
    if (banner) {
        banner.style.display = 'none';
        banner.style.visibility = 'hidden';
    }
    
    document.body.style.top = '0';
    document.body.style.position = 'static';
    
    var skipTranslate = document.querySelector('body > .skiptranslate');
    if (skipTranslate) {
        skipTranslate.style.display = 'none';
    }
}

// Monitor for translation changes
function monitorTranslation() {
    // Create observer to watch for language changes
    var observer = new MutationObserver(function(mutations) {
        hideGoogleTranslateBanner();
    });
    
    // Observe the body for changes
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: false
    });
    
    // Also monitor the select dropdown
    var select = document.querySelector('.goog-te-combo');
    if (select) {
        select.addEventListener('change', function() {
            hideGoogleTranslateBanner();
            
            // Trigger translation if it didn't happen
            setTimeout(function() {
                var event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
            }, 200);
        });
    }
}

// Initialize Google Translate Widget
// This function must be called from the HTML as it's referenced in the Google script
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,mi,de,es,fr,it,ja,ko,pt,ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
    
    // Monitor for translation changes after initialization
    setTimeout(function() {
        monitorTranslation();
    }, 1500);
}

// Start hiding banner immediately
hideGoogleTranslateBanner();

// Continue checking for banner (extended to 10 seconds)
var checkCount = 0;
var bannerChecker = setInterval(function() {
    hideGoogleTranslateBanner();
    checkCount++;
    if (checkCount > 50) {
        clearInterval(bannerChecker);
    }
}, 100);

// Run on page load
window.addEventListener('load', function() {
    hideGoogleTranslateBanner();
    setTimeout(monitorTranslation, 2000);
});

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideGoogleTranslateBanner);
} else {
    hideGoogleTranslateBanner();
}

window.addEventListener('load', function() {
    var elem = document.querySelector('.goog-te-banner-frame');
    if (elem) {
        elem.style.display = 'none';
    }
    
    // Also remove the body top margin that Google Translate adds
    document.body.style.top = '0px';
});

/*
Keep for future use.
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
} */

// Observe for the Google Translate banner and hide it when it appears  
function observeForBanner() {
    const targetNode = document.body; // Watch the entire body
    const config = { childList: true, subtree: true }; // Watch for new elements anywhere

    const observerCallback = function(mutationsList, observer) {
        // Look through all changes to see if the Google Translate frame has appeared
        const iframe = document.querySelector('.goog-te-banner-frame');
        
        if (iframe) {
            // The banner is present, so hide it and stop watching
            hideGoogleTranslateBanner();
            observer.disconnect(); // Stop the observer to prevent it from running again
        }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, config);
}