var authorization2 = "8PR5t7I7Cn2KPe9ge0gLmK9bhWErzsibqM5tZ0diknv_7VKvDN-84NmylZQgTavFlP7Fn7iGwgrv_0mE6Eplcb_Pu1-7gGFiM6oCYXZDn0nZRsYW5eLpJug-tEMQvujw6sWVX4rlAeFyr0tuBrRyl9BBBtgFIhbRLAD3VRrtyXUZcDVURMrf0wkUcviVM3aUWsEFMZhdzER9WMLgeGAQ2_QlN1-5xQo1bwFd_inttPdWcgdOJ6VAvPE08DAtnfltZ_djgYIYt-V-Va0j45z2IxpIXxf64Cv4fNIVAiFsRHyS47BFdpm7tB9hXYGjoCFi0fMkZORtIE9fNcAJmBXCKu9qXe1wA7qdItmGkm-T2HFK6W2ftiSWkqF5MsmSB_av3HVQGf3stWrvtCQ0VDX4bVLUObNOaML4ePe_hQMPMfATr9hAMq0L-Dt--mE47zWmeT9UA--OkQ_xLa1oi-rXhg2";

var recordID = "";
var capID = "";

function createUpdate() {

    var buildingNumber = document.getElementById("buildingNumber2").innerHTML;
    var streetAddress = document.getElementById("streetAddress2").innerHTML;
    var firstName = document.getElementById("firstName").innerHTML;
    var lastName = document.getElementById("lastName").innerHTML;
    var userEmail = document.getElementById("emailAddress").innerHTML;
    var phoneNumber = document.getElementById("phoneNumber").innerHTML;

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
        "data": "{\r\n    \"type\": {\r\n        \"id\": \"Building-DSNY-Electronic Waste Pickup Prgm-NA\"\r\n    },\r\n    \"description\": \"Electronic Waste Pickup\",\r\n    \"parcels\": [\r\n        {\r\n            \"parcelNumber\": \"005020018\"\r\n    }\r\n  ],\r\n    \"addresses\": [\r\n        {\r\n            \"isPrimary\": \"Y\",\r\n            \"streetStart\": \"" + buildingNumber + "\",\r\n            \"streetName\": \"" + streetAddress + "\",\r\n            \"inspectionDistrict\": \"1\",\r\n            \"city\": \"Staten Island\",\r\n            \"postalCode\": \"10303\",\r\n            \"state\": {\r\n                \"value\": \"NY\",\r\n                \"text\": \"NY\"\r\n            }\r\n    }\r\n  ],\r\n    \"contacts\": [\r\n        {\r\n            \"isPrimary\": \"Y\",\r\n            \"fullName\": \"" + firstName + " " + lastName + "\",\r\n            \"email\": \"jsmith@email.com\",\r\n            \"firstName\": \"" + firstName + "\",\r\n            \"lastName\": \"" + lastName + "\",\r\n            \"phone3\": \"" + phoneNumber + "\",\r\n            \"status\": {\r\n                \"value\": \"A\",\r\n                \"text\": \"Active\"\r\n            },\r\n            \"type\": {\r\n                \"value\": \"Owner\",\r\n                \"text\": \"Owner\"\r\n            }\r\n    }\r\n  ]\r\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        capID = response.result["id"];
    });

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
        "data": "[\n    {\n      \"id\": \"DSNY_EW-TELEVISION\",\n      \"44 to 49 Inches\": \"0\",\n      \"32 Inches & Under\": \"1\",\n      \"33 to 43 Inches\": \"0\",\n      \"70 Inches & Up\": \"1\",\n      \"60 to 69 Inches\": \"0\",\n      \"50 to 59 Inches\": \"0\"\n    },\n    {\n      \"Computer peripherals, including any permanently attached cable or wiring\": \"" + computers + "\",\n      \"Portable devices, including any permanently attached cable or wiring\": \"" + portables + "\",\n      \"Digital converter boxes\": \"" + dcb + "\",\n      \"Fax machines, document scanners, and printers that weigh less than 100lbs\": \"" + fax + "\",\n      \"VCRs\": \"" + vcrs + "\",\n      \"Portable digital music players\": \"" + ipods + "\",\n      \"Electronic mice and other pointing devices\": \"" + mice + "\",\n      \"Small scale servers\": \"" + sss + "\",\n      \"Digital video recorders\": \"" + dvrs + "\",\n      \"Electronic or video game consoles\": \"" + xbox + "\",\n      \"id\": \"DSNY_EW-OTHER.cELECTRONICS\",\n      \"Televisions (including cathode ray tubes)\": \"0\",\n      \"Monitors, laptops\": \"" + monitors + "\",\n      \"Electronic keyboards\": \"" + keyboards + "\",\n      \"DVD players\": \"" + dvd + "\",\n      \"Cable or satellite receivers\": \"" + cable + "\",\n      \"TV Peripherals, including any permanently attached cable or wiring\": \"" + peripherals + "\"\n    }\n  ]"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    setCookie("record", recordID, 1);
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
