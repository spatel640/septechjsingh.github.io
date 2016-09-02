var authorize = "pIOKxl6Tbrrt9_w9ilm-wYICd6MMVNggasy5OUB8V0Be3Wo3O8VR_M75O6MQztJu2j7bFNWTUVxWQGGOMlhbUxVfTohrUc7eK8IIgusP1XsDaiBiODNab7qdNOTKzGnQYsdjh0nkZm4GAbR3_K1EuxoiyD2OkkYm4oQEwmboa2ZT9TcnAazHd-UPEn74T4FRbiB6BOQQErTt38HYbLFcCUKwJvXXUoxFMlUs53SSqbR5vjYxUm_PWOc3G7MdkAWASzA5azf-2AsoTtoDVbD1Oh6eVo57ORKul6k3Is7T3e9ER1KkqVcz7K56VRReaqL21u9V8JUM1hW3zTuOp_cIQt0uk1yAvCqpZEpZIirxjgIYYw4HHqnr2tL55LLLV8cs58ndlUsOaJ-WJbhC-VxZ0X70EDYfEhStOQL2IQSotexseGGGPgSSNJVdTLGKVHexckw4Mx_7wiOqynXzs3Lz7P-U0bN6bGOqrWgNQuoxK7g1";

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

    var myCustomId = document.getElementById("search-text").value;
    var capId = "";

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
    if (televisions == 0) {
        document.getElementById("tvs2").style.display = "none";
        document.getElementById("tv11").style.display = "none";
        document.getElementById("tv22").style.display = "none";
        document.getElementById("tv33").style.display = "none";
        document.getElementById("tv44").style.display = "none";
        document.getElementById("tv55").style.display = "none";
        document.getElementById("tv66").style.display = "none";
    } else {
        document.getElementById("numTV2").innerHTML = televisions;
        if (tv32 == 0) {
            document.getElementById("tv11").style.display = "none";
        } else {
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
    var streetStart, streetName, pickupLocation, streetType;
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
        pickupLocation = "Curb";

        setCookie("streetStart", streetStart, 1);
        setCookie("streetName", streetName, 1);
    });

    document.getElementById("buildingNumber22").innerHTML = streetStart;
    document.getElementById("streetAddress22").innerHTML = streetName;
    document.getElementById("pickupLocation22").innerHTML = pickupLocation;
    document.getElementById("myModal").style.display = "block";
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
    cancelRequest();
    window.location.href = '/311Page.html';
}

function reschedule2() {
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
}
