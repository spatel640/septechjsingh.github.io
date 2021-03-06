$(function () {
    $("select").multiselect();
});

function enableBorough() {
    document.getElementById("brgh").disabled = false;
}

var auth_token = "59r-PglhQFAdNlK3d7Ac7z9Dj0p_Ai_Htg2vMekxmlcDdh2pqCk7ToTdpqs4GEzS4TfnkKWeyN754S_66XvmN8JR-ssPuXFEgOBE6sAGB5fzbzgzJuGoW1MYPufojVDbDVezHD17b1C6KLe9fHgkLhiJHA3YeiiYQtW5yCD5GH-h8iF0is1aNQOZCJXUfEqWDW1pIc5sqn3DvOKU1C35c2mmmaai7V9DHhpWWHFqqc77J-52gswtPtcKlZrNK_A7147fmjo4GbUiilAd_z0H14dJE1tf3KuVo4IrFNIShUVYyHrRjrRg8rIvNegT2c_uO3BDljc2dUAsTOC333ZvoqPmggFx7jNxDFEJkFq5mrOLOmZtFQ9_eSlXPewxVuYVq-f7qAzcjRvQZetGw56wsd_-rtTG2CU09NoXHctvlnE_9XpuqOe8XUBP4GogDfyWGMhuQ5iYs1eHn4A4HeOVN15S55qqC9lAnhVRuc1PeLI1";

function gotoStart() {
    window.location.href = '/citizenPage.html';
}

function page1InfoRecap() {
    $('#submit-address').prop('disabled', true);
    var bldg2 = getUrlVars()["bldg2"];
    if (bldg2 == null || bldg2 == undefined || bldg2 == "") {

        var building = getUrlVars()["bldg"];
        var street = getUrlVars()["street"];

        var address = getUrlVars()["address"];
        if (address == null || address == undefined || address == "") {
            street = street.substr(0, street.length - 2);
        }

        building = building.split('+').join(' ');
        street = street.split('+').join(' ');

        document.getElementById("bldg-input").value = building;
        document.getElementById("street-input").value = street;
    } else {
        var building = getUrlVars()["bldg2"];
        var street = getUrlVars()["street2"];

        building = building.split('+').join(' ');
        street = street.substr(0, street.length - 2);
        street = street.split('+').join(' ');

        document.getElementById("bldg-input").value = building;
        document.getElementById("street-input").value = street;
    }
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
        document.getElementById(dateString).innerHTML = "11-" + (i + 5) + "-2016";
        document.getElementById(dateString).value = "11-" + (i + 5) + "-2016";
    }

    document.getElementById("location-message").style.display = "none";
    document.getElementById("pickupDate").disabled = false;

    var x = window.location.href;
    var isBldg2 = getUrlVars()["bldg2"];

    if (isBldg2 != null && isBldg2 != undefined && isBldg2 != "") {
        var borough = getUrlVars()["brgh2"];
        var building = getUrlVars()["bldg2"];
        var street = getUrlVars()["street2"];

        var cs1 = getUrlVars()["cs12"];
        var cs2 = getUrlVars()["cs22"];
        var bbl = getUrlVars()["bbl2"];
        var district = getUrlVars()["district2"];
        var lat = getUrlVars()["lat2"];
        var lon = getUrlVars()["lon2"];
        var cityName = getUrlVars()["cityName2"];
        var zip = getUrlVars()["zip2"];

        cs1 = cs1.split('+').join(' ');
        cs2 = cs2.split('+').join(' ');

        document.getElementById("cs12").value = cs1;
        document.getElementById("cs22").value = cs2;
        document.getElementById("bbl2").value = bbl;
        document.getElementById("district2").value = district;
        document.getElementById("lat2").value = lat;
        document.getElementById("lon2").value = lon;
        document.getElementById("cityName2").value = cityName.split('+').join(' ');
        document.getElementById("zip2").value = zip;

        borough = borough.split('+').join(' ');
        building = building.split('+').join(' ');
        street = street.substr(0, street.length - 7);
        street = street.split('+').join(' ');

        document.getElementById("buildingNumber").innerHTML = building;
        document.getElementById("streetAddress").innerHTML = street.toUpperCase();
        document.getElementById("verifiedBorough").innerHTML = borough.toUpperCase();

        document.getElementById("crossStreets1").innerHTML = cs1;
        document.getElementById("crossStreets2").innerHTML = cs2;

        document.getElementById("bldg2").value = building;
        document.getElementById("street2").value = street.toUpperCase();
        document.getElementById("brgh2").value = borough.toUpperCase();

        var firstName = getUrlVars()["firstName"];
        var lastName = getUrlVars()["lastName"];
        var phone = getUrlVars()["phone"];
        var email = getUrlVars()["email"];
        var confirmed = getUrlVars()["confirmedEmail"];

        var phone2 = "(" + phone[3] + phone[4] + phone[5] + ") " + phone[10] + phone[11] + phone[12] + phone[13] + phone[14] + phone[15] + phone[16] + phone[17];

        document.getElementById("first-name").value = firstName;
        document.getElementById("last-name").value = lastName;
        document.getElementById("phone").value = phone2;
        document.getElementById("email").value = email.replace("%40", "@");
        document.getElementById("confirm-email").value = confirmed.replace("%40", "@");
    }

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
    var address = getUrlVars()["address"];
    var cs1 = getUrlVars()["cs1"];
    var cs2 = getUrlVars()["cs2"];
    var bbl = getUrlVars()["bbl"];
    var district = getUrlVars()["district"];
    var lat = getUrlVars()["lat"];
    var lon = getUrlVars()["lon"];
    var cityName = getUrlVars()["cityName"];
    var zip = getUrlVars()["zip"];

    if (address == null || address == undefined || address == "") {
        street = street.substr(0, street.length - 7);
    }

    borough = borough.split('+').join(' ');
    building = building.split('+').join(' ');
    cs1 = cs1.split('+').join(' ');
    cs2 = cs2.split('+').join(' ');
    street = street.split('+').join(' ');

    document.getElementById("buildingNumber").innerHTML = building;
    document.getElementById("streetAddress").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough").innerHTML = borough.toUpperCase();
    document.getElementById("crossStreets1").innerHTML = cs1;
    document.getElementById("crossStreets2").innerHTML = cs2;

    document.getElementById("bldg2").value = building;
    document.getElementById("street2").value = street.toUpperCase();
    document.getElementById("brgh2").value = borough.toUpperCase();
    document.getElementById("cs12").value = cs1;
    document.getElementById("cs22").value = cs2;
    document.getElementById("bbl2").value = bbl;
    document.getElementById("district2").value = district;
    document.getElementById("lat2").value = lat;
    document.getElementById("lon2").value = lon;
    document.getElementById("cityName2").value = cityName.split('+').join(' ');
    document.getElementById("zip2").value = zip;
}

