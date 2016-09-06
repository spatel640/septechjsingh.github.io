function step1Verify() {
    var bldg = document.forms["step12"]["bldg"].value;
    var street = document.forms["step12"]["street"].value;
    var brgh = document.forms["step12"]["brgh"].value;

    if ((bldg == null || bldg == "") && (street == null || street == "")) {
        alert("You cannot continue without filling in a building number & street name.");
        document.getElementById("bldg-message").style.display = "block";
        document.getElementById("street-message").style.display = "block";
    }

    if ((bldg == null || bldg == "") && !(street == null || street == "")) {
        alert("You cannot continue without filling in a building number.");
        document.getElementById("bldg-message").style.display = "block";
        document.getElementById("street-message").style.display = "none";
    }
    if (!(bldg == null || bldg == "") && (street == null || street == "")) {
        alert("You cannot continue without filling in a street name.");
        document.getElementById("street-message").style.display = "block";
        document.getElementById("bldg-message").style.display = "none";
    }
    if (!(bldg == null || bldg == "") && !(street == null || street == "")) {
        document.getElementById("street-message").style.display = "none";
        document.getElementById("bldg-message").style.display = "none";
        displayVerified();
    }
}

function displayVerified() {
    var bldg = String(document.forms["step12"]["bldg"].value);
    var street = String(document.forms["step12"]["street"].value);
    var brgh = String(document.forms["step12"]["brgh"].value);

    if (!(bldg == null || bldg == "") && !(street == null || street == "")) {

        streetURI = encodeURI(street.trim());
        brghURI = encodeURI(brgh.trim());
        numURI = encodeURI(bldg.trim());

        $.ajax({
            url: "https://api.cityofnewyork.us/geoclient/v1/address.json?houseNumber=" + numURI + "&street=" + streetURI + "&borough=" + brghURI + "&app_id=b519ff0c&app_key=8351acab95743febeb729768d1251777",
            dataType: "jsonp",
            jsonpCallback: "logResults"
        });
    }
}

function logResults(json) {
    console.log(json);
    var returnCode = json.address.geosupportReturnCode2;
    hideEverything();
    document.getElementById("street-input").style.border = "";
    document.getElementById("bldg-input").style.border = "";
    document.getElementById("verify-button").style.border = "";
    document.getElementById("geoCode").value = returnCode;

    if (returnCode == "EE") {
        document.getElementById("street-input").style.border = "solid red";
        document.getElementById("address-choices").style.height = "auto";
        document.getElementById("incorrect_address").style.display = "block";
        document.getElementById("incorrect_address").innerHTML = json.address.message2;
        var numSimilar = Number(json.address.numberOfStreetCodesAndNamesInList);
        var streetNames = ["", json.address.streetName1, json.address.streetName2, json.address.streetName3, json.address.streetName4, json.address.streetName5, json.address.streetName6, json.address.streetName7, json.address.streetName8, json.address.streetName9, json.address.streetName10];
        console.log(streetNames);
        for (i = 1; i <= numSimilar; i++) {
            var curr_radio = "add" + String(i);
            var curr_inc = "inc" + String(i);
            var curr_lab = "lab" + String(i);
            document.getElementById(curr_inc).innerHTML = streetNames[i];
            document.getElementById(curr_radio).value = streetNames[i];
            document.getElementById(curr_inc).style.display = "inline-block";
            document.getElementById(curr_radio).style.display = "inline-block";
            document.getElementById(curr_lab).style.display = "inline-block";
        }
        for (i = numSimilar + 1; i <= 10; i++) {
            var curr_radio = "add" + String(i);
            var curr_inc = "inc" + String(i);
            var curr_lab = "lab" + String(i);
            document.getElementById(curr_inc).style.display = "none";
            document.getElementById(curr_radio).style.display = "none";
            document.getElementById(curr_lab).style.display = "none";
        }
    } else if (returnCode == "42" || returnCode == "13") {
        // Address Number out of range.
        document.getElementById("incorrect_address").innerHTML = json.address.message2;
        document.getElementById("address-choices").style.height = "30px";
        document.getElementById("bldg-input").style.border = "solid red";
        document.getElementById("incorrect_address").style.display = "block";
    } else if (returnCode == "00") {
        // Address is correct. Move on Citizen.
        document.getElementById("street-input").style.border = "2px solid green";
        document.getElementById("bldg-input").style.border = "2px solid green";
        document.getElementById("incorrect_address").innerHTML = "Address Verified.";
        document.getElementById("address-choices").style.height = "30px";
        document.getElementById("incorrect_address").style.display = "block";
        document.getElementById("displayVerified").style.display = "block";

        document.getElementById('buildingNumber').innerHTML = json.address.houseNumber;
        document.getElementById('streetAddress').innerHTML = json.address.firstStreetNameNormalized;
        document.getElementById('verifiedBorough').innerHTML = json.address.uspsPreferredCityName;
        document.getElementById('crossStreet1').innerHTML = json.address.highCrossStreetName1;
        document.getElementById('crossStreet2').innerHTML = json.address.lowCrossStreetName1;

        // Update Fields with Correct Address:
        document.getElementById("street-input").value = json.address.firstStreetNameNormalized;
        document.getElementById("bldg-input").value = json.address.houseNumber;
        document.getElementById("cs1").value = json.address.highCrossStreetName1;
        document.getElementById("cs2").value = json.address.lowCrossStreetName1;
        document.getElementById("bbl").value = json.address.bbl;
        document.getElementById("lat").value = json.address.latitude;
        document.getElementById("lon").value = json.address.longitude;
        document.getElementById("district").value = json.address.sanitationDistrict;
        document.getElementById("cityName").value = json.address.uspsPreferredCityName;
        document.getElementById("zip").value = json.address.zipCode;

        getDates();

    } else {
        // No Addresses on this street
        document.getElementById("incorrect_address").innerHTML = json.address.message2;
        document.getElementById("street-input").style.border = "solid red";
        document.getElementById("address-choices").style.height = "30px";
        document.getElementById("incorrect_address").style.display = "block";
    }
}

