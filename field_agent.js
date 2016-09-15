var authorization_token = "YiUfCb7NeS8o7bxCfLHDqDaa0JMlzFyuhBEC1LlZIz28ZPRIjEsNktv07vf3Xms7_CJrQoRhFmvIM4Honad0akmpg3AK-SFzwLzWrV6LTx5o35lk_JHI1AxrPZF5jVO-lSu6b1XdTB_yYqVe4wRQNq8XFKFUH6JU4wqbiIjmxrnbbF-R5uXeM5vqdYNLJegduM5_4_i9Lu369aNFBgbbal-QC0ld2wRtfc-t5inDRp0qAwVpwsLAbOqTSBfBasXI_AW4YxS5OCJFnXHDY2QJPObmEFAiueMepOk47QzQNiEZ3zae95cVMXxOqluCvsYd50PevSzZRFergzFB0TWjO3m16uLibSbVGsEYMXJlsNsmMAKrG6PV3WNNLorYdBN3gImwEfwdG_X-AhDIHqEBRPZL_CwHBh6pPQZn-PNYaGDdwu93EP5NcsI0ymRDlGT7W_UCyGWBUCFd0uSWdws-iblMpu7wxQlbuhn45SFBxRE1";

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
