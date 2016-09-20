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
    setCookie('bldg_num', bldg, 1);
    setCookie('street', street, 1);
    setCookie('city', brgh, 1);
    setCookie('cs1', document.getElementById('cs1').value, 1);
    setCookie('cs2', document.getElementById('cs2').value, 1);
    setCookie('bbl', document.getElementById('bbl').value, 1);
    setCookie('lat', document.getElementById('lat').value, 1);
    setCookie('lon', document.getElementById('lon').value, 1);
    setCookie('district', document.getElementById('district').value, 1);
    setCookie('zip', document.getElementById('zip').value, 1);
    setCookie('isP1Entered', 'true', 1);
    console.log(getCookie('isP1Entered'));
    window.location.href = '/citizenPageP2.html';
    return true;
}

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