function hideEverything() {
    for (i = 1; i <= 10; i++) {
        var curr_radio = "add" + String(i);
        var curr_inc = "inc" + String(i);
        var curr_lab = "lab" + String(i);
        document.getElementById(curr_inc).style.display = "none";
        document.getElementById(curr_radio).style.display = "none";
        document.getElementById(curr_lab).style.display = "none";
        document.getElementById("address-choices").style.height = "30px";
    }
}

function updateAdd(inc) {
    var correct_street = document.getElementById(inc).innerHTML;
    document.getElementById("street-input").value = correct_street;
}

function phoneMask() {
    var x = document.getElementById("phone").value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    document.getElementById("phone").value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
}

function phoneVal() {
    var phone = document.getElementById("phone").value;
    if ((phone[0] != '(') || (phone[4] != ')') || (phone[5] != ' ') || (phone[9] != '-')) {
        alert("Please enter valid phone number to continue.");
        return false;
    }
    for (i = 1; i < 4; i++) {
        if (isNaN(phone[i])) {
            alert("Please enter valid phone number to continue.");
            return false;
        }
    }
    for (i = 6; i < 9; i++) {
        if (isNaN(phone[i])) {
            alert("Please enter valid phone number to continue.");
            return false;
        }
    }
    for (i = 10; i <= 13; i++) {
        if (isNaN(phone[i])) {
            alert("Please enter valid phone number to continue.");
            return false;
        }
    }
    return true;
}

function emailVal() {
    var e1 = document.forms["step12"]["email"].value;
    var e2 = document.forms["step12"]["confirmedEmail"].value;

    if (e1 == e2)
        return true;
    alert("Email does not match!");
    return false;
}

function hideElectronicMessage() {
    var isElectronic = electronicsValidate();
    if (isElectronic) {
        document.getElementById("electronic-message").style.display = "none";
    } else {
        document.getElementById("electronic-message").style.display = "block";
    }
}

