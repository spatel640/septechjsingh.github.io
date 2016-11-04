$(function () {
    $("select").multiselect();
});

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

function step2Validate() {
    var w = phoneVal();
    //var x = part1Val();
    var y = part2Val();
    var z = emailVal();
    if (w && y && z) {
        setCookie('pickup_location', document.getElementById('selectLocation').value, 1);
        setCookie('pickupDate', document.getElementById('pickupDate').value, 1);
        setCookie('televisions', document.getElementById('numTV').value, 1);
        setCookie('tv1', document.getElementById('tv1size').value, 1);
        setCookie('tv2', document.getElementById('tv2size').value, 1);
        setCookie('tv3', document.getElementById('tv3size').value, 1);
        setCookie('tv4', document.getElementById('tv4size').value, 1);
        setCookie('tv5', document.getElementById('tv5size').value, 1);
        setCookie('comps', document.getElementById('numComps').value, 1);
        setCookie('mons', document.getElementById('numMon').value, 1);
        setCookie('keys', document.getElementById('numEKey').value, 1);
        setCookie('mice', document.getElementById('numEMice').value, 1);
        setCookie('fax', document.getElementById('numFax').value, 1);
        setCookie('tvp', document.getElementById('numTVP').value, 1);
        setCookie('vcr', document.getElementById('numVCR').value, 1);
        setCookie('dvr', document.getElementById('numDVR').value, 1);
        setCookie('dvd', document.getElementById('numDVD').value, 1);
        setCookie('dcb', document.getElementById('numDCB').value, 1);
        setCookie('cable', document.getElementById('numCable').value, 1);
        setCookie('xbox', document.getElementById('numXbox').value, 1);
        setCookie('sss', document.getElementById('numSSS').value, 1);
        setCookie('pd', document.getElementById('numPD').value, 1);
        setCookie('ipods', document.getElementById('numIpods').value, 1);
        setCookie('firstName', document.getElementById('first-name').value, 1);
        setCookie('lastName', document.getElementById('last-name').value, 1);
        setCookie('phone', document.getElementById('phone').value, 1);
        setCookie('email', document.getElementById('email').value, 1);
        window.location.href = '/citizenPageP3.html';
        return true;
    }
}

function loadAddress() {
    var bldg = getCookie('bldg_num');
    var street = getCookie('street');
    var city = getCookie('city');
    var cs1 = getCookie('cs1');
    var cs2 = getCookie('cs2');

    document.getElementById("buildingNumber").innerHTML = bldg;
    document.getElementById("streetAddress").innerHTML = street;
    document.getElementById("verifiedBorough").innerHTML = city.toUpperCase();
    document.getElementById("crossStreets1").innerHTML = cs1;
    document.getElementById("crossStreets2").innerHTML = cs2;
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

function getDates() {
    /*
    var now = moment();
    var d = new Date();
    var n = d.getHours();

    if (n >= 12) {
        now.add(1, 'days');
    }

    var temp = now.format('YYYY MM DD').toString();
    var date2Pass = temp[0] + temp[1] + temp[2] + temp[3] + '-' + temp[5] + temp[6] + '-' + temp[8] + temp[9];

    var district = getCookie('district');

    var myUrl1 = "http://10.30.5.142:3000/dates/501/" + date2Pass;
    var myUrl2 = "http://10.30.5.142:3000/dates/502/" + date2Pass;
    var myUrl3 = "http://10.30.5.142:3000/dates/503/" + date2Pass;

    var myUrl = "";

    if (district == "501")
        myUrl = myUrl1;
    else if (district == "502")
        myUrl = myUrl2;
    else
        myUrl = myUrl3;

    console.log(myUrl);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": myUrl,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "2b42eb30-50a4-61dd-4153-9de32a983d81"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var datesArray = response.result;

        var i = 0;
        for (i = 0; i < 14; i++) {
            var dateString = "date" + (i + 1);
            document.getElementById(dateString).innerHTML = datesArray[i].substring(0, datesArray[i].length - 9);
            document.getElementById(dateString).value = datesArray[i].substring(0, datesArray[i].length - 9);
            console.log(dateString + " " + datesArray[i].substring(0, datesArray[i].length - 9));
        }
    });
    */

    for (i = 0; i < 14; i++) {
        var dateString = "date" + (i + 1);
        document.getElementById(dateString).innerHTML = "11/" + (i + 1) + "/2016";
        document.getElementById(dateString).value = "11/" + (i + 1) + "/2016";
    }

    document.getElementById("location-message").style.display = "none";
    document.getElementById("pickupDate").disabled = false;
}

function enableElectronics() {
    document.getElementById("date-message").style.display = "none";
    document.getElementById("selectElectronics").disabled = false;
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
