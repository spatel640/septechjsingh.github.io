var authorize = auth_token;

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

function search() {

    var myCustomId = document.getElementById("search-text").value.trim();
    var capId = "";

    setCookie("aloha", myCustomId, 1);

    // Get the Cap Id:
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records?customId=" + myCustomId,
        "method": "GET",
        "headers": {
            "authorization": authorize,
            "cache-control": "no-cache",
            "postman-token": "19266117-50eb-ad4d-0eb5-31ed6dd876e8"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        capId = response.result[0].id;
        console.log(capId);
    });


    var televisions, computers, monitors, keyboards, mice, fax, peripherals, vcrs, dvrs, dvd, dcb, cable, xbox, sss, portables, ipods = 0;
    var tv32, tv43, tv49, tv59, tv69, tv70;
    document.getElementById("srNumber").innerHTML = myCustomId;
    var firstName;
    var lastName;
    var phoneNumber;
    var email;

    setCookie("capCookie", capId, 1);

    // Get the Contact Information
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "/contacts",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": authorize,
            "cache-control": "no-cache",
            "postman-token": "63042cf8-346e-57e7-eb14-e16956b3c997"
        },
        "processData": false,
        "data": ""
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        firstName = response.result[0].firstName;
        lastName = response.result[0].lastName;
        phoneNumber = response.result[0].phone3;
        email = response.result[0].email;

        setCookie("firstName", firstName, 1);
        setCookie("lastName", lastName, 1);
        setCookie("phoneNumber", phoneNumber, 1);
        if (email == "" || email == undefined || email == null) {
            email = "";
        }
        setCookie("email", email, 1);
    });

    document.getElementById("firstName22").innerHTML = firstName;
    document.getElementById("lastName22").innerHTML = lastName;
    document.getElementById("phoneNumber22").innerHTML = phoneNumber;
    document.getElementById("emailAddress22").innerHTML = email;

    // Get the Custom Forms Data
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "/customForms",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": authorize,
            "cache-control": "no-cache",
            "postman-token": "3df01117-52d4-a291-4621-ffd974d6c370"
        },
        "processData": false,
        "data": ""
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        tv32 = Number(response.result[0]["32 Inches & Under"]) + 0;
        tv43 = Number(response.result[0]["33 to 43 Inches"]) + 0;
        tv49 = Number(response.result[0]["44 to 49 Inches"]) + 0;
        tv59 = Number(response.result[0]["50 to 59 Inches"]) + 0;
        tv69 = Number(response.result[0]["60 to 69 Inches"]) + 0;
        tv70 = Number(response.result[0]["70 Inches & Up"]) + 0;
        computers = Number(response.result[1]["Computer peripherals, including any permanently attached cable or wiring"]) + 0;
        monitors = Number(response.result[1]["Monitors, Laptops"]) + 0;
        keyboards = Number(response.result[1]["Electronic keyboards"]) + 0;
        mice = Number(response.result[1]["Electronic mice and other pointing devices"]) + 0;
        fax = Number(response.result[1]["Fax machines, document scanners, and printers that weigh less than 100lbs"]) + 0;
        peripherals = Number(response.result[1]["TV Peripherals, including any permanently attached cable or wiring"]) + 0;
        vcrs = Number(response.result[1]["VCRs"]) + 0;
        dvrs = Number(response.result[1]["Digital video recorders"]) + 0;
        dvd = Number(response.result[1]["DVD players"]) + 0;
        dcb = Number(response.result[1]["Digital converter boxes"]) + 0;
        cable = Number(response.result[1]["Cable or satellite receivers"]) + 0;
        xbox = Number(response.result[1]["Electronic or video game consoles"]) + 0;
        sss = Number(response.result[1]["Small scale servers"]) + 0;
        portables = Number(response.result[1]["Portable devices, including any permanently attached cable or wiring"]) + 0;
        ipods = Number(response.result[1]["Portable digital music players"]) + 0;

        setCookie("computers", computers, 1);
        setCookie("monitors", monitors, 1);
        setCookie("keyboards", keyboards, 1);
        setCookie("mice", mice, 1);
        setCookie("fax", fax, 1);
        setCookie("peripherals", peripherals, 1);
        setCookie("vcrs", vcrs, 1);
        setCookie("dvrs", dvrs, 1);
        setCookie("dvd", dvd, 1);
        setCookie("dcb", dcb, 1);
        setCookie("cable", cable, 1);
        setCookie("xbox", xbox, 1);
        setCookie("sss", sss, 1);
        setCookie("portables", portables, 1);
        setCookie("ipods", ipods, 1);

        console.log("Number of monitors: " + monitors);
    });

    if (ipods == 0) {
        document.getElementById("ipod22").style.display = "none";
    } else {
        document.getElementById("numIpods2").innerHTML = ipods;
    }

    if (portables == 0) {
        document.getElementById("pd22").style.display = "none";
    } else {
        document.getElementById("numPD2").innerHTML = portables;
    }

    if (sss == 0) {
        document.getElementById("sss22").style.display = "none";
    } else {
        document.getElementById("numSSS2").innerHTML = sss;
    }

    if (xbox == 0) {
        document.getElementById("xbox22").style.display = "none";
    } else {
        document.getElementById("numXbox2").innerHTML = xbox;
    }

    if (cable == 0) {
        document.getElementById("cable22").style.display = "none";
    } else {
        document.getElementById("numCable2").innerHTML = cable;
    }

    if (dcb == 0) {
        document.getElementById("dcb22").style.display = "none";
    } else {
        document.getElementById("numDCB2").innerHTML = dcb;
    }

    if (dvd == 0) {
        document.getElementById("dvd22").style.display = "none";
    } else {
        document.getElementById("numDVD2").innerHTML = dvd;
    }

    if (dvrs == 0) {
        document.getElementById("dvr22").style.display = "none";
    } else {
        document.getElementById("numDVR2").innerHTML = dvrs;
    }

    if (vcrs == 0) {
        document.getElementById("vcr22").style.display = "none";
    } else {
        document.getElementById("numVCR2").innerHTML = vcrs;
    }

    if (peripherals == 0) {
        document.getElementById("tvp22").style.display = "none";
    } else {
        document.getElementById("numTVP2").innerHTML = peripherals;
    }

    if (fax == 0) {
        document.getElementById("fax22").style.display = "none";
    } else {
        document.getElementById("numFax2").innerHTML = fax;
    }

    if (mice == 0) {
        document.getElementById("emice22").style.display = "none";
    } else {
        document.getElementById("numEMice2").innerHTML = mice;
    }

    if (keyboards == 0) {
        document.getElementById("ekey22").style.display = "none";
    } else {
        document.getElementById("numEKey2").innerHTML = keyboards;
    }

    if (monitors == 0) {
        document.getElementById("mon22").style.display = "none";
    } else {
        document.getElementById("numMon2").innerHTML = monitors;
    }

    if (computers == 0) {
        document.getElementById("comps22").style.display = "none";
    } else {
        document.getElementById("numComps2").innerHTML = computers;
    }

    televisions = tv32 + tv43 + tv49 + tv59 + tv69 + tv70;
    console.log("Number of televisions: " + televisions);
    if (televisions < 1) {
        document.getElementById("tv11").style.display = "none";
        document.getElementById("tv22").style.display = "none";
        document.getElementById("tv33").style.display = "none";
        document.getElementById("tv44").style.display = "none";
        document.getElementById("tv55").style.display = "none";
        document.getElementById("tv66").style.display = "none";
        document.getElementById('numTelevisions2').style.display = "none";
    } else {
        document.getElementById("numTV2").innerHTML = televisions;
        if (tv32 == 0) {
            document.getElementById("tv11").style.display = "none";
        } else {
            console.log("Num 32 TVs: " + tv32);
            document.getElementById("tv1size").innerHTML = tv32;
        }
        if (tv43 == 0) {
            document.getElementById("tv22").style.display = "none";
        } else {
            document.getElementById("tv2size").innerHTML = tv43;
        }
        if (tv49 == 0) {
            document.getElementById("tv33").style.display = "none";
        } else {
            document.getElementById("tv3size").innerHTML = tv49;
        }
        if (tv59 == 0) {
            document.getElementById("tv44").style.display = "none";
        } else {
            document.getElementById("tv4size").innerHTML = tv59;
        }
        if (tv69 == 0) {
            document.getElementById("tv55").style.display = "none";
        } else {
            document.getElementById("tv5size").innerHTML = tv69;
        }
        if (tv70 == 0) {
            document.getElementById("tv66").style.display = "none";
        } else {
            document.getElementById("tv6size").innerHTML = tv70;
        }
    }

    // Get the address
    var streetStart, streetName, pickupLocation, streetType, crossS;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "/addresses",
        "method": "GET",
        "headers": {
            "authorization": authorize,
            "cache-control": "no-cache",
            "postman-token": "b5173935-1c6b-168d-9c3e-74bb91660083"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        streetStart = response.result[0].streetStart;
        streetName = response.result[0].streetName;
        crossS = response.result[0].secondaryStreet;
        pickupLocation = "Curb";

        setCookie("streetStart", streetStart, 1);
        setCookie("streetName", streetName, 1);
    });

    document.getElementById("buildingNumber22").innerHTML = streetStart;
    document.getElementById("streetAddress22").innerHTML = streetName;
    document.getElementById("pickupLocation22").innerHTML = pickupLocation;
    document.getElementById('crossS').innerHTML = crossS;
    document.getElementById("myModal").style.display = "block";

    // Get Inspection Date
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "/inspections",
        "method": "GET",
        "headers": {
            "authorization": authorize,
            "cache-control": "no-cache",
            "postman-token": "bb993a40-3687-403e-cc05-d953547bff10"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var insp_date = response.result[0].scheduleDate;
        document.getElementById('pickupDate22').innerHTML = insp_date;
    });
}

