$(function () {
    $("select").multiselect();
});

function enableBorough() {
    document.getElementById("brgh").disabled = false;
}

var auth_token = "8PR5t7I7Cn2KPe9ge0gLmK9bhWErzsibqM5tZ0diknv_7VKvDN-84NmylZQgTavFlP7Fn7iGwgrv_0mE6Eplcb_Pu1-7gGFiM6oCYXZDn0nZRsYW5eLpJug-tEMQvujw6sWVX4rlAeFyr0tuBrRyl9BBBtgFIhbRLAD3VRrtyXUZcDVURMrf0wkUcviVM3aUWsEFMZhdzER9WMLgeGAQ2_QlN1-5xQo1bwFd_inttPdWcgdOJ6VAvPE08DAtnfltZ_djgYIYt-V-Va0j45z2IxpIXxf64Cv4fNIVAiFsRHyS47BFdpm7tB9hXYGjoCFi0fMkZORtIE9fNcAJmBXCKu9qXe1wA7qdItmGkm-T2HFK6W2ftiSWkqF5MsmSB_av3HVQGf3stWrvtCQ0VDX4bVLUObNOaML4ePe_hQMPMfATr9hAMq0L-Dt--mE47zWmeT9UA--OkQ_xLa1oi-rXhg2";

function getDates() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-00001&startDate=2016-08-05",
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
        console.log("Date 1: " + datesArray[0]);
        console.log("Date 2: " + datesArray[1]);
        console.log("Date 3: " + datesArray[2]);

        document.getElementById("date1").innerHTML = datesArray[0].substring(0, datesArray[0].length - 9);
        document.getElementById("date2").innerHTML = datesArray[1].substring(0, datesArray[1].length - 9);
        document.getElementById("date3").innerHTML = datesArray[2].substring(0, datesArray[2].length - 9);

        document.getElementById("date1").value = datesArray[0].substring(0, datesArray[0].length - 9);;
        document.getElementById("date2").value = datesArray[1].substring(0, datesArray[1].length - 9);
        document.getElementById("date3").value = datesArray[2].substring(0, datesArray[2].length - 9);
    });
    document.getElementById("location-message").style.display = "none";
    document.getElementById("pickupDate").disabled = false;
}

function enableElectronics() {
    document.getElementById("date-message").style.display = "none";
    document.getElementById("selectElectronics").disabled = false;
}


var expanded = false;

function showCheckboxes() {
    var isElecEnabled = document.getElementById("selectElectronics").disabled;
    if (isElecEnabled == false) {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function replaceAddress() {
    var borough = getUrlVars()["brgh"];
    var building = getUrlVars()["bldg"];
    var street = getUrlVars()["street"];

    borough = borough.replace("+", " ");
    building = building.replace("+", " ");
    street = street.replace("+", " ");
    street = street.substring(0, street.length - 7);

    document.getElementById("buildingNumber").innerHTML = building;
    document.getElementById("streetAddress").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough").innerHTML = borough.toUpperCase();

    document.getElementById("bldg2").value = building;
    document.getElementById("street2").value = street.toUpperCase();
    document.getElementById("brgh2").value = borough.toUpperCase();
}

function fillInfo() {

    // Fill in address information
    var borough = getUrlVars()["brgh2"];
    var building = getUrlVars()["bldg2"];
    var street = getUrlVars()["street2"];

    borough = borough.replace("+", " ");
    building = building.replace("+", " ");
    street = street.replace("+", " ");
    street = street.substring(0, street.length - 7);

    document.getElementById("buildingNumber").innerHTML = building;
    document.getElementById("streetAddress").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough").innerHTML = borough.toUpperCase();

    document.getElementById("buildingNumber2").innerHTML = building;
    document.getElementById("streetAddress2").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough2").innerHTML = borough.toUpperCase();

    // Fill in Pickup location & appointment Date
    var pickupLoc = getUrlVars()["selectLocation"];
    var pickupD = getUrlVars()["pickupDate"];

    document.getElementById("pickupLocation").innerHTML = pickupLoc.toUpperCase();
    document.getElementById("pickupDate").innerHTML = pickupD;

    // Fill in Electronics Category Information
    var numTV = getUrlVars()["televisions"];
    var numComps = getUrlVars()["computers"];
    var numMon = getUrlVars()["monitors"];
    var numEKey = getUrlVars()["keyboards"];
    var numEMice = getUrlVars()["pointers"];
    var numFax = getUrlVars()["printers"]
    var numTVP = getUrlVars()["tvPeripherals"];
    var numVCR = getUrlVars()["vcrs"];
    var numDVR = getUrlVars()["dvrs"];
    var numDVD = getUrlVars()["dvd"];
    var numDCB = getUrlVars()["dcb"];
    var numCable = getUrlVars()["cable"];
    var numXbox = getUrlVars()["xbox"];
    var numSSS = getUrlVars()["sss"];
    var numPD = getUrlVars()["portables"];
    var numIpods = getUrlVars()["ipods"];

    var tv1 = getUrlVars()["tv1"];
    tv1 = tv1.split('+').join(' ');
    var tv2 = getUrlVars()["tv2"];
    tv2 = tv2.split('+').join(' ');
    var tv3 = getUrlVars()["tv3"];
    tv3 = tv3.split('+').join(' ');
    var tv4 = getUrlVars()["tv4"];
    tv4 = tv4.split('+').join(' ');
    var tv5 = getUrlVars()["tv5"];
    tv5 = tv5.split('+').join(' ');

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

    var fName = getUrlVars()["firstName"];
    var lName = getUrlVars()["lastName"];
    var phone = getUrlVars()["phone"];
    var email = getUrlVars()["email"];

    document.getElementById("firstName").innerHTML = fName.toUpperCase();
    document.getElementById("lastName").innerHTML = lName.toUpperCase();
    document.getElementById("phoneNumber").innerHTML = phone.toUpperCase();
    document.getElementById("emailAddress").innerHTML = email.toUpperCase();
}
