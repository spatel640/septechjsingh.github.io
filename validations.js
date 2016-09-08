function hideBldg() {
    var bldg = document.forms["step1"]["bldg"].value;
    if (bldg != null || bldg != "") {
        document.getElementById("bldg-message").style.display = "none";
        document.getElementById("verify-button").style.border = "2px solid red";
    }
    document.getElementById("geoCode").value = "";
}

function hideStreet() {
    var street = document.forms["step1"]["street"].value;
    if (street != "" || street != null) {
        document.getElementById("street-message").style.display = "none";
        document.getElementById("verify-button").style.border = "2px solid red";
    }
    document.getElementById("geoCode").value = "";
}

function step1Validate() {
    var bldg = document.forms["step1"]["bldg"].value;
    var street = document.forms["step1"]["street"].value;
    var brgh = document.forms["step1"]["brgh"].value;

    if ((bldg == null || bldg == "") && (street == null || street == "")) {
        alert("You cannot continue without filling in a building number & street name.");
        document.getElementById("bldg-message").style.display = "block";
        document.getElementById("street-message").style.display = "block";
        return false;
    }

    if ((bldg == null || bldg == "") && !(street == null || street == "")) {
        alert("You cannot continue without filling in a building number.");
        document.getElementById("bldg-message").style.display = "block";
        document.getElementById("street-message").style.display = "none";
        return false;
    }
    if (!(bldg == null || bldg == "") && (street == null || street == "")) {
        alert("You cannot continue without filling in a street name.");
        document.getElementById("street-message").style.display = "block";
        document.getElementById("bldg-message").style.display = "none";
        return false;
    }
    var geoCode = document.getElementById("geoCode").value;
    if (geoCode != "00") {
        document.getElementById("incorrect_address").innerHTML = "Please make sure the address is valid before continuing.";
        document.getElementById("street-input").style.border = "solid red";
        document.getElementById("bldg-input").style.border = "solid red";
        document.getElementById("address-choices").style.height = "30px";
        document.getElementById("incorrect_address").style.display = "block";
        return false;
    }
    return true;
}

function step2Validate() {
    var w = phoneVal();
    var x = part1Val();
    var y = part2Val();
    var z = emailVal();
    return (w && x && y && z);
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
    var e1 = document.forms["step2"]["email"].value;
    var e2 = document.forms["step2"]["confirmedEmail"].value;

    if (e1 == e2)
        return true;
    alert("Email does not match!");
    return false;
}

