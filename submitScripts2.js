var authorization2 = auth_token;

var recordID = "";
var capID = "";
var customId = "";

function createUpdate() {

    var computers, monitors, keyboards, mice, fax, peripherals, vcrs, dvrs, dvd, dcb, cable, xbox, sss, portables, ipods;
    computers = Number(document.getElementById("numComps").value) + 0;
    monitors = Number(document.getElementById("numMon").value) + 0;
    keyboards = Number(document.getElementById("numEKey").value) + 0;
    mice = Number(document.getElementById("numEMice").value) + 0;
    fax = Number(document.getElementById("numFax").value) + 0;
    peripherals = Number(document.getElementById("numTVP").value) + 0;
    vcrs = Number(document.getElementById("numVCR").value) + 0;
    dvrs = Number(document.getElementById("numDVR").value) + 0;
    dvd = Number(document.getElementById("numDVD").value) + 0;
    dcb = Number(document.getElementById("numDCB").value) + 0;
    cable = Number(document.getElementById("numCable").value) + 0;
    xbox = Number(document.getElementById("numXbox").value) + 0;
    sss = Number(document.getElementById("numSSS").value) + 0;
    portables = Number(document.getElementById("numPD").value) + 0;
    ipods = Number(document.getElementById("numIpods").value) + 0;

    var televisions = Number(document.getElementById("numTV").value) + 0;

    var electronicDevicesTotal = computers + monitors + keyboards + mice + fax + peripherals + vcrs + dvrs + dvd + dcb + cable + xbox + sss + portables + ipods + televisions + 0;

    var buildingNumber = encodeURI(document.getElementById("bldg-input").value);
    var streetAddress = encodeURI(document.getElementById("street-input").value);
    var firstName = encodeURI(document.getElementById("first-name").value);
    var lastName = encodeURI(document.getElementById("last-name").value);
    var userEmail = encodeURI(document.getElementById("email").value);
    var phoneNumber = encodeURI(document.getElementById("phone").value);
    var suffix = "";

    var crossStreet = encodeURI(document.getElementById('cs1').value + " - " + document.getElementById('cs2').value);
    var bbl = encodeURI(document.getElementById("bbl").value);
    var district = encodeURI(document.getElementById("district").value);
    var lat = encodeURI(document.getElementById("lat").value);
    var lon = encodeURI(document.getElementById("lon").value);
    var cityName = encodeURI(document.getElementById("cityName").value);
    var zip = encodeURI(document.getElementById("zip").value);
    if (userEmail == '') {
        userEmail = "null";
    }

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://10.30.5.123:3000/create/" + electronicDevicesTotal + "/" + televisions + "/" + bbl + "/" + buildingNumber + "/" + streetAddress + "/" + 'null' + "/" + crossStreet + "/" + district + "/" + cityName + "/" + lon + "/" + lat + "/" + zip + "/" + firstName + "/" + lastName + "/" + userEmail + "/" + phoneNumber + "",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "a24a589c-fcdc-0d6d-f9b2-e6ca3ebd9f7a"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    $.ajax(settings).done(function (response) {
        console.log(response);
        capID = response.result["id"];
        customId = response.result["customId"];
    });

    var tv32 = 0;
    var tv43 = 0;
    var tv49 = 0;
    var tv59 = 0;
    var tv69 = 0;
    var tv70 = 0;

    if (televisions == 1) {
        var size1 = document.getElementById("tv1size1").value;
        if (size1 == "32 Inches and Under")
            tv32++;
        if (size1 == "33 to 43 inches")
            tv43++;
        if (size1 == "44 to 49 inches")
            tv49++;
        if (size1 == "50 to 59 inches")
            tv59++;
        if (size1 == "60 to 69 inches")
            tv69++;
        if (size1 == "Larger than 70 inches")
            tv70++;
    }
    if (televisions == 2) {
        var size1 = document.getElementById("tv1size1").value;
        if (size1 == "32 Inches and Under")
            tv32++;
        if (size1 == "33 to 43 inches")
            tv43++;
        if (size1 == "44 to 49 inches")
            tv49++;
        if (size1 == "50 to 59 inches")
            tv59++;
        if (size1 == "60 to 69 inches")
            tv69++;
        if (size1 == "Larger than 70 inches")
            tv70++;
        var size2 = document.getElementById("tv2size1").value;
        if (size2 == "32 Inches and Under")
            tv32++;
        if (size2 == "33 to 43 inches")
            tv43++;
        if (size2 == "44 to 49 inches")
            tv49++;
        if (size2 == "50 to 59 inches")
            tv59++;
        if (size2 == "60 to 69 inches")
            tv69++;
        if (size3 == "Larger than 70 inches")
            tv70++;
    }
    if (televisions == 3) {
        var size1 = document.getElementById("tv1size1").value;
        if (size1 == "32 Inches and Under")
            tv32++;
        if (size1 == "33 to 43 inches")
            tv43++;
        if (size1 == "44 to 49 inches")
            tv49++;
        if (size1 == "50 to 59 inches")
            tv59++;
        if (size1 == "60 to 69 inches")
            tv69++;
        if (size1 == "Larger than 70 inches")
            tv70++;
        var size2 = document.getElementById("tv2size1").value;
        if (size2 == "32 Inches and Under")
            tv32++;
        if (size2 == "33 to 43 inches")
            tv43++;
        if (size2 == "44 to 49 inches")
            tv49++;
        if (size2 == "50 to 59 inches")
            tv59++;
        if (size2 == "60 to 69 inches")
            tv69++;
        if (size2 == "Larger than 70 inches")
            tv70++;
        var size3 = document.getElementById("tv3size1").value;
        if (size3 == "32 Inches and Under")
            tv32++;
        if (size3 == "33 to 43 inches")
            tv43++;
        if (size3 == "44 to 49 inches")
            tv49++;
        if (size3 == "50 to 59 inches")
            tv59++;
        if (size3 == "60 to 69 inches")
            tv69++;
        if (size3 == "Larger than 70 inches")
            tv70++;
    }
    if (televisions == 4) {
        var size1 = document.getElementById("tv1size1").value;
        if (size1 == "32 Inches and Under")
            tv32++;
        if (size1 == "33 to 43 inches")
            tv43++;
        if (size1 == "44 to 49 inches")
            tv49++;
        if (size1 == "50 to 59 inches")
            tv59++;
        if (size1 == "60 to 69 inches")
            tv69++;
        if (size1 == "Larger than 70 inches")
            tv70++;
        var size2 = document.getElementById("tv2size1").value;
        if (size2 == "32 Inches and Under")
            tv32++;
        if (size2 == "33 to 43 inches")
            tv43++;
        if (size2 == "44 to 49 inches")
            tv49++;
        if (size2 == "50 to 59 inches")
            tv59++;
        if (size2 == "60 to 69 inches")
            tv69++;
        if (size2 == "Larger than 70 inches")
            tv70++;
        var size3 = document.getElementById("tv3size1").value;
        if (size3 == "32 Inches and Under")
            tv32++;
        if (size3 == "33 to 43 inches")
            tv43++;
        if (size3 == "44 to 49 inches")
            tv49++;
        if (size3 == "50 to 59 inches")
            tv59++;
        if (size3 == "60 to 69 inches")
            tv69++;
        if (size3 == "Larger than 70 inches")
            tv70++;
        var size4 = document.getElementById("tv4size1").value;
        if (size4 == "32 Inches and Under")
            tv32++;
        if (size4 == "33 to 43 inches")
            tv43++;
        if (size4 == "44 to 49 inches")
            tv49++;
        if (size4 == "50 to 59 inches")
            tv59++;
        if (size4 == "60 to 69 inches")
            tv69++;
        if (size4 == "Larger than 70 inches")
            tv70++;
    }
    if (televisions == 5) {
        var size1 = document.getElementById("tv1size1").value;
        if (size1 == "32 Inches and Under")
            tv32++;
        if (size1 == "33 to 43 inches")
            tv43++;
        if (size1 == "44 to 49 inches")
            tv49++;
        if (size1 == "50 to 59 inches")
            tv59++;
        if (size1 == "60 to 69 inches")
            tv69++;
        if (size1 == "Larger than 70 inches")
            tv70++;
        var size2 = document.getElementById("tv2size1").value;
        if (size2 == "32 Inches and Under")
            tv32++;
        if (size2 == "33 to 43 inches")
            tv43++;
        if (size2 == "44 to 49 inches")
            tv49++;
        if (size2 == "50 to 59 inches")
            tv59++;
        if (size2 == "60 to 69 inches")
            tv69++;
        if (size2 == "Larger than 70 inches")
            tv70++;
        var size3 = document.getElementById("tv3size1").value;
        if (size3 == "32 Inches and Under")
            tv32++;
        if (size3 == "33 to 43 inches")
            tv43++;
        if (size3 == "44 to 49 inches")
            tv49++;
        if (size3 == "50 to 59 inches")
            tv59++;
        if (size3 == "60 to 69 inches")
            tv69++;
        if (size3 == "Larger than 70 inches")
            tv70++;
        var size4 = document.getElementById("tv4size1").value;
        if (size4 == "32 Inches and Under")
            tv32++;
        if (size4 == "33 to 43 inches")
            tv43++;
        if (size4 == "44 to 49 inches")
            tv49++;
        if (size4 == "50 to 59 inches")
            tv59++;
        if (size4 == "60 to 69 inches")
            tv69++;
        if (size4 == "Larger than 70 inches")
            tv70++;
        var size5 = document.getElementById("tv5size1").value;
        if (size5 == "32 Inches and Under")
            tv32++;
        if (size5 == "33 to 43 inches")
            tv43++;
        if (size5 == "44 to 49 inches")
            tv49++;
        if (size5 == "50 to 59 inches")
            tv59++;
        if (size5 == "60 to 69 inches")
            tv69++;
        if (size5 == "Larger than 70 inches")
            tv70++;
    }

    capID = encodeURI(capID);
    // Update with Correct Information
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://10.30.5.123:3000/update/" + capID + "/" + tv32 + "/" + tv43 + "/" + tv49 + "/" + tv59 + "/" + tv69 + "/" + tv70 + "/" + televisions + "/" + computers + "/" + monitors + "/" + keyboards + "/" + mice + "/" + fax + "/" + peripherals + "/" + vcrs + "/" + dvrs + "/" + dvd + "/" + dcb + "/" + cable + "/" + xbox + "/" + sss + "/" + portables + "/" + ipods + "",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "8bce7523-f85e-4883-8c09-b9331ab5cc97"
        },
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    // Schedule the Inspection on the Appropirate Date
    var pickupDate = document.getElementById("pickupDate").value;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://10.30.5.123:3000/schedule/" + capID + "/" + pickupDate + "",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "1fef8950-f3dc-ae46-a7ab-4c33c505a14c"
        },
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log("Inspection Scheduled")
    });

    setCookie("record", customId, 1);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function onLastLoad() {
    var myRecord = getCookie("record");
    document.getElementById("recordID").innerHTML = myRecord;
}
