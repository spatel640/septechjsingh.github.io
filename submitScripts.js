var authorization2 = auth_token;

var recordID = "";
var capID = "";
var customId = "";

function checkScheduleDate(insp_date, district) {
    setCookie("invalidDate", "false", 1);

    var returnable = false;
    var now = moment();
    var d = new Date();
    var n = d.getHours();

    if (n >= 12) {
        now.add(1, 'days');
    }

    var temp = now.format('YYYY MM DD').toString();
    var date2Pass = temp[0] + temp[1] + temp[2] + temp[3] + '-' + temp[5] + temp[6] + '-' + temp[8] + temp[9];

    console.log(date2Pass);

    var myUrl1 = "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-0002O&startDate=" + date2Pass + "&validateScheduleNumOfDays=true&validateCutOffTime=true";
    var myUrl2 = "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-0002P&startDate=" + date2Pass + "&validateScheduleNumOfDays=true&validateCutOffTime=true";
    var myUrl3 = "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-0002Q&startDate=" + date2Pass + "&validateScheduleNumOfDays=true&validateCutOffTime=true";

    var myUrl = "";

    if (district == "501")
        myUrl = myUrl1;
    else if (district == "502")
        myUrl = myUrl2;
    else
        myUrl = myUrl3;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": myUrl,
        "method": "GET",
        "headers": {
            "authorization": auth_token,
            "cache-control": "no-cache",
            "postman-token": "2b42eb30-50a4-61dd-4153-9de32a983d81"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var datesArray = response.result;
        for (i = 0; i < datesArray.length; i++) {
            var validDate = datesArray[i].substring(0, datesArray[i].length - 9);
            if (insp_date == validDate) {
                console.log("FOUND A VALID DATE");
                returnable = true;
            }
        }
    });
    return returnable;
}

function createUpdate() {

    var computers, monitors, keyboards, mice, fax, peripherals, vcrs, dvrs, dvd, dcb, cable, xbox, sss, portables, ipods;
    computers = Number(document.getElementById("numComps").innerHTML) + 0;
    monitors = Number(document.getElementById("numMon").innerHTML) + 0;
    keyboards = Number(document.getElementById("numEKey").innerHTML) + 0;
    mice = Number(document.getElementById("numEMice").innerHTML) + 0;
    fax = Number(document.getElementById("numFax").innerHTML) + 0;
    peripherals = Number(document.getElementById("numTVP").innerHTML) + 0;
    vcrs = Number(document.getElementById("numVCR").innerHTML) + 0;
    dvrs = Number(document.getElementById("numDVR").innerHTML) + 0;
    dvd = Number(document.getElementById("numDVD").innerHTML) + 0;
    dcb = Number(document.getElementById("numDCB").innerHTML) + 0;
    cable = Number(document.getElementById("numCable").innerHTML) + 0;
    xbox = Number(document.getElementById("numXbox").innerHTML) + 0;
    sss = Number(document.getElementById("numSSS").innerHTML) + 0;
    portables = Number(document.getElementById("numPD").innerHTML) + 0;
    ipods = Number(document.getElementById("numIpods").innerHTML) + 0;

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
    var inValidDate = getCookie("invalidDate");
    if (inValidDate == "true") {
        document.getElementById('receipt').innerHTML = "Sorry the pickup date you selected is no longer available. Please reschedule for another Date.";
        $('#track-request-button').prop('disabled', 'disabled');
    } else {
        var myRecord = getCookie("record");
        document.getElementById("recordID").innerHTML = myRecord;
    }
    setCookie("invalidDate", "false", 1);
}