function closeThisBox() {
    document.getElementById("myModal").style.display = "none";
}

function cancelRequest() {
    var capId = getCookie("capCookie");
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "",
        "method": "DELETE",
        "headers": {
            "authorization": authorize,
            "cache-control": "no-cache",
            "postman-token": "9ae328fd-902c-72f9-9091-8ecca1c1526e"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    document.getElementById("myModal").style.display = "none";
}


function reschedule() {
    setCookie("resched", "true", 1);
    window.location.href = '/311Page.html';
}

function displayItem2(keyword) {
    if (keyword == "one") {
        document.getElementById("televisions").style.display = "block";
    }
    if (keyword == "two") {
        document.getElementById("computers").style.display = "block";
    }
    if (keyword == "three") {
        document.getElementById("monitors").style.display = "block";
    }
    if (keyword == "four") {
        document.getElementById("keyboards").style.display = "block";
    }
    if (keyword == "five") {
        document.getElementById("pointers").style.display = "block";
    }
    if (keyword == "six") {
        document.getElementById("printers").style.display = "block";
    }
    if (keyword == "seven") {
        document.getElementById("tvPeripherals").style.display = "block";
    }
    if (keyword == "eight") {
        document.getElementById("vcrs").style.display = "block";
    }
    if (keyword == "nine") {
        document.getElementById("dvrs").style.display = "block";
    }
    if (keyword == "ten") {
        document.getElementById("dvd").style.display = "block";
    }
    if (keyword == "eleven") {
        document.getElementById("dcb").style.display = "block";
    }
    if (keyword == "twelve") {
        document.getElementById("cable").style.display = "block";
    }
    if (keyword == "thirteen") {
        document.getElementById("xbox").style.display = "block";
    }
    if (keyword == "fourteen") {
        document.getElementById("sss").style.display = "block";
    }
    if (keyword == "fifteen") {
        document.getElementById("portables").style.display = "block";
    }
    if (keyword == "sixteen") {
        document.getElementById("ipods").style.display = "block"
    }

    var x = Number(document.getElementById("numItems").innerHTML);
    x++;
    document.getElementById("numItems").innerHTML = x;
}

function hideItem2(keyword) {
    if (keyword == "one") {
        document.getElementById("televisions").style.display = "none";
        document.getElementById("numTV").value = "";
        document.getElementById("tv1").style.display = "none";
        document.getElementById("tv2").style.display = "none";
        document.getElementById("tv3").style.display = "none";
        document.getElementById("tv4").style.display = "none";
        document.getElementById("tv5").style.display = "none";
    }
    if (keyword == "two") {
        document.getElementById("computers").style.display = "none";
        document.getElementById("numComps").value = "";
    }
    if (keyword == "three") {
        document.getElementById("monitors").style.display = "none";
        document.getElementById("numMon").value = "";
    }
    if (keyword == "four") {
        document.getElementById("keyboards").style.display = "none";
        document.getElementById("numEKey").value = "";
    }
    if (keyword == "five") {
        document.getElementById("pointers").style.display = "none";
        document.getElementById("numEMice").value = "";
    }
    if (keyword == "six") {
        document.getElementById("printers").style.display = "none";
        document.getElementById("numFax").value = "";
    }
    if (keyword == "seven") {
        document.getElementById("tvPeripherals").style.display = "none";
        document.getElementById("numTVP").value = "";
    }
    if (keyword == "eight") {
        document.getElementById("vcrs").style.display = "none";
        document.getElementById("numVCR").value = "";
    }
    if (keyword == "nine") {
        document.getElementById("dvrs").style.display = "none";
        document.getElementById("numDVR").value = "";
    }
    if (keyword == "ten") {
        document.getElementById("dvd").style.display = "none";
        document.getElementById("numDVD").value = "";
    }
    if (keyword == "eleven") {
        document.getElementById("dcb").style.display = "none";
        document.getElementById("numDCB").value = "";
    }
    if (keyword == "twelve") {
        document.getElementById("cable").style.display = "none";
        document.getElementById("numCable").value = "";
    }
    if (keyword == "thirteen") {
        document.getElementById("xbox").style.display = "none";
        document.getElementById("numXbox").value = "";
    }
    if (keyword == "fourteen") {
        document.getElementById("sss").style.display = "none";
        document.getElementById("numSSS").value = "";
    }
    if (keyword == "fifteen") {
        document.getElementById("portables").style.display = "none";
        document.getElementById("numPD").value = "";
    }
    if (keyword == "sixteen") {
        document.getElementById("ipods").style.display = "none";
        document.getElementById("numIpods").value = "";
    }
}

function reschedule2() {
    setCookie("isDelete", "false", 1);
    var isRe = getCookie("resched");
    if (isRe == "true") {
        var capCook = getCookie("capCookie");
        var aloha = getCookie("aloha");
        document.getElementById("search-text").value = aloha;
        var bnum = getCookie("streetStart");
        var street = getCookie("streetName");

        var firstName = getCookie("firstName");
        var lastName = getCookie("lastName");
        var phoneNumber = getCookie("phoneNumber");
        var email = getCookie("email");

        document.getElementById("bldg-input").value = Number(bnum);
        document.getElementById("street-input").value = street;
        document.getElementById("first-name").value = firstName;
        document.getElementById("last-name").value = lastName;
        document.getElementById("phone").value = phoneNumber;
        document.getElementById("email").value = email;
        document.getElementById("confirm-email").value = email;

        var computers = Number(getCookie("computers")) + 0;
        var monitors = Number(getCookie("monitors")) + 0;
        var keyboards = Number(getCookie("keyboards")) + 0;
        var mice = Number(getCookie("mice")) + 0;
        var fax = Number(getCookie("fax")) + 0;
        var peripherals = Number(getCookie("peripherals")) + 0;
        var vcrs = Number(getCookie("vcrs")) + 0;
        var dvrs = Number(getCookie("dvrs")) + 0;
        var dvd = Number(getCookie("dvd")) + 0;
        var dcb = Number(getCookie("dcb")) + 0;
        var cable = Number(getCookie("cable")) + 0;
        var xbox = Number(getCookie("xbox")) + 0;
        var sss = Number(getCookie("sss")) + 0;
        var portables = Number(getCookie("portables")) + 0;
        var ipods = Number(getCookie("ipods")) + 0;

        if (computers > 0) {
            displayItem2('two');
            document.getElementById('numComps').value = computers;
        } else {
            hideItem2('two');
        }
        if (monitors > 0) {
            displayItem2('three');
            document.getElementById('numMon').value = monitors;
        } else {
            hideItem2('three');
        }
        if (keyboards > 0) {
            displayItem2('four');
            document.getElementById('numEKey').value = keyboards;
        } else {
            hideItem2('four');
        }
        if (mice > 0) {
            displayItem2('five');
            document.getElementById('numEMice').value = mice;
        } else {
            hideItem2('five');
        }
        if (fax > 0) {
            displayItem2('six');
            document.getElementById('numFax').value = fax;
        } else {
            hideItem2('six');
        }
        if (peripherals > 0) {
            displayItem2('seven');
            document.getElementById('numTVP').value = peripherals;
        } else {
            hideItem2('seven');
        }
        if (vcrs > 0) {
            displayItem2('eight');
            document.getElementById('numVCR').value = vcrs;
        } else {
            hideItem2('eight');
        }
        if (dvrs > 0) {
            displayItem2('nine');
            document.getElementById('numDVR').value = dvrs;
        } else {
            hideItem2('nine');
        }
        if (dvd > 0) {
            displayItem2('ten');
            document.getElementById('numDVD').value = dvd;
        } else {
            hideItem2('ten');
        }
        if (dcb > 0) {
            displayItem2('eleven');
            document.getElementById('numDCB').value = dcb;
        } else {
            hideItem2('eleven');
        }
        if (cable > 0) {
            displayItem2('twelve');
            document.getElementById('numCable').value = cable;
        } else {
            hideItem2('twelve');
        }
        if (xbox > 0) {
            displayItem2('thirteen');
            document.getElementById('numXbox').value = xbox;
        } else {
            hideItem2('thirteen');
        }
        if (sss > 0) {
            displayItem2('fourteen');
            document.getElementById('numSSS').value = sss;
        } else {
            hideItem2('fourteen');
        }
        if (portables > 0) {
            displayItem2('fifteen');
            document.getElementById('numPD').value = portables;
        } else {
            hideItem2('fifteen');
        }
        if (ipods > 0) {
            displayItem2('sixteen');
            document.getElementById('numIpods').value = ipods;
        } else {
            hideItem2('sixteen');
        }

        setCookie("computers", computers, -1);
        setCookie("monitors", monitors, -1);
        setCookie("keyboards", keyboards, -1);
        setCookie("mice", mice, -1);
        setCookie("fax", fax, -1);
        setCookie("peripherals", peripherals, -1);
        setCookie("vcrs", vcrs, -1);
        setCookie("dvrs", dvrs, -1);
        setCookie("dvd", dvd, -1);
        setCookie("dcb", dcb, -1);
        setCookie("cable", cable, -1);
        setCookie("xbox", xbox, -1);
        setCookie("sss", sss, -1);
        setCookie("portables", portables, -1);
        setCookie("ipods", ipods, -1);
        setCookie("resched", "false", 1);
        setCookie("isDelete", "true", 1);
    }
}

function cancelIfRe() {
    var isDel = getCookie("isDelete");
    console.log("IsDel: " + isDel);
    if (isDel == "true") {
        cancelRequest();
        setCookie("resched", "false", 1);
        setCookie("isDelete", "false", 1);
    }
}
