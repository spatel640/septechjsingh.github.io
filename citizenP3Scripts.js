function fillInfo() {
    var bldg = getCookie('bldg_num');
    var street = getCookie('street');
    var city = getCookie('city');
    var cs1 = getCookie('cs1');
    var cs2 = getCookie('cs2');

    document.getElementById("buildingNumber").innerHTML = bldg;
    document.getElementById("streetAddress").innerHTML = street;
    document.getElementById("verifiedBorough").innerHTML = city.toUpperCase();
    document.getElementById("crossStreet1").innerHTML = cs1;
    document.getElementById("crossStreet2").innerHTML = cs2;

    document.getElementById("buildingNumber2").innerHTML = bldg;
    document.getElementById("streetAddress2").innerHTML = street;
    document.getElementById("verifiedBorough2").innerHTML = city.toUpperCase();
    document.getElementById("CrossStreet1").innerHTML = cs1;
    document.getElementById("CrossStreet2").innerHTML = cs2;

    // Fill in Pickup location & appointment Date
    var pickupLoc = getCookie('pickup_location')
    var pickupD = getCookie('pickupDate');

    document.getElementById("pickupLocation").innerHTML = pickupLoc.toUpperCase();
    document.getElementById("pickupDate").innerHTML = pickupD;

    // Fill in Electronics Category Information
    var numTV = getCookie('televisions');
    var numComps = getCookie('comps');
    var numMon = getCookie('mons');
    var numEKey = getCookie('keys');
    var numEMice = getCookie('mice');
    var numFax = getCookie('fax');
    var numTVP = getCookie('tvp');
    var numVCR = getCookie('vcr');
    var numDVR = getCookie('dvr');
    var numDVD = getCookie('dvd')
    var numDCB = getCookie('dcb');
    var numCable = getCookie('cable')
    var numXbox = getCookie('xbox');
    var numSSS = getCookie('sss');
    var numPD = getCookie('pd');
    var numIpods = getCookie('ipods');

    var tv1 = getCookie('tv1');
    var tv2 = getCookie('tv2');
    var tv3 = getCookie('tv3');
    var tv4 = getCookie('tv4');
    var tv5 = getCookie('tv5');

    if (numTV == "") {
        document.getElementById("tvs2").style.display = "none";
    } else {
        document.getElementById("numTV").innerHTML = numTV;
        if (numTV == "1") {
            document.getElementById("tv1").style.display = "block";
            document.getElementById("tv1size").innerHTML = tv1;
        }
        if (numTV == "2") {
            document.getElementById("tv1").style.display = "block";
            document.getElementById("tv1size").innerHTML = tv1;
            document.getElementById("tv2").style.display = "block";
            document.getElementById("tv2size").innerHTML = tv2;
        }
        if (numTV == "3") {
            document.getElementById("tv1").style.display = "block";
            document.getElementById("tv1size").innerHTML = tv1;
            document.getElementById("tv2").style.display = "block";
            document.getElementById("tv2size").innerHTML = tv2;
            document.getElementById("tv3").style.display = "block";
            document.getElementById("tv3size").innerHTML = tv3;
        }
        if (numTV == "4") {
            document.getElementById("tv1").style.display = "block";
            document.getElementById("tv1size").innerHTML = tv1;
            document.getElementById("tv2").style.display = "block";
            document.getElementById("tv2size").innerHTML = tv2;
            document.getElementById("tv3").style.display = "block";
            document.getElementById("tv3size").innerHTML = tv3;
            document.getElementById("tv4").style.display = "block";
            document.getElementById("tv4size").innerHTML = tv4;
        }
        if (numTV == "5") {
            document.getElementById("tv1").style.display = "block";
            document.getElementById("tv1size").innerHTML = tv1;
            document.getElementById("tv2").style.display = "block";
            document.getElementById("tv2size").innerHTML = tv2;
            document.getElementById("tv3").style.display = "block";
            document.getElementById("tv3size").innerHTML = tv3;
            document.getElementById("tv4").style.display = "block";
            document.getElementById("tv4size").innerHTML = tv4;
            document.getElementById("tv5").style.display = "block";
            document.getElementById("tv5size").innerHTML = tv5;
        }
    }

    if (numComps == "") {
        document.getElementById("comps2").style.display = "none";
    } else {
        document.getElementById("numComps").innerHTML = numComps;
    }

    if (numMon == "") {
        document.getElementById("mon2").style.display = "none";
    } else {
        document.getElementById("numMon").innerHTML = numMon;
    }

    if (numEKey == "") {
        document.getElementById("ekey").style.display = "none";
    } else {
        document.getElementById("numEKey").innerHTML = numEKey;
    }

    if (numEMice == "") {
        document.getElementById("emice").style.display = "none";
    } else {
        document.getElementById("numEMice").innerHTML = numEMice;
    }

    if (numFax == "") {
        document.getElementById("fax").style.display = "none";
    } else {
        document.getElementById("numFax").innerHTML = numFax;
    }

    if (numTVP == "") {
        document.getElementById("tvp").style.display = "none";
    } else {
        document.getElementById("numTVP").innerHTML = numTVP;
    }

    if (numVCR == "") {
        document.getElementById("vcr2").style.display = "none";
    } else {
        document.getElementById("numVCR").innerHTML = numVCR;
    }

    if (numDVR == "") {
        document.getElementById("dvr2").style.display = "none";
    } else {
        document.getElementById("numDVR").innerHTML = numDVR;
    }

    if (numDVD == "") {
        document.getElementById("dvd2").style.display = "none";
    } else {
        document.getElementById("numDVD").innerHTML = numDVD;
    }

    if (numDCB == "") {
        document.getElementById("dcb2").style.display = "none";
    } else {
        document.getElementById("numDCB").innerHTML = numDCB;
    }

    if (numCable == "") {
        document.getElementById("cable2").style.display = "none";
    } else {
        document.getElementById("numCable").innerHTML = numCable;
    }

    if (numXbox == "") {
        document.getElementById("xbox2").style.display = "none";
    } else {
        document.getElementById("numXbox").innerHTML = numXbox;
    }

    if (numSSS == "") {
        document.getElementById("sss2").style.display = "none";
    } else {
        document.getElementById("numSSS").innerHTML = numSSS;
    }

    if (numPD == "") {
        document.getElementById("pd2").style.display = "none";
    } else {
        document.getElementById("numPD").innerHTML = numPD;
    }

    if (numIpods == "") {
        document.getElementById("ipod2").style.display = "none";
    } else {
        document.getElementById("numIpods").innerHTML = numIpods;
    }

    // Fill in First Name, Last Name, Phone & Email (if provided)

    var fName = getCookie('firstName');
    var lName = getCookie('lastName');
    var phone = getCookie('phone');
    var email = getCookie('email');

    document.getElementById("firstName").innerHTML = fName.toUpperCase();
    document.getElementById("lastName").innerHTML = lName.toUpperCase();
    document.getElementById("phoneNumber").innerHTML = phone;
    document.getElementById("emailAddress").innerHTML = email;
}

