var authorization_token = "h17o4crHyAsvrHP6lr154sLdHoo2kWty7qPVbsm9BtPFAKBy2SVypzircBdRLwmw0EjYLqfnuLl_u706Cstas7g7VhYp2oaZGnZfT-NSQ01qSNIyd3BDY4zgX71x_KepX7sZzMjmRO8QNwEFws86eQoq6yg_SJb5VbKIQWBPNp5vFcfu4sUo-VQmBcwWH_znJ5p7JvqZx5pc-ADooTSbYfDRCHt1lwBv2MiFFZagL-ciECGPjGCavSATLoenAcitsZYigNsEXM81cbn5farqwn340F_yzZ8mJ81DJgGT5h9qCW_AoaNp0Ne1n8OyWFZWDEjdH_KAiLoj0RboAEjwg7lvq8kmQ2y8nl0urv1RfvPYX7dQ_kqdx0M4XN87SBF8KfWDEGcN3rt5kd5k0chAxyOgxQuBf3Yx2LyLOOb3-N0MbM0DGmlslY9-S1ukDqnSvxW7RvmmUzScQ4REIJrnFyaPCt4gUtS59FXMBBU0uwo1";

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

function checkCookie(cookie2check) {
    var user = getCookie(cookie2check);
    if (user != "") {
        return true;
    } else {
        return false;
    }
}

function isValid(username, password) {
    return true;
}

function redirector() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (isValid(username, password)) {
        setCookie("username", username, 1);
        if ($('#rememberMe').val() == true)
            setCookie('remembered', username, 1);
        window.location.href = '/field_agent_P2.html';
    }
}

function getJobs() {
    $('.panel').hide();
    var myInspections;
    if (checkCookie("username")) {
        var username = getCookie("username");
        console.log(username);
        $('#username').text(username.toUpperCase());
        var now = moment();
        var temp = now.format('YYYY MM DD').toString();
        var date2Pass = temp[0] + temp[1] + temp[2] + temp[3] + '-' + temp[5] + temp[6] + '-' + temp[8] + temp[9];

        var settings = {
            "async": false,
            "crossDomain": true,
            "url": "https://apis.accela.com/v4/inspections?inspectorIds=" + username + "&scheduledDateFrom=" + date2Pass + "&scheduledDateTo=" + date2Pass,
            "method": "GET",
            "headers": {
                "authorization": authorization_token,
                "cache-control": "no-cache",
                "postman-token": "52db0691-8db4-6938-7922-89ec9593e4da"
            }
        }

        var i;

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.result != null && response.result != undefined && response.result != "") {
                myInspections = new Array(response.result.length);
                for (i = 0; i < response.result.length; i++) {
                    var capId = response.result[i].recordId.id;
                    var custId = response.result[i].recordId.customId;
                    var bldg = response.result[i].address.streetStart;
                    var street = response.result[i].address.streetName;
                    var lat = response.result[i].address.xCoordinate;
                    var lon = response.result[i].address.yCoordinate;
                    var zipCode = response.result[i].address.postalCode;
                    var district = response.result[i].address.inspectionDistrict;
                    var secondary = response.result[i].address.secondaryStreet;
                    var id = response.result[i].id;
                    var district = 501;

                    if (username.toUpperCase() == "SI01")
                        district = 501;
                    else if (username.toUpperCase() == "SI02")
                        district = 502;
                    else
                        district = 503;

                    var name = '';

                    var settings = {
                        "async": false,
                        "crossDomain": true,
                        "url": "https://apis.accela.com/v4/records/" + capId,
                        "method": "GET",
                        "headers": {
                            "authorization": authorization_token,
                            "cache-control": "no-cache",
                            "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
                        }
                    }

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        name = response.result[0].name;
                    });

                    var myInspection = new Insepction(capId, custId, district, name, bldg, street, lat, lon, zipCode, district, secondary, id);
                    myInspections[i] = myInspection;
                }
            }
        });

        if (myInspections != undefined) {
            for (i; i < myInspections.length; i++) {
                myInspections[i] = null;
            }
            for (i = 0; i < myInspections.length; i++) {
                var cur_num = (i + 1).toString();
                document.getElementById('altId' + cur_num).innerHTML = myInspections[i].altId;
                document.getElementById('content' + cur_num).innerHTML = myInspections[i].name;
                document.getElementById('bldg' + cur_num).innerHTML = myInspections[i].bldg;
                document.getElementById('street' + cur_num).innerHTML = myInspections[i].street;
                document.getElementById('cross' + cur_num).innerHTML = myInspections[i].secondary;
                document.getElementById('district' + cur_num).innerHTML = myInspections[i].district;
                document.getElementById('cap' + cur_num).value = myInspections[i].capId;
                document.getElementById('lat' + cur_num).value = myInspections[i].lat;
                document.getElementById('lon' + cur_num).value = myInspections[i].lon;
                document.getElementById('insp' + cur_num).value = myInspections[i].inspectionId;
                document.getElementById('panel' + cur_num).style.display = 'block';
            }
        }
        console.log(myInspections);

    } else {
        console.log("Username did not exist");
    }
}

var map;

function initMap() {

    var latitude = parseFloat(getCookie('lat'));
    var longitude = parseFloat(getCookie('lon'));
    var bldg = getCookie('bldg');
    var street = getCookie('street');
    var altId = getCookie('altId');
    var capId = getCookie('capId');
    var insp = getCookie('insp');
    var name = getCookie('name');

    $('#address').text(bldg + ' ' + street);
    $('#summary').text(name);
    $('#altId').text(altId);

    console.log('Name: ' + name);

    var myLatLng = {
        lat: longitude,
        lng: latitude
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: bldg + ' ' + street
    });
    showDetails(capId);
}

function showDetails(capId) {
    var televisions, computers, monitors, keyboards, mice, fax, peripherals, vcrs, dvrs, dvd, dcb, cable, xbox, sss, portables, ipods, tv32, tv43, tv49, tv59, tv69, tv70;
    var firstName;
    var lastName;
    var phoneNumber;
    var email;

    // Get the Contact Information
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "/contacts",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": authorization_token,
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
        $('#name').text(firstName + ' ' + lastName);
        $('#number').text(phoneNumber);
    });

    // Get the Custom Forms Data
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/records/" + capId + "/customForms",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": authorization_token,
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
    });
}

function showMap(number) {
    var capId = document.getElementById('cap' + number.toString()).value;
    var altId = document.getElementById('altId' + number.toString()).innerHTML;
    var bldg = document.getElementById('bldg' + number.toString()).innerHTML;
    var street = document.getElementById('street' + number.toString()).innerHTML;
    var lat = document.getElementById('lat' + number.toString()).value;
    var lon = document.getElementById('lon' + number.toString()).value;
    var insp = document.getElementById('insp' + number.toString()).value;
    var name = document.getElementById('content' + number.toString()).textContent;

    console.log(capId);
    console.log(altId);
    console.log(bldg);
    console.log(street);
    console.log(lat);
    console.log(lon);
    console.log(insp);
    console.log(name);

    setCookie('capId', capId, 1);
    setCookie('altId', altId, 1);
    setCookie('bldg', bldg, 1);
    setCookie('street', street, 1);
    setCookie('lat', lat, 1);
    setCookie('lon', lon, 1);
    setCookie('insp', insp, 1);
    setCookie('name', name, 1);

    window.location.href = '/field_agent_single_map.html';
}
