//This filter code was written with the help of AI.

let currentFilter = {
    type: 'all',
    minRating: 1,
    maxRating: 5,
    category: 'all'
};

let originalImagesOrder = null;
let filteredImagePaths = new Set();
let filteredPortraitPaths = new Set();

function saveFilterState() {
    sessionStorage.setItem('filteredImagePaths', JSON.stringify(Array.from(filteredImagePaths)));
    sessionStorage.setItem('filteredPortraitPaths', JSON.stringify(Array.from(filteredPortraitPaths)));
}

function loadFilterState() {
    const savedFiltered = sessionStorage.getItem('filteredImagePaths');
    const savedPortraits = sessionStorage.getItem('filteredPortraitPaths');
    
    if (savedFiltered) {
        filteredImagePaths = new Set(JSON.parse(savedFiltered));
    }
    if (savedPortraits) {
        filteredPortraitPaths = new Set(JSON.parse(savedPortraits));
    }
}

function storeOriginalOrder() {
    if (originalImagesOrder === null) {
        originalImagesOrder = [...images];
        console.log('Original images order stored');
    }
}

function restoreOriginalOrder() {
    if (originalImagesOrder === null) {
        console.log('No filter applied yet - displaying first 12 images');
        displayFirst12Images();
        return;
    }

    images.length = 0;
    images.push(...originalImagesOrder);
    
    filteredImagePaths.clear();
    filteredPortraitPaths.clear();
    
    sessionStorage.removeItem('filteredImagePaths');
    sessionStorage.removeItem('filteredPortraitPaths');
    
    console.log('Original images order restored');
    
    displayFirst12Images();
}

function reorderImagesArray(filterFunction) {
    storeOriginalOrder();
    
    const landscapeFiltered = [];
    const landscapeNotFiltered = [];
    const portraitFiltered = [];
    const portraitNotFiltered = [];
    
    filteredImagePaths.clear();
    filteredPortraitPaths.clear();
    
    images.forEach(img => {
        if (img.picOrientation === 'Portrait') {
            if (filterFunction(img, true)) {
                portraitFiltered.push(img);
                filteredPortraitPaths.add(img.picPath);
            } else {
                portraitNotFiltered.push(img);
            }
        } else {
            if (filterFunction(img, false)) {
                landscapeFiltered.push(img);
                filteredImagePaths.add(img.picPath);
            } else {
                landscapeNotFiltered.push(img);
            }
        }
    });
    
    images.length = 0;
    images.push(...landscapeFiltered, ...landscapeNotFiltered, ...portraitFiltered, ...portraitNotFiltered);
    
    console.log(`Images reordered: ${landscapeFiltered.length} filtered landscape first, ${landscapeNotFiltered.length} other landscape next, ${portraitFiltered.length} filtered portraits, ${portraitNotFiltered.length} other portraits at end`);
    
    return landscapeFiltered.length;
}

