document.addEventListener('click', preventLinkClick);

//When users click on "sandwich icon", open or show the curtain menu layer
function openNav() 
{
    document.getElementById("myNav").style.display = "block";
}
//Write the closeNav() method here
function closeNav() {
    document.getElementById("myNav").style.display = "none";
}
function changebgColor() {
  let selectedBGColor = document.getElementById("colorOption").value;
	document.getElementById("customize-div").style.backgroundColor = selectedBGColor;
}

function changeFontSize() {
  let selectedSize = document.getElementById("sizeOption").value;
	document.getElementById("customize-div").style.fontSize = selectedSize;
}

function changeFontColour() {
    // FIX 2: Changed "fontOption" to "colorOption"
    let selectedColour = document.getElementById("colorOption2").value; 
    
    // The style.color property correctly changes the font color
    document.getElementById("customize-div").style.color = selectedColour;
}

function resetToDefault() {
    document.getElementById("customize-div").style.backgroundColor = "white";
    document.getElementById("customize-div").style.fontSize = "16px";
    document.getElementById("customize-div").style.color = "black";
    document.getElementById("colorOption").value = "white";
    document.getElementById("sizeOption").value = "16px";
    document.getElementById("fontOption").value = "black";
}