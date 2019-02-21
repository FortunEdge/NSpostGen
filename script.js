//Variable Dictionary
var imageUrls = [],
type,
name,
shareLink,
description,
fontList;

function generate() {
    getVals();
    //TODO Use vals and generate output
}

//Sets the values of variables in the dictionary
function getVals() {
    let radType = document.getElementsByName("postType");
    for (let i = 0; i<radType.length; i++) {
        if (radType[i].checked) {
            type = radType[i].value;
            break;
        }
    }
    name = document.getElementsByName("projName")[0].value;
    shareLink = document.getElementsByName("shareLink")[0].value;
    description = document.getElementsByName("description")[0].value;
    fontList = document.getElementsByName("fontList")[0].value;
    getImages();
}

//Fills in the imageUrls array
function getImages() {
    let cover = document.getElementsByName("coverUrl")[0].value;
    if (cover != undefined) {
        imageUrls[0] = [cover, 0]; //0 denotes cover image, 1 is type 1, 2 is type 2
    }
    let images = document.getElementsByClassName("image");
    for (let i = 1; i<=images.length; i++) {
        let pt1 = document.getElementsByName("img" + i)[0].value;
        let pt2;
        let radOpt = document.getElementsByName("img" + i + "opt");
        for (let j = 0; j<radOpt.length; j++) {
            if (radOpt[j].checked) {
                pt2 = radOpt[j].value == "type1" ? 1 : 2;
                break;
            }
        }
        imageUrls.push([pt1,pt2])
    }
}

//Adds another image input
function addImage() {
    let imgDiv = document.getElementById("images");
    let numImgs = document.getElementsByClassName("image").length;
    let newDiv = createDiv(numImgs);
    imgDiv.appendChild(newDiv);
}

//Generates element for new image input
function createDiv(num) {
    num++;    
    let div = document.createElement("div");
    div.className = "image";
    div.id = "img" + num;
    div.innerHTML = '<input type="url" name="img' + num + '" placeholder="Image ' + num + ' URL"><br/><input type="radio" name="img' + num + 'opt" value="type1" checked>Centered, Large <br/><input type="radio" name="img' + num + 'opt" value="type2">Left, Small (after description) <br/>';
    return div;
}

//Removes last image input, excluding first
function remImage() {
    let imgDiv = document.getElementById("images");
    if (imgDiv.lastChild.id != "img1") {
        imgDiv.removeChild(imgDiv.lastChild);
    }
}