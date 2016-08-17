// This function adds a table for the user to input the amount of items to be picked up
// keyword is the string "id" for the entry in the pickup table
function makeEntryTable(keyword) {
    keyword = keyword.toString();
    if (document.getElementById(keyword).checked) {
        document.getElementById("thread").style.display = "block";
        displayItem(keyword);
    }
    if (!document.getElementById(keyword).checked) {
        hideItem(keyword);
    }
}

function hideItem(keyword) {
    if (keyword == "one") {
        document.getElementById("televisions").style.display = "none";
        document.getElementById("numTV").value = "";
        document.getElementById("tv1").style.display = "none";
        document.getElementById("tv2").style.display = "none";
        document.getElementById("tv3").style.display = "none";
        document.getElementById("tv4").style.display = "none";
        document.getElementById("tv5").style.display = "none";
    }
    if (keyword == "two") {
        document.getElementById("computers").style.display = "none";
        document.getElementById("numComps").value = "";
    }
    if (keyword == "three") {
        document.getElementById("monitors").style.display = "none";
        document.getElementById("numMon").value = "";
    }
    if (keyword == "four") {
        document.getElementById("keyboards").style.display = "none";
        document.getElementById("numEKey").value = "";
    }
    if (keyword == "five") {
        document.getElementById("pointers").style.display = "none";
        document.getElementById("numEMice").value = "";
    }
    if (keyword == "six") {
        document.getElementById("printers").style.display = "none";
        document.getElementById("numFax").value = "";
    }
    if (keyword == "seven") {
        document.getElementById("tvPeripherals").style.display = "none";
        document.getElementById("numTVP").value = "";
    }
    if (keyword == "eight") {
        document.getElementById("vcrs").style.display = "none";
        document.getElementById("numVCR").value = "";
    }
    if (keyword == "nine") {
        document.getElementById("dvrs").style.display = "none";
        document.getElementById("numDVR").value = "";
    }
    if (keyword == "ten") {
        document.getElementById("dvd").style.display = "none";
        document.getElementById("numDVD").value = "";
    }
    if (keyword == "eleven") {
        document.getElementById("dcb").style.display = "none";
        document.getElementById("numDCB").value = "";
    }
    if (keyword == "twelve") {
        document.getElementById("cable").style.display = "none";
        document.getElementById("numCable").value = "";
    }
    if (keyword == "thirteen") {
        document.getElementById("xbox").style.display = "none";
        document.getElementById("numXbox").value = "";
    }
    if (keyword == "fourteen") {
        document.getElementById("sss").style.display = "none";
        document.getElementById("numSSS").value = "";
    }
    if (keyword == "fifteen") {
        document.getElementById("portables").style.display = "none";
        document.getElementById("numPD").value = "";
    }
    if (keyword == "sixteen") {
        document.getElementById("ipods").style.display = "none";
        document.getElementById("numIpods").value = "";
    }

    document.getElementById(keyword).checked = false;

    var x = Number(document.getElementById("numItems").innerHTML);
    x--;
    document.getElementById("numItems").innerHTML = x;
    if (x == 0) {
        document.getElementById("thread").style.display = "none";
    }
}

function displayItem(keyword) {
    if (keyword == "one") {
        document.getElementById("televisions").style.display = "block";
    }
    if (keyword == "two") {
        document.getElementById("computers").style.display = "block";
    }
    if (keyword == "three") {
        document.getElementById("monitors").style.display = "block";
    }
    if (keyword == "four") {
        document.getElementById("keyboards").style.display = "block";
    }
    if (keyword == "five") {
        document.getElementById("pointers").style.display = "block";
    }
    if (keyword == "six") {
        document.getElementById("printers").style.display = "block";
    }
    if (keyword == "seven") {
        document.getElementById("tvPeripherals").style.display = "block";
    }
    if (keyword == "eight") {
        document.getElementById("vcrs").style.display = "block";
    }
    if (keyword == "nine") {
        document.getElementById("dvrs").style.display = "block";
    }
    if (keyword == "ten") {
        document.getElementById("dvd").style.display = "block";
    }
    if (keyword == "eleven") {
        document.getElementById("dcb").style.display = "block";
    }
    if (keyword == "twelve") {
        document.getElementById("cable").style.display = "block";
    }
    if (keyword == "thirteen") {
        document.getElementById("xbox").style.display = "block";
    }
    if (keyword == "fourteen") {
        document.getElementById("sss").style.display = "block";
    }
    if (keyword == "fifteen") {
        document.getElementById("portables").style.display = "block";
    }
    if (keyword == "sixteen") {
        document.getElementById("ipods").style.display = "block"
    }

    var x = Number(document.getElementById("numItems").innerHTML);
    x++;
    document.getElementById("numItems").innerHTML = x;
}

function displayTVs() {
    var numTvs = Number(document.getElementById("numTV").value);
    if (numTvs == 0) {
        document.getElementById("tv1").style.display = "none";
        document.getElementById("tv2").style.display = "none";
        document.getElementById("tv3").style.display = "none";
        document.getElementById("tv4").style.display = "none";
        document.getElementById("tv5").style.display = "none";
    }
    if (numTvs == 1) {
        document.getElementById("tv1").style.display = "block";
        document.getElementById("tv2").style.display = "none";
        document.getElementById("tv3").style.display = "none";
        document.getElementById("tv4").style.display = "none";
        document.getElementById("tv5").style.display = "none";
    }
    if (numTvs == 2) {
        document.getElementById("tv1").style.display = "block";
        document.getElementById("tv2").style.display = "block";
        document.getElementById("tv3").style.display = "none";
        document.getElementById("tv4").style.display = "none";
        document.getElementById("tv5").style.display = "none";
    }
    if (numTvs == 3) {
        document.getElementById("tv1").style.display = "block";
        document.getElementById("tv2").style.display = "block";
        document.getElementById("tv3").style.display = "block";
        document.getElementById("tv4").style.display = "none";
        document.getElementById("tv5").style.display = "none";
    }
    if (numTvs == 4) {
        document.getElementById("tv1").style.display = "block";
        document.getElementById("tv2").style.display = "block";
        document.getElementById("tv3").style.display = "block";
        document.getElementById("tv4").style.display = "block";
        document.getElementById("tv5").style.display = "none";
    }
    if (numTvs == 5) {
        document.getElementById("tv1").style.display = "block";
        document.getElementById("tv2").style.display = "block";
        document.getElementById("tv3").style.display = "block";
        document.getElementById("tv4").style.display = "block";
        document.getElementById("tv5").style.display = "block";
    }
}