function createUpdate() {

    var computers, monitors, keyboards, mice, fax, peripherals, vcrs, dvrs, dvd, dcb, cable, xbox, sss, portables, ipods;
    computers = Number(getCookie('comps')) + 0;
    monitors = Number(getCookie('mons')) + 0;
    keyboards = Number(getCookie('keys')) + 0;
    mice = Number(getCookie('mice')) + 0;
    fax = Number(getCookie('fax')) + 0;
    peripherals = Number(getCookie('tvp')) + 0;
    vcrs = Number(getCookie('vcr')) + 0;
    dvrs = Number(getCookie('dvr')) + 0;
    dvd = Number(getCookie('dvd')) + 0;
    dcb = Number(getCookie('dcb')) + 0;
    cable = Number(getCookie('cable')) + 0;
    xbox = Number(document.getElementById("numXbox").innerHTML) + 0;
    sss = Number(document.getElementById("numSSS").innerHTML) + 0;
    portables = Number(document.getElementById("numPD").innerHTML) + 0;
    ipods = Number(document.getElementById("numIpods").innerHTML) + 0;

    /*
    var numTV = getCookie('televisions');
    var numComps = getCookie('comps');
    var numMon = getCookie('mons');
    var numEKey = getCookie('keys');
    var numEMice = getCookie('mice');
    var numFax = getCookie('fax');
    var numTVP = getCookie('tvp');
    var numVCR = getCookie('vcr');
    var numDVR = getCookie('dvr');
    var numDVD = getCookie('dvd')
    var numDCB = getCookie('dcb');
    var numCable = getCookie('cable')
    var numXbox = getCookie('xbox');
    var numSSS = getCookie('sss');
    var numPD = getCookie('pd');
    var numIpods = getCookie('ipods'); */
    var televisions = Number(document.getElementById("numTV").innerHTML) + 0;

    var electronicDevicesTotal = computers + monitors + keyboards + mice + fax + peripherals + vcrs + dvrs + dvd + dcb + cable + xbox + sss + portables + ipods + televisions + 0;

    var buildingNumber = document.getElementById("buildingNumber2").innerHTML;
    var streetAddress = document.getElementById("streetAddress2").innerHTML;
    var firstName = document.getElementById("firstName").innerHTML;
    var lastName = document.getElementById("lastName").innerHTML;
    var userEmail = document.getElementById("emailAddress").innerHTML;
    var phoneNumber = document.getElementById("phoneNumber").innerHTML;
    var suffix = "";
    var crossStreet = document.getElementById('crossStreet1').innerHTML + " / " + document.getElementById('crossStreet2').innerHTML;

    var bbl = document.getElementById("bbl3").value;
    var district = document.getElementById("district3").value;
    var lat = document.getElementById("lat3").value;
    var lon = document.getElementById("lon3").value;
    var cityName = document.getElementById("cityName3").value;
    var zip = document.getElementById("zip3").value;
    var pickupDate = document.getElementById("pickupDate").innerHTML;

    var isDateValid = checkScheduleDate(pickupDate, district);
    if (isDateValid == false) {
        setCookie("invalidDate", "true", 1);
        return;
    }

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "authorization": authorization2,
            "cache-control": "no-cache",
            "postman-token": "aab06c5a-bde7-7b59-c426-874beb07ad16"
        },
        "processData": false,
        "data": "{\r\n    \"type\": {\r\n        \"id\": \"Building-DSNY-Electronic Waste Pickup Prgm-NA\"\r\n    },\r\n    \"description\": \"Electronic Waste Pickup\",\r\n   \"name\": \"" + electronicDevicesTotal + " Devices (" + televisions + " TVs)" + "\",\r\n    \"parcels\": [\r\n        {\r\n            \"parcelNumber\": \"" + bbl + "\"\r\n    }\r\n  ],\r\n    \"addresses\": [\r\n        {\r\n            \"isPrimary\": \"Y\",\r\n            \"streetStart\": \"" + buildingNumber + "\",\r\n            \"streetName\": \"" + streetAddress + "\",\r\n            \"streetSuffix\": {\r\n                \"value\": \"" + suffix + "\",\r\n                \"text\": \"" + suffix + "\"\r\n            },\r\n           \"secondaryStreet\": \"" + crossStreet + "\",\r\n             \"inspectionDistrict\": \"" + district + "\",\r\n            \"city\": \"" + cityName + "\", \r\n            \"xCoordinate\": \"" + lon + "\",\r\n            \"yCoordinate\": \"" + lat + "\",\r\n            \"postalCode\": \"" + zip + "\",\r\n            \"state\": {\r\n                \"value\": \"NY\",\r\n                \"text\": \"NY\"\r\n            }\r\n    }\r\n  ],\r\n    \"contacts\": [\r\n        {\r\n            \"isPrimary\": \"Y\",\r\n            \"fullName\": \"" + firstName + " " + lastName + "\",\r\n            \"email\": \"" + userEmail + "\",\r\n            \"firstName\": \"" + firstName + "\",\r\n            \"lastName\": \"" + lastName + "\",\r\n            \"phone3\": \"" + phoneNumber + "\",\r\n            \"status\": {\r\n                \"value\": \"A\",\r\n                \"text\": \"Active\"\r\n            },\r\n            \"type\": {\r\n                \"value\": \"Owner\",\r\n                \"text\": \"Owner\"\r\n            }\r\n    }\r\n  ]\r\n}"
    }

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
        var size1 = document.getElementById("tv1size").innerHTML;
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
        var size1 = document.getElementById("tv1size").innerHTML;
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
        var size2 = document.getElementById("tv2size").innerHTML;
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
        var size1 = document.getElementById("tv1size").innerHTML;
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
        var size2 = document.getElementById("tv2size").innerHTML;
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
        var size3 = document.getElementById("tv3size").innerHTML;
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
        var size1 = document.getElementById("tv1size").innerHTML;
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
        var size2 = document.getElementById("tv2size").innerHTML;
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
        var size3 = document.getElementById("tv3size").innerHTML;
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
        var size4 = document.getElementById("tv4size").innerHTML;
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
        var size1 = document.getElementById("tv1size").innerHTML;
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
        var size2 = document.getElementById("tv2size").innerHTML;
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
        var size3 = document.getElementById("tv3size").innerHTML;
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
        var size4 = document.getElementById("tv4size").innerHTML;
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
        var size5 = document.getElementById("tv5size").innerHTML;
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

    // Update with Correct Information
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capID + "/customForms",
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "authorization": authorization2,
            "cache-control": "no-cache",
            "postman-token": "8bce7523-f85e-4883-8c09-b9331ab5cc97"
        },
        "processData": false,
        "data": "[\n    {\n      \"id\": \"DSNY_EW-TELEVISION\",\n      \"44 to 49 Inches\": \"" + tv49 + "\",\n      \"32 Inches & Under\": \"" + tv32 + "\",\n      \"33 to 43 Inches\": \"" + tv43 + "\",\n      \"70 Inches & Up\": \"" + tv70 + "\",\n      \"60 to 69 Inches\": \"" + tv69 + "\",\n      \"50 to 59 Inches\": \"" + tv59 + "\"\n    },\n    {\n      \"Computer peripherals, including any permanently attached cable or wiring\": \"" + computers + "\",\n      \"Portable devices, including any permanently attached cable or wiring\": \"" + portables + "\",\n      \"Digital converter boxes\": \"" + dcb + "\",\n      \"Fax machines, document scanners, and printers that weigh less than 100lbs\": \"" + fax + "\",\n      \"VCRs\": \"" + vcrs + "\",\n      \"Portable digital music players\": \"" + ipods + "\",\n      \"Electronic mice and other pointing devices\": \"" + mice + "\",\n      \"Small scale servers\": \"" + sss + "\",\n      \"Digital video recorders\": \"" + dvrs + "\",\n      \"Electronic or video game consoles\": \"" + xbox + "\",\n      \"id\": \"DSNY_EW-OTHER.cELECTRONICS\",\n      \"Televisions (including cathode ray tubes)\": \"0\",\n      \"Monitors, Laptops\": \"" + monitors + "\",\n      \"Electronic keyboards\": \"" + keyboards + "\",\n      \"DVD players\": \"" + dvd + "\",\n      \"Cable or satellite receivers\": \"" + cable + "\",\n      \"TV Peripherals, including any permanently attached cable or wiring\": \"" + peripherals + "\"\n    }\n  ]"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    // Schedule the Inspection on the Appropirate Date
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/inspections/schedule",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "authorization": authorization2,
            "cache-control": "no-cache",
            "postman-token": "1fef8950-f3dc-ae46-a7ab-4c33c505a14c"
        },
        "processData": false,
        "data": "{\r\n  \"serviceProviderCode\": \"PARTNER\",\r\n  \"isAutoAssign\": \"Y\",\r\n  \"type\": {\r\n    \"id\": 5\r\n  },\r\n  \"recordId\": {\r\n    \"id\": \"" + capID + "\"\r\n  },\r\n  \"scheduleDate\": \"" + pickupDate + "\"\r\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log("Inspection Scheduled")
    });

    setCookie("record", customId, 1);
}