function hideNamePhoneMessages() {
    var fname = document.forms["step12"]["firstName"].value;
    var lname = document.forms["step12"]["lastName"].value;
    var phone = document.forms["step12"]["phone"].value;

    if (fname != "") {
        document.getElementById("fname-message").style.display = "none";
    }
    if (lname != "") {
        document.getElementById("lname-message").style.display = "none";
    }
    if (phone != "") {
        document.getElementById("phone-message").style.display = "none";
    }
}

function electronicsValidate() {
    var televisions = Number(document.forms["step12"]["televisions"].value);
    var computers = Number(document.forms["step12"]["computers"].value);
    var monitors = Number(document.forms["step12"]["monitors"].value);
    var keyboards = Number(document.forms["step12"]["keyboards"].value);
    var pointers = Number(document.forms["step12"]["pointers"].value);
    var printers = Number(document.forms["step12"]["printers"].value);
    var tvPeripherals = Number(document.forms["step12"]["tvPeripherals"].value);
    var vcrs = Number(document.forms["step12"]["vcrs"].value);
    var dvrs = Number(document.forms["step12"]["dvrs"].value);
    var dvd = Number(document.forms["step12"]["dvd"].value);
    var dcb = Number(document.forms["step12"]["dcb"].value);
    var cable = Number(document.forms["step12"]["cable"].value);
    var xbox = Number(document.forms["step12"]["xbox"].value);
    var sss = Number(document.forms["step12"]["sss"].value);
    var portables = Number(document.forms["step12"]["portables"].value);
    var ipods = Number(document.forms["step12"]["ipods"].value);

    var total = 0 + televisions + computers + monitors + keyboards + pointers + printers + tvPeripherals + vcrs + dvrs + dvd + dcb + cable + sss + portables + ipods;

    if (total == 0) {
        return false;
    }
    return true;
}

function part1Val() {
    var electronics = electronicsValidate();
    var isDate = true;

    date = document.forms["step12"]["pickupDate"].value;

    if (date == "Select An Appointment Date") {
        isDate = false;
    }

    if (!isDate && !electronics) { // FF
        document.getElementById("date-message").style.display = "block";
        document.getElementById("electronic-message").style.display = "block";
        return false;
    }
    if (!isDate && electronics) { // FT
        document.getElementById("date-message").style.display = "block";
        document.getElementById("electronic-message").style.display = "none";
        return false;
    }
    if (isDate && !electronics) { // TF
        document.getElementById("date-message").style.display = "none";
        document.getElementById("electronic-message").style.display = "block";
        return false;
    }
    if (isDate && electronics) { // TT
        document.getElementById("date-message").style.display = "none";
        document.getElementById("electronic-message").style.display = "none";
    }
    return true;
}

function part2Val() {
    var returnable = true;

    var fname = document.forms["step12"]["firstName"].value;
    var lname = document.forms["step12"]["lastName"].value;
    var phone = document.forms["step12"]["phone"].value;

    if (fname == "") {
        document.getElementById("req6").style.display = "inline-block";
        document.getElementById("fname-message").style.display = "block";
        returnable = false;
    }
    if (lname == "") {
        document.getElementById("req6").style.display = "inline-block";
        document.getElementById("req7").style.display = "inline-block";
        document.getElementById("lname-message").style.display = "block";
        returnable = false;
    }
    if (phone == "") {
        document.getElementById("phone-message").style.display = "block";
        returnable = false;
    }
    return returnable;
}

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


function step2Validate() {
    var code = document.getElementById("geoCode").value;
    if (code != "00") {
        alert("Please validate Address before continuing.");
        return false;
    }

    var insp_date = document.getElementById('pickupDate').value;
    var district = document.getElementById('district').value;
    var v = checkScheduleDate(insp_date, district);

    if (v == false) {
        alert("The current appointment date is no longer available. Please pick another one.");
        getDates();
    }

    var w = phoneVal();
    console.log(w);
    var x = part1Val();
    console.log(x);
    var y = part2Val();
    console.log(y);
    var z = emailVal();
    console.log(z);
    if (v && w && x && y && z) {
        cancelIfRe();
        createUpdate();
    } else {
        return (v && w && x && y && x);
    }
}
