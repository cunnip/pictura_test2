document.addEventListener('click', preventLinkClick);

//When users click on "sandwich icon", open or show the curtain menu layer

//Write the closeNav() method here
function openNav() {
    document.getElementById("myNav").style.display = "block";
}
//Write the closeNav() method here
function closeNav() {
    document.getElementById("myNav").style.display = "none";
}

function resetToDefault() {
    document.getElementById("customize-div").style.backgroundColor = "white";
    document.getElementById("customize-div").style.fontSize = "16px";
    document.getElementById("customize-div").style.color = "black";
    document.getElementById("colorOption").value = "white";
    document.getElementById("sizeOption").value = "16px";
    document.getElementById("fontOption").value = "black";
}




