$(function () {
    $("select").multiselect();
});

var auth_token = "n32j-1-__E5_v7qZ-iC6VACDkCcXLpQJBFdH0pnoupEX6XDcGsJC3NH_JXU9jxIQ4DfQf7r4wwsyk1G_GRogqn3mc1BRmu1lZqHSsR27W9k6XhAUbTz2XV5lzfZUK-UOfg79ujWiV3J2f07bpzJ_a121geRhljvK1CTvD53dH5PDvdmIlfDg9AmHucKNwguSU-jmibWYxfO7Oc3inU8smcgw15ee6w9EyWthBxSFgYrUjv3YNTl1MNMiHThrZF2C65HprjY4x24vTWBGs0bu_Qvtg9j80AVZsrx4CqwUJL6WRi-yolBpn_M8D8DiUCEkvgSUt1CaJ1n2xzmJbG6i7uMkh987C1uBg0UpQKoPZyboOrYNeResAia1BSl_vcJFzZ5Bg98gIDd69UQJ5BYTRuBBUpq7fpATv5ZsWQOAaW5_vd29zlTdXuOX07gfJCj24HCXwXo8h4zLLaa0Mj0ZVw69k4PUFByah60vUuQJMmU1";

function getDates() {
    var now = moment();
    var d = new Date();
    var n = d.getHours();

    if (n >= 12) {
        now.add(1, 'days');
    }

    var temp = now.format('YYYY MM DD').toString();
    var date2Pass = temp[0] + temp[1] + temp[2] + temp[3] + '-' + temp[5] + temp[6] + '-' + temp[8] + temp[9];

    var district = document.getElementById("district").value;
    console.log(district);

    var myUrl1 = "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-0002O&startDate=" + date2Pass + "&validateScheduleNumOfDays=true";
    var myUrl2 = "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-0002P&startDate=" + date2Pass + "&validateScheduleNumOfDays=true";
    var myUrl3 = "https://apis.accela.com/v4/inspections/availableDates?recordId=PARTNER-16CAP-00000-0002Q&startDate=" + date2Pass + "&validateScheduleNumOfDays=true";

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


function fillInfo() {

    // Fill in address information
    var borough = getUrlVars()["brgh"];
    var building = getUrlVars()["bldg"];
    var street = getUrlVars()["street"];

    var cs1 = getUrlVars()["cs1"];
    var cs2 = getUrlVars()["cs2"];
    var bbl = getUrlVars()["bbl"];
    var district = getUrlVars()["district"];
    var lat = getUrlVars()["lat"];
    var lon = getUrlVars()["lon"];
    var cityName = getUrlVars()["cityName"];
    var zip = getUrlVars()["zip"];

    cs1 = cs1.split('+').join(' ');
    cs2 = cs2.split('+').join(' ');
    borough = borough.split('+').join(' ');
    building = building.split('+').join(' ');
    street = street.split('+').join(' ');

    document.getElementById("buildingNumber2").innerHTML = building;
    document.getElementById("streetAddress2").innerHTML = street.toUpperCase();
    document.getElementById("verifiedBorough2").innerHTML = borough.toUpperCase();
    document.getElementById("CrossStreet1").innerHTML = cs1;
    document.getElementById("CrossStreet2").innerHTML = cs2;

    document.getElementById("bbl3").value = bbl;
    document.getElementById("district3").value = district;
    document.getElementById("lat3").value = lat;
    document.getElementById("lon3").value = lon;
    document.getElementById("cityName3").value = cityName.split('+').join(' ');
    document.getElementById("zip3").value = zip;

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
