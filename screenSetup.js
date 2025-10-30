function setScreenUp() 
{

    console.log(`*************Running setScreenUp**************`);

    //const AR15_9 = window.matchMedia('(min-aspect-ratio: 15/9)');
    //console.log(`SavedScreenData: ${(AR15_9)}`);
    //console.log(AR15_9.media);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    console.log(`CurrentScreenDimensions: ${(viewportWidth)} x ${(viewportHeight)} `);

    const galleryGrid = document.getElementById("gallerygrid");

    let computedStyle = getComputedStyle(galleryGrid);
    const liveRowCount = computedStyle.getPropertyValue('--rows');
    const liveColumnCount = computedStyle.getPropertyValue('--columns');
    let gridBoxCount = liveRowCount * liveColumnCount;

    console.log(`Columns: ${(liveColumnCount)}`);
    console.log(`Rows: ${(liveRowCount)}`);
    console.log(`Grid Box Count: ${(gridBoxCount)}`);

    const photoImg1 = document.querySelector('#photoitem1 img'); 
    let portrait1 = false
    actualWidth1 = photoImg1.naturalWidth;
    actualHeight1 = photoImg1.naturalHeight;
    if (actualWidth1 < actualHeight1) {portrait1=true};

    console.log(`Portrait1 Width: ${(actualWidth1)}`);
    console.log(`Portrait1 Height: ${(actualHeight1)}`);
    console.log(`Portrait1: ${(portrait1)}`);


    const GridSettings = {
        // ====================================================================
        // 4x2 Grid (8 photos max)
        // ====================================================================
        // Portrait (P): Item 1 spans 2 rows (1, 2). Item 3 (W+1) is hidden.
        // L-Settings (8 visible)
        "4x2_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "4x2_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "4x2_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "4x2_L_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2, aspectRatio: '4.5 / 3'},
        "4x2_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_L_7": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_L_8": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        
        "4x2_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'}, // Portrait, 2 rows high
        "4x2_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "4x2_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "4x2_P_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "4x2_P_5": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden due to portrait item 1
        "4x2_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_P_7": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_P_8": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "4x2_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "4x2_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // ====================================================================
        // 2x5 Grid (10 photos max)
        // ====================================================================
        // Portrait (P): Item 1 spans 2 rows (1, 2). Item 3 (W+1) is hidden.
        // L-Settings (10 visible)
        "2x5_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x5_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x5_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x5_L_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x5_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x5_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x5_L_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x5_L_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x5_L_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x5_L_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x5_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x5_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x5_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (10 visible, with P1 spanning two rows)
        "2x5_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "2x5_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x5_P_3": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "2x5_P_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x5_P_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x5_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x5_P_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x5_P_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x5_P_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x5_P_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x5_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x5_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x5_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},


        // ====================================================================
        // 2x6 Grid (12 photos max)
        // ====================================================================
        // Portrait (P): Item 1 spans 2 rows (1, 2). Item 3 (W+1) is hidden.
        // L-Settings (12 visible)
        "2x6_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x6_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x6_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x6_L_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x6_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x6_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x6_L_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x6_L_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x6_L_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x6_L_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x6_L_11": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 6,gridRowEnd: 7,aspectRatio: '4.5 / 3'},
        "2x6_L_12": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 6,gridRowEnd: 7,aspectRatio: '4.5 / 3'},
        "2x6_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (12 visible, with P1 spanning two rows)
        "2x6_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "2x6_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x6_P_3": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "2x6_P_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x6_P_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x6_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x6_P_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x6_P_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x6_P_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x6_P_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 5,gridRowEnd: 6,aspectRatio: '4.5 / 3'},
        "2x6_P_11": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 6,gridRowEnd: 7,aspectRatio: '4.5 / 3'},
        "2x6_P_12": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 6,gridRowEnd: 7,aspectRatio: '4.5 / 3'},
        "2x6_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},


       // ====================================================================
        // 2x4 Grid (8 photos max)
        // ====================================================================
        // L-Settings (8 visible)
        "2x4_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x4_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x4_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x4_L_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x4_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x4_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x4_L_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x4_L_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x4_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (8 visible, with P1 spanning two rows)
        "2x4_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "2x4_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x4_P_3": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "2x4_P_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x4_P_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x4_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x4_P_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x4_P_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "2x4_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x4_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // ====================================================================
        // 3x2 Grid (6 photos max)
        // ====================================================================
        // L-Settings (6 visible)
        "3x2_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x2_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x2_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x2_L_4": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x2_L_5": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x2_L_6": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x2_L_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_L_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (6 visible, with P1 spanning two rows)
        "3x2_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "3x2_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x2_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x2_P_4": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "3x2_P_5": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x2_P_6": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x2_P_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_P_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x2_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // ====================================================================
        // 3x3 Grid (9 photos max)
        // ====================================================================
        // L-Settings (9 visible)
        "3x3_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x3_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x3_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x3_L_4": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x3_L_5": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x3_L_6": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x3_L_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "3x3_L_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "3x3_L_9": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "3x3_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x3_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x3_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x3_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (9 visible, with P1 spanning two rows)
        "3x3_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "3x3_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x3_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "3x3_P_4": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "3x3_P_5": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x3_P_6": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "3x3_P_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "3x3_P_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "3x3_P_9": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "3x3_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x3_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x3_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "3x3_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                // --- 3x4 GRID (3 Columns, 4 Rows) ---
                // Total cells = 12. All 11 items fit. Item 1 spans 2 rows, Item 4 is hidden.
                
                "3x4_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 6'}, // Item 1 (Portrait: C1, R1-R2)
                "3x4_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "3x4_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "3x4_P_4": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Item 4 hidden (Below Item 1)
                "3x4_P_5": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "3x4_P_6": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "3x4_P_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "3x4_P_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "3x4_P_9": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "3x4_P_10": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
                "3x4_P_11": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
                "3x4_P_12": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
                "3x4_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                "3x4_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "3x4_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "3x4_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "3x4_L_4": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "3x4_L_5": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "3x4_L_6": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "3x4_L_7": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "3x4_L_8": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "3x4_L_9": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "3x4_L_10": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
                "3x4_L_11": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
                "3x4_L_12": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
                "3x4_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                // --- 4x4 GRID (4 Columns, 4 Rows) ---
                // Total cells = 16. All 11 items fit. Item 1 spans 2 rows, Item 5 is hidden.
                
                "4x4_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 6'}, // Item 1 (Portrait: C1, R1-R2)
                "4x4_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_P_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_P_5": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Item 5 hidden (Below Item 1)
                "4x4_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_P_7": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_P_8": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_P_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x4_P_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x4_P_11": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x4_P_12": {display:'grid', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
                "4x4_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                "4x4_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_L_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x4_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_L_7": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_L_8": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x4_L_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x4_L_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x4_L_11": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x4_L_12": {display:'grid', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
                "4x4_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                // --- 5x2 GRID (5 Columns, 2 Rows) ---
                // Total cells = 10. Items 1 to 10 visible. Item 11 is hidden. Item 1 spans 2 rows, Item 6 is hidden.

                "5x2_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 6'}, // Item 1 (Portrait: C1, R1-R2)
                "5x2_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_P_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_P_5": {display:'grid', gridColumnStart: 5,gridColumnEnd: 6,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_P_6": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Item 6 hidden (Below Item 1)
                "5x2_P_7": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_P_8": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_P_9": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_P_10": {display:'grid', gridColumnStart: 5,gridColumnEnd: 6,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
                "5x2_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
                "5x2_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                "5x2_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_L_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_L_5": {display:'grid', gridColumnStart: 5,gridColumnEnd: 6,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "5x2_L_6": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_L_7": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_L_8": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_L_9": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_L_10": {display:'grid', gridColumnStart: 5,gridColumnEnd: 6,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "5x2_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
                "5x2_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
                "5x2_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                // --- 4x3 GRID (4 Columns, 3 Rows) ---
                // Total cells = 12. All 11 items fit. Item 1 spans 2 rows, Item 5 is hidden.

                "4x3_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 6'}, // Item 1 (Portrait: C1, R1-R2)
                "4x3_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_P_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_P_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_P_5": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Item 5 hidden (Below Item 1)
                "4x3_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_P_7": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_P_8": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_P_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_P_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_P_11": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_P_12": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

                "4x3_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_L_3": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_L_4": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
                "4x3_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_L_7": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_L_8": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
                "4x3_L_9": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_L_10": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_L_11": {display:'grid', gridColumnStart: 3,gridColumnEnd: 4,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_L_12": {display:'grid', gridColumnStart: 4,gridColumnEnd: 5,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
                "4x3_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        
        // ====================================================================
        // 2x3 Grid (6 photos max)
        // ====================================================================
        // L-Settings (6 visible)
        "2x3_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x3_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x3_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x3_L_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x3_L_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x3_L_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x3_L_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_L_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (6 visible, with P1 spanning two rows)
        "2x3_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "2x3_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x3_P_3": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "2x3_P_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x3_P_5": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x3_P_6": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "2x3_P_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_P_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x3_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},


        // ====================================================================
        // 2x2 Grid (4 photos max)
        // ====================================================================
        // L-Settings (4 visible)
        "2x2_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x2_L_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x2_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x2_L_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x2_L_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (4 visible, with P1 spanning two rows)
        "2x2_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "2x2_P_2": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "2x2_P_3": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1)
        "2x2_P_4": {display:'grid', gridColumnStart: 2,gridColumnEnd: 3,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "2x2_P_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "2x2_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},


        // ====================================================================
        // 1x2 Grid (2 photos max)
        // ====================================================================
        // L-Settings (2 visible)
        "1x2_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "1x2_L_2": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "1x2_L_3": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_4": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (1x2 grid, P1 spanning 2 rows means only P1 is visible)
        "1x2_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "1x2_P_2": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1=2)
        "1x2_P_3": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_4": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x2_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},


        // ====================================================================
        // 1x3 Grid (3 photos max)
        // ====================================================================
        // L-Settings (3 visible)
        "1x3_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "1x3_L_2": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "1x3_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "1x3_L_4": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (1x3 grid, P1 spanning 2 rows)
        "1x3_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "1x3_P_2": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1=2)
        "1x3_P_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "1x3_P_4": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x3_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},


        // ====================================================================
        // 1x4 Grid (4 photos max)
        // ====================================================================
        // L-Settings (4 visible)
        "1x4_L_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 2,aspectRatio: '4.5 / 3'},
        "1x4_L_2": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'},
        "1x4_L_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "1x4_L_4": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "1x4_L_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_L_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},

        // P-Settings (1x4 grid, P1 spanning 2 rows)
        "1x4_P_1": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 1,gridRowEnd: 3,aspectRatio: '4.5 / 5.96'},
        "1x4_P_2": {display:'none', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 2,gridRowEnd: 3,aspectRatio: '4.5 / 3'}, // Hidden (W+1=2)
        "1x4_P_3": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 3,gridRowEnd: 4,aspectRatio: '4.5 / 3'},
        "1x4_P_4": {display:'grid', gridColumnStart: 1,gridColumnEnd: 2,gridRowStart: 4,gridRowEnd: 5,aspectRatio: '4.5 / 3'},
        "1x4_P_5": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_6": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_7": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_8": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_9": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_10": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_11": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_12": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'},
        "1x4_P_13": {display:'none', gridColumnStart: 0,gridColumnEnd: 0,gridRowStart: 0,gridRowEnd: 0,aspectRatio: '4.5 / 3'}
    };    

    const VALID_GRID_CONFIGS = new Set([
        "4x2", "2x6", "2x5", "2x4", "3x2", "3x3", "2x3", "2x2", "1x2", "1x3", "1x4", "3x4", "4x4", "5x2" , "4x3"
    ]);

    // Start the loop for photo items 1 through 11
    for (let i = 1; i <= 13; i++)
    {
        let gridKey = '';
        let screenMatched = false;

        // 1. Construct the current grid string (e.g., "4x2")
        const currentGridString = `${liveColumnCount}x${liveRowCount}`;

        // 2. Check if the current grid configuration is in the valid list
        if (VALID_GRID_CONFIGS.has(currentGridString))
        {
            // 3. If matched, construct the final gridKey dynamically
            screenMatched = true;
            const orientation = portrait1 ? 'P' : 'L';
            gridKey = `${currentGridString}_${orientation}_${i}`;
            
            console.log(`Grid Matched: ${gridKey}`);
        }
        else
        {
            // Fallback case if no grid size matches
            console.log(`NO SCREEN MATCHED for grid: ${currentGridString}`);
        }

        // 4. Apply settings if a match was found
        if (screenMatched)
        {
            const itemId = `#photoitem${i}`;
            // Ensure GridSettings exists and has the key before accessing
            const settings2 = GridSettings[gridKey];

            if (settings2) {
                const photoItem = document.querySelector(`${itemId} img`);
                const photoImg = photoItem.parentElement.parentElement; // Two levels - First Level <a> tag.

                photoItem.style.display = settings2.display;
                photoItem.style.aspectRatio = settings2.aspectRatio;

                // Assuming photoImg is the container element
                photoImg.style.display = settings2.display; 
                photoItem.style.display = settings2.display;
                //photoImg.style.display = 'none'; 
                //photoItem.style.display = 'none';
                photoImg.style.aspectRatio = settings2.aspectRatio;
                photoImg.style.gridColumnStart = settings2.gridColumnStart;
                photoImg.style.gridColumnEnd = settings2.gridColumnEnd;
                photoImg.style.gridRowStart = settings2.gridRowStart;
                photoImg.style.gridRowEnd = settings2.gridRowEnd;
            } else {
                console.error(`Error: GridSettings missing key for: ${gridKey}`);
            }
        }
    }
}