function fillInfo() {

    // Fill in address information
    var borough = getUrlVars()["brgh2"];
    var building = getUrlVars()["bldg2"];
    var street = getUrlVars()["street2"];
    var cs1 = getUrlVars()["cs12"];
    var cs2 = getUrlVars()["cs22"];

    var bbl = getUrlVars()["bbl2"];
    var district = getUrlVars()["district2"];
    var lat = getUrlVars()["lat2"];
    var lon = getUrlVars()["lon2"];
    var cityName = getUrlVars()["cityName2"];
    var zip = getUrlVars()["zip2"];

    document.getElementById("bbl3").value = bbl;
    document.getElementById("district3").value = district;
    document.getElementById("lat3").value = lat;
    document.getElementById("lon3").value = lon;
    document.getElementById("cityName3").value = cityName.split('+').join(' ');
    document.getElementById("zip3").value = zip;

    borough = borough.replace("+", " ");
    building = building.split('+').join(' ');
    cs1 = cs1.split('+').join(' ');
    cs2 = cs2.split('+').join(' ');
    street = street.substr(0, street.length - 7);
    street = street.split('+').join(' ');

    document.getElementById("buildingNumber").innerHTML = building;
    document.getElementById("streetAddress").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough").innerHTML = borough.toUpperCase();
    document.getElementById("crossStreet1").innerHTML = cs1;
    document.getElementById("crossStreet2").innerHTML = cs2;

    document.getElementById("buildingNumber2").innerHTML = building;
    document.getElementById("streetAddress2").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough2").innerHTML = borough.toUpperCase();
    document.getElementById("CrossStreet1").innerHTML = cs1;
    document.getElementById("CrossStreet2").innerHTML = cs2;

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

    var phone2 = "(" + phone[3] + phone[4] + phone[5] + ") " + phone[10] + phone[11] + phone[12] + phone[13] + phone[14] + phone[15] + phone[16] + phone[17];

    document.getElementById("firstName").innerHTML = fName.toUpperCase();
    document.getElementById("lastName").innerHTML = lName.toUpperCase();
    document.getElementById("phoneNumber").innerHTML = phone2;
    document.getElementById("emailAddress").innerHTML = email.replace("%40", "@");
}