function showRatingFilterModal() {
    const existingModal = document.getElementById('ratingFilterModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'ratingFilterModal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        min-width: 300px;
    `;

    modal.innerHTML = `
        <h3 style="margin-top: 0; text-align: center;">Filter by Star Rating</h3>
        <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold;">
                Minimum Rating:
            </label>
            <div id="minStarSelector" style="text-align: center; font-size: 30px; cursor: pointer;">
                ${generateStarSelector(1)}
            </div>
        </div>
        <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold;">
                Maximum Rating:
            </label>
            <div id="maxStarSelector" style="text-align: center; font-size: 30px; cursor: pointer;">
                ${generateStarSelector(5)}
            </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="applyRatingFilter" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Apply Filter
            </button>
            <button id="resetRatingFilter" style="flex: 1; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Show All
            </button>
            <button id="closeRatingFilter" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Cancel
            </button>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    setupStarSelectors(modal, 1, 5);

    document.getElementById('applyRatingFilter').addEventListener('click', () => {
        applyRatingFilter();
        closeModal();
    });

    document.getElementById('resetRatingFilter').addEventListener('click', () => {
        currentFilter = { type: 'all', minRating: 1, maxRating: 5, category: 'all' };
        restoreOriginalOrder();
        closeModal();
    });

    document.getElementById('closeRatingFilter').addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

function showCategoryFilterModal() {
    const existingModal = document.getElementById('categoryFilterModal');
    if (existingModal) {
        existingModal.remove();
    }

    const categories = [...new Set(originalImagesOrder ? originalImagesOrder.map(img => img.picCategory) : images.map(img => img.picCategory))].sort();

    const modal = document.createElement('div');
    modal.id = 'categoryFilterModal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        min-width: 300px;
        max-height: 80vh;
        overflow-y: auto;
    `;

    let categoryOptions = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
        categoryOptions += `<option value="${cat}">${cat}</option>`;
    });

    modal.innerHTML = `
        <h3 style="margin-top: 0; text-align: center;">Filter by Category</h3>
        <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold;">
                Select Category:
            </label>
            <select id="categorySelector" style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 5px;">
                ${categoryOptions}
            </select>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="applyCategoryFilter" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Apply Filter
            </button>
            <button id="resetCategoryFilter" style="flex: 1; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Show All
            </button>
            <button id="closeCategoryFilter" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Cancel
            </button>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    const categorySelector = document.getElementById('categorySelector');
    categorySelector.value = currentFilter.category;

    document.getElementById('applyCategoryFilter').addEventListener('click', () => {
        currentFilter.category = categorySelector.value;
        applyCategoryFilter();
        closeModal();
    });

    document.getElementById('resetCategoryFilter').addEventListener('click', () => {
        currentFilter = { type: 'all', minRating: 1, maxRating: 5, category: 'all' };
        restoreOriginalOrder();
        closeModal();
    });

    document.getElementById('closeCategoryFilter').addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

function generateStarSelector(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="rating-star" data-rating="${i}" style="color: ${i <= rating ? '#ffd700' : '#ccc'}; margin: 0 2px;">★</span>`;
    }
    return stars;
}

function setupStarSelectors(modal, minRating, maxRating) {
    const minSelector = modal.querySelector('#minStarSelector');
    const maxSelector = modal.querySelector('#maxStarSelector');

    minSelector.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            minRating = rating;
            minSelector.innerHTML = generateStarSelector(rating);
            setupStarSelectors(modal, minRating, maxRating);
        });
    });

    maxSelector.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            maxRating = rating;
            maxSelector.innerHTML = generateStarSelector(rating);
            setupStarSelectors(modal, minRating, maxRating);
        });
    });

    currentFilter.minRating = minRating;
    currentFilter.maxRating = maxRating;
}

function closeModal() {
    const modal = document.querySelector('#ratingFilterModal, #categoryFilterModal');
    const overlay = document.getElementById('modalOverlay');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

function applyRatingFilter() {
    console.log(`Applying filter: ${currentFilter.minRating} to ${currentFilter.maxRating} stars`);
    
    if (currentFilter.minRating > currentFilter.maxRating) {
        alert('Minimum rating cannot be greater than maximum rating!');
        return;
    }

    const filterFunction = (img, isPortrait) => 
        img.picStarRating >= currentFilter.minRating && 
        img.picStarRating <= currentFilter.maxRating;

    const filteredCount = reorderImagesArray(filterFunction);

    if (filteredCount === 0) {
        alert('No landscape images found with the selected rating range.');
        restoreOriginalOrder();
        return;
    }

    console.log(`Found ${filteredCount} landscape images matching filter`);
    
    displayFirst12Images();
}

function applyCategoryFilter() {
    console.log(`Applying category filter: ${currentFilter.category}`);
    
    let filterFunction;
    
    if (currentFilter.category === 'all') {
        filterFunction = (img, isPortrait) => true;
    } else {
        filterFunction = (img, isPortrait) => img.picCategory === currentFilter.category;
    }

    const filteredCount = reorderImagesArray(filterFunction);

    if (filteredCount === 0) {
        alert(`No landscape images found in category: ${currentFilter.category}`);
        restoreOriginalOrder();
        return;
    }

    console.log(`Found ${filteredCount} landscape images in category: ${currentFilter.category}`);
    
    displayFirst12Images();
}

function applyMyPhotosFilter() {
    const loginTextElement = document.getElementById('loginText');
    let userEmail = null;
    
    if (loginTextElement && loginTextElement.textContent) {
        const text = loginTextElement.textContent.trim();
        if (text && !text.includes('Logged Out')) {
            userEmail = text;
        }
    }
    
    if (!userEmail) {
        alert('Please log in to view your photos.');
        return;
    }

    console.log(`Applying my photos filter for: ${userEmail}`);
    
    const filterFunction = (img, isPortrait) => img.picOwnersAccount === userEmail;

    const filteredCount = reorderImagesArray(filterFunction);

    if (filteredCount === 0) {
        alert('You have no landscape photos in the gallery.');
        restoreOriginalOrder();
        return;
    }

    console.log(`Found ${filteredCount} of your landscape images`);
    
    displayFirst12Images();
}

function displayFirst12Images() {
    currentPictureIndex = 0;
    
    const photoElements = [
        document.querySelector('#photoitem1 img'),
        document.querySelector('#photoitem2 img'),
        document.querySelector('#photoitem3 img'),
        document.querySelector('#photoitem4 img'),
        document.querySelector('#photoitem5 img'),
        document.querySelector('#photoitem6 img'),
        document.querySelector('#photoitem7 img'),
        document.querySelector('#photoitem8 img'),
        document.querySelector('#photoitem9 img'),
        document.querySelector('#photoitem10 img'),
        document.querySelector('#photoitem11 img'),
        document.querySelector('#photoitem12 img'),
        document.querySelector('#photoitem13 img')
    ];

    for (let i = 0; i < 12; i++) {
        const container = document.querySelector(`#photoitem${i+1}`).parentElement;
        container.style.display = '';
        if (i < images.length) {
            const imgPath = images[i].picPath;
            photoElements[i].src = imgPath;
            
            updatePictureDetails(i + 1, imgPath, 
                images[i].picOrientation === 'Portrait');
        }
    }

    if (images.length > 12) {
        photoElements[12].src = images[12].picPath;
        updatePictureDetails(13, images[12].picPath, 
            images[12].picOrientation === 'Portrait');
        currentPictureIndex = 13;
    } else if (images.length > 0) {
        photoElements[12].src = images[images.length - 1].picPath;
        updatePictureDetails(13, images[images.length - 1].picPath, 
            images[images.length - 1].picOrientation === 'Portrait');
        currentPictureIndex = images.length;
    }

    setCurrentPictureIndex(currentPictureIndex);

    updateImageLinks();
    
    setTimeout(() => {
        setScreenUp();
        
        setTimeout(() => {
            for (let i = 0; i < 12; i++) {
                if (i < images.length) {
                    const photoItem = document.querySelector(`#photoitem${i+1}`);
                    const imgPath = images[i].picPath;
                    
                    if (!photoItem) continue;
                    
                    photoItem.style.position = 'relative';
                    
                    const existingBadge = photoItem.querySelector('.filter-badge');
                    if (existingBadge) existingBadge.remove();
                    
                    const isFiltered = filteredImagePaths.has(imgPath);
                    
                    if (isFiltered) {
                        const badge = document.createElement('div');
                        badge.className = 'filter-badge';
                        badge.innerHTML = '✓';
                        badge.style.cssText = `
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            background-color: rgba(76, 175, 80, 0.9);
                            color: white;
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            font-weight: bold;
                            z-index: 10000;
                            pointer-events: none;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        `;
                        photoItem.appendChild(badge);
                    }
                }
            }
        }, 500);
    }, 100);
}

function addFilterBadge(container, imagePath) {
    const existingBadge = container.querySelector('.filter-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    console.log(`Checking badge for: ${imagePath}, In filtered set: ${filteredImagePaths.has(imagePath)}`);
    
    if (filteredImagePaths.has(imagePath)) {
        const badge = document.createElement('div');
        badge.className = 'filter-badge';
        badge.innerHTML = '✓';
        badge.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: rgba(76, 175, 80, 0.9);
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            z-index: 10;
            pointer-events: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        container.appendChild(badge);
        console.log(`Badge added to container`);
    }
}

function loadFilteredImages(filteredImages) {
    const photoElements = [
        document.querySelector('#photoitem1 img'),
        document.querySelector('#photoitem2 img'),
        document.querySelector('#photoitem3 img'),
        document.querySelector('#photoitem4 img'),
        document.querySelector('#photoitem5 img'),
        document.querySelector('#photoitem6 img'),
        document.querySelector('#photoitem7 img'),
        document.querySelector('#photoitem8 img'),
        document.querySelector('#photoitem9 img'),
        document.querySelector('#photoitem10 img'),
        document.querySelector('#photoitem11 img'),
        document.querySelector('#photoitem12 img'),
        document.querySelector('#photoitem13 img')
    ];

    const photoContainers = [
        document.querySelector('#photoitem1').parentElement,
        document.querySelector('#photoitem2').parentElement,
        document.querySelector('#photoitem3').parentElement,
        document.querySelector('#photoitem4').parentElement,
        document.querySelector('#photoitem5').parentElement,
        document.querySelector('#photoitem6').parentElement,
        document.querySelector('#photoitem7').parentElement,
        document.querySelector('#photoitem8').parentElement,
        document.querySelector('#photoitem9').parentElement,
        document.querySelector('#photoitem10').parentElement,
        document.querySelector('#photoitem11').parentElement,
        document.querySelector('#photoitem12').parentElement,
        document.querySelector('#photoitem13').parentElement
    ];

    for (let i = 0; i < 12; i++) {
        photoContainers[i].style.display = '';
        
        if (i < filteredImages.length) {
            photoElements[i].src = filteredImages[i].picPath;
            updatePictureDetails(i + 1, filteredImages[i].picPath, 
                filteredImages[i].picOrientation === 'Portrait');
        }
    }

    if (filteredImages.length > 0) {
        const img13Index = Math.min(filteredImages.length - 1, 12);
        if (img13Index < filteredImages.length) {
            photoElements[12].src = filteredImages[img13Index].picPath;
            updatePictureDetails(13, filteredImages[img13Index].picPath, 
                filteredImages[img13Index].picOrientation === 'Portrait');
        }
    }

    updateImageLinks();
    
    setTimeout(() => {
        setScreenUp();
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFilterState();
    
    const ratedPhotosButton = document.querySelector('.rated-Photos');
    if (ratedPhotosButton) {
        ratedPhotosButton.addEventListener('click', (e) => {
            e.preventDefault();
            showRatingFilterModal();
        });
    }

    const categoryPhotosButton = document.querySelector('.category-Photos');
    if (categoryPhotosButton) {
        categoryPhotosButton.addEventListener('click', (e) => {
            e.preventDefault();
            showCategoryFilterModal();
        });
    }

    const allPhotosButton = document.querySelector('.all-Photos');
    if (allPhotosButton) {
        allPhotosButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentFilter = { type: 'all', minRating: 1, maxRating: 5, category: 'all' };
            restoreOriginalOrder();
        });
    }

    const myPhotosButton = document.querySelector('.my-Photos');
    if (myPhotosButton) {
        myPhotosButton.addEventListener('click', (e) => {
            e.preventDefault();
            applyMyPhotosFilter();
        });
    }
});