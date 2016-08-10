function step1Validate() {
    var bldg = document.forms["step1"]["bldg"].value;
    var street = document.forms["step1"]["street"].value;

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
    return true;
}

function step2Validate() {
    var x = part1Val();
    var y = part2Val();
    var z = emailVal();
    return (x && y && z)
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
