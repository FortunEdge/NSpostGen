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
                pt2 = radOpt[j].value == "type1" ? 1 : 2;
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
    let first = true; //Test for first image
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