function hideNamePhoneMessages() {
    var fname = document.forms["step2"]["firstName"].value;
    var lname = document.forms["step2"]["lastName"].value;
    var phone = document.forms["step2"]["phone"].value;

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

function part2Val() {
    var returnable = true;

    var fname = document.forms["step2"]["firstName"].value;
    var lname = document.forms["step2"]["lastName"].value;
    var phone = document.forms["step2"]["phone"].value;

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

function part1Val() {
    var electronics = electronicsValidate();
    var isLocation = true;
    var isDate = true;

    var location = document.forms["step2"]["selectLocation"].value;
    var date = document.forms["step2"]["pickupDate"].value;

    if (location == "Select Location") {
        isLocation = false;
    }
    if (date == "Select An Appointment Date") {
        isDate = false;
    }

    if (!isDate && !isLocation && !electronics) { // FFF
        document.getElementById("date-message").style.display = "block";
        document.getElementById("location-message").style.display = "block";
        document.getElementById("electronic-message").style.display = "block";
        return false;
    }
    if (!isDate && !isLocation && electronics) { // FFT
        document.getElementById("date-message").style.display = "block";
        document.getElementById("location-message").style.display = "block";
        document.getElementById("electronic-message").style.display = "none";
        return false;
    }
    if (!isDate && isLocation && electronics) { // FTT
        document.getElementById("date-message").style.display = "block";
        document.getElementById("location-message").style.display = "none";
        document.getElementById("electronic-message").style.display = "none";
        return false;
    }
    if (!isDate && isLocation && !electronics) { // FTF
        document.getElementById("date-message").style.display = "block";
        document.getElementById("location-message").style.display = "none";
        document.getElementById("electronic-message").style.display = "block";
        return false;
    }
    if (isDate && !isLocation && !electronics) { // TFF
        document.getElementById("date-message").style.display = "none";
        document.getElementById("location-message").style.display = "block";
        document.getElementById("electronic-message").style.display = "block";
        return false;
    }
    if (isDate && !isLocation && electronics) { // TFT
        document.getElementById("date-message").style.display = "none";
        document.getElementById("location-message").style.display = "block";
        document.getElementById("electronic-message").style.display = "none";
        return false;
    }
    if (isDate && isLocation && !electronics) { // TTF
        document.getElementById("date-message").style.display = "none";
        document.getElementById("location-message").style.display = "none";
        document.getElementById("electronic-message").style.display = "block";
        return false;
    }
    return true;
}

function electronicsValidate() {
    var televisions = Number(document.forms["step2"]["televisions"].value);
    var computers = Number(document.forms["step2"]["computers"].value);
    var monitors = Number(document.forms["step2"]["monitors"].value);
    var keyboards = Number(document.forms["step2"]["keyboards"].value);
    var pointers = Number(document.forms["step2"]["pointers"].value);
    var printers = Number(document.forms["step2"]["printers"].value);
    var tvPeripherals = Number(document.forms["step2"]["tvPeripherals"].value);
    var vcrs = Number(document.forms["step2"]["vcrs"].value);
    var dvrs = Number(document.forms["step2"]["dvrs"].value);
    var dvd = Number(document.forms["step2"]["dvd"].value);
    var dcb = Number(document.forms["step2"]["dcb"].value);
    var cable = Number(document.forms["step2"]["cable"].value);
    var xbox = Number(document.forms["step2"]["xbox"].value);
    var sss = Number(document.forms["step2"]["sss"].value);
    var portables = Number(document.forms["step2"]["portables"].value);
    var ipods = Number(document.forms["step2"]["ipods"].value);

    var total = 0 + televisions + computers + monitors + keyboards + pointers + printers + tvPeripherals + vcrs + dvrs + dvd + dcb + cable + sss + portables + ipods;

    if (total == 0) {
        return false;
    }
    return true;
}

function hideElectronicMessage() {
    var isElectronic = electronicsValidate();
    if (isElectronic) {
        document.getElementById("electronic-message").style.display = "none";
    } else {
        document.getElementById("electronic-message").style.display = "block";
    }
}

function phoneMask() {
    var x = document.getElementById("phone").value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    document.getElementById("phone").value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
}

function reverseInfo() {
    var x = window.location.href;
    alert(x);
    var n = x.length;
    alert(n);
}

function addressCheck() {
    var bldg = String(document.forms["step1"]["bldg"].value);
    var street = String(document.forms["step1"]["street"].value);
    var brgh = String(document.forms["step1"]["brgh"].value);

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
        document.getElementById('submit-address').disabled = false;
        // Address is correct. Move on Citizen.
        document.getElementById("street-input").style.border = "2px solid green";
        document.getElementById("bldg-input").style.border = "2px solid green";
        document.getElementById("incorrect_address").innerHTML = "Address Verified.";
        document.getElementById("address-choices").style.height = "30px";
        document.getElementById("incorrect_address").style.display = "block";

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
    } else {
        // No Addresses on this street
        document.getElementById("incorrect_address").innerHTML = json.address.message2;
        document.getElementById("street-input").style.border = "solid red";
        document.getElementById("address-choices").style.height = "30px";
        document.getElementById("incorrect_address").style.display = "block";
    }
}

function updateAdd(inc) {
    var correct_street = document.getElementById(inc).innerHTML;
    document.getElementById("street-input").value = correct_street;
    document.getElementById("street-input").style.border = "";
    hideEverything();
    document.getElementById("verify-button").style.border = "2px solid red";
}

function hideEverything() {
    for (i = 1; i <= 10; i++) {
        var curr_radio = "add" + String(i);
        var curr_inc = "inc" + String(i);
        var curr_lab = "lab" + String(i);
        document.getElementById(curr_inc).style.display = "none";
        document.getElementById(curr_radio).style.display = "none";
        document.getElementById(curr_lab).style.display = "none";
        document.getElementById("incorrect_address").innerHTML = "";
        document.getElementById("address-choices").style.height = "0px";
    }
}
