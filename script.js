//Variable Dictionary
var imageUrls,
type,
name,
shareLink,
description,
fontList,
videoEmbed;

function generate() {
    getVals();
    let out = createOutput();
    document.getElementById('output').value = out;
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
    videoEmbed = document.getElementsByName("videoEmbed")[0].value;
    getImages();
}

//Fills in the imageUrls array
function getImages() {
    imageUrls = [];
    let cover = document.getElementsByName("coverUrl")[0].value;
    if (cover != "") {
        imageUrls[0] = [cover, 0]; //0 denotes cover image, 1 is type 1, 2 is type 2
    }
    let images = document.getElementsByClassName("image");
    for (let i = 1; i<=images.length; i++) {
        let pt1 = document.getElementsByName("img" + i)[0].value;
        let pt2;
        let radOpt = document.getElementsByName("img" + i + "opt");
        for (let j = 0; j<radOpt.length; j++) {
            if (radOpt[j].checked) {
                if(radOpt[j].value == "type1") pt2 = 1;
                else if(radOpt[j].value == "type2") pt2 = 2;
                else if (radOpt[j].value == "type3") pt2 = 3;
                //pt2 = radOpt[j].value == "type1" ? 1 : 2;
                break;
            }
        }
        imageUrls.push([pt1,pt2]);
    }
}

function createOutput() {
    let output = "";
    //Add Cover Image
    if(imageUrls[0][1] == 0) {
        output += '<div class="separator" style="clear: both; display: none; text-align: center;"><a href="' + imageUrls[0][0] + '" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="1000" data-original-width="1000" height="320" src="' + imageUrls[0][0] + '" width="320" /></a></div>';
    }
    //Add Centered Images
    for(let i = 0; i < imageUrls.length; i++) {
        if(imageUrls[i][1] == 1 && imageUrls[i][0] != "") {
            //Assuming 16 X 9
            output += '<div class="separator" style="clear: both; text-align: center;"><a href="' + imageUrls[i][0] + '" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="576" data-original-width="1024" height="360" src="' + imageUrls[i][0] + '" width="640" /></a></div>';
        }
    }
    //Add Slide Show
    let first = true; //Test for first image
    for (let i = 0; i < imageUrls.length; i++) {
        if(imageUrls[i][1] == 3) {
            if(first === true && imageUrls[i][0] != "") {
                output += '<div class="NS-image-slides-containter"><div class="NS-current-slide"><div class="NS-aspect-ratio"></div><div class="NS-image-container"><img class="NS-current-image" src=""></div></div><div class="NS-thumbs-container">';
                output += '<div onclick="clicker(this)" data-src="' + imageUrls[i][0] + '" class="NS-thumb-container currentIMG"></div>';
                first = false;
            }
            else if(imageUrls[i][0] != "") {
                output += '<div onclick="clicker(this)" data-src="' + imageUrls[i][0] + '" class="NS-thumb-container"></div>';
            }
        }
    }
    if(first === false) {
        output += '</div>';
        output += '<script>loadCurrent();var timer=setInterval(advance,3e3),restartTimer=null;function clicker(e){clearInterval(timer),clearTimeout(restartTimer);let t=e.dataset.src;document.getElementsByClassName("currentIMG")[0].classList.remove("currentIMG"),setDisplay(t),e.classList.add("currentIMG"),restartTimer=setTimeout(interval,5e3)}function setDisplay(e){document.getElementsByClassName("NS-current-image")[0].src=e}function advance(){images=document.getElementsByClassName("NS-thumb-container");for(i=0;i<images.length;i++)if(images[i].classList.contains("currentIMG")){images[i].classList.remove("currentIMG"),i!=images.length-1?images[i+1].classList.add("currentIMG"):i==images.length-1&&images[0].classList.add("currentIMG");break}setDisplay(document.getElementsByClassName("currentIMG")[0].dataset.src)}function loadCurrent(){setDisplay(document.getElementsByClassName("currentIMG")[0].dataset.src)}function interval(){timer=setInterval(advance,3e3)}</script>';
    }

    //Add Description
    if (description != "") {
        output += description + '<br/>';
    }
    else {
        output += 'Download this great ';
        switch (type) {
            case 'impress':
                output += "Impress template ";
                break;
            case 'spice-up':
                output += "Spice-Up template ";
                break;
            case 'graphics':
                output += "template graphic ";
                break;
            default:
                output += "slide resource ";
                break;
        }
        output += "to use in your next slide project.<br/>";
    }
    //Add Break
    output += "<!--more-->"
    //Add Small Images
    first = true; //Test for first image
    for (let i = 0; i < imageUrls.length; i++) {
        if(imageUrls[i][1] == 2) {
            //Assuming 16 X 9
            if(first === true && imageUrls[i][0] != "") {
                output += '<div class="separator" style="clear: both; text-align: center;">';
                first = false;
            }
            if(imageUrls[i][0] != "") {
                output += '<a href="' + imageUrls[i][0] + '" imageanchor="1" style="display: block; float: left; margin-right: 1em;"><img border="0" data-original-height="571" data-original-width="1015" height="179" src="' + imageUrls[i][0] + '" width="320" /></a>';
            }
        }
    }
    if(first === false) {
        output += '</div>';
    }
    //Add Video
    if(videoEmbed != "") {
        output += '<div class="separator" style="clear: both; text-align: left;">Video Preview:</div>'
        videoEmbed = videoEmbed.replace('480', '360');
        output += videoEmbed;
    }
    //Add Font List
    if(fontList != "") {
        output += '<div class="separator" style="clear: both; text-align: center;"><div class="fontbox">' + fontList + '</div></div></br>';
    }
    //Add Download Link
    if(shareLink == "") {
        shareLink = prompt("Please input share link:");
    }

    let val_ar = shareLink.split('/');
    if(val_ar.length > 1 && val_ar[2] == 'drive.google.com') {
        let id = val_ar[5];
        shareLink = 'https://drive.google.com/uc?export=download&id=' + id;
        let message;
        if(type == 'impress') {
            message = 'Download Impress Template';
        }
        else if (type == 'spice-up') {
            message = 'Download Spice File';
        }
        else if (type == 'graphics') {
            message = 'Download Graphics';
        }
        output += '<a class="downlink" href="' + shareLink + '" target="_blank">' + message + '</a>'
        //TODO add support for other share link
    }
    else {
        //TODO add error alerts
    }
    return output;
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
    div.innerHTML = '<input type="url" name="img' + num + '" placeholder="Image ' + num + ' URL"><br/><input type="radio" name="img' + num + 'opt" value="type1" checked>Centered, Large <br/><input type="radio" name="img' + num + 'opt" value="type2">Left, Small (after description) <br/><input type="radio" name="img' + num + 'opt" value="type3">Slide Show <br/>';
    return div;
}

//Removes last image input, excluding first
function remImage() {
    let imgDiv = document.getElementById("images");
    if (imgDiv.lastChild.id != "img1") {
        imgDiv.removeChild(imgDiv.lastChild);
    }
}
