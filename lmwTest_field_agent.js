var authorization_token = "tdGRKdYG8VZWtmvM3IHF0_8SPRY0GaHeoMBlTEP_gj4HKEVLu9tw-Zg3hhmde8GL7FkQHGRD8tsVEPB-6Mvi54rrlPHrN3BKQi6TMrOe2YTzqkbH2zXLy7fxmnapepJP0DVJ7z6pynXTFqdrJ6VUVYVYUNiNJL6206pTxK7F6oKl9wKW0Q-K5Aq_8bK0Cx0jsmbpKlq0f1byMpeorNGUcNEBCeN0MI3qV-feeK38dOz0g231FWfN1lLsuQ9Yc0IBa5KY9FfV7BlBx4EktCFwhrORQQ4dzWSm0358DyOBdemZ3msJgv8kHbusnAZYTpCL8UnjVBIw0r0vcbTkHOu8XMZ-xRW2V1zKlfScTY2wkmLL6RWnKtGdvKUK9oYZPCS1RDSDgA52clzFUf0VxxKSLa3X9tjbLWZhNvjxcFGhAMUFtZQkJighWCMGKKBA6ilt-NPBPsPPuzA5k_JfebT_2g2";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
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
//    return true;
	var settings = {
	  "async": false,
	  "crossDomain": true,
	  "url": "https://apis.accela.com/oauth2/token",
	  "method": "POST",
	  "headers": {
		"Accept": "application/json",
		"Content-Type": "application/x-www-form-urlencoded",
		"cache-control": "no-cache",
		"Postman-Token": "95a47fff-f79e-4fea-8a60-42dec98ce65f"
	  },
	  "data": {
		"client_id": "636767970437851872",
		"client_secret": "606531ea10c7492da9c22e79ddd7c2ea",
		"grant_type": "password",
		"username": username,
		"password": password,
		"agency_name": "MCPHD",
		"environment": "SUPP",
		"scope": "records settings documents users addresses reports inspections",
		"id_provider": "citizen"
	  }
	}
	var aTkn = 'bob';
	$.ajax(settings).done(function (response) {
		aTkn = response.access_token;
	});
	return aTkn;
}

function redirector() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (isValid(username, password)) {
        setCookie("poolusername", username, 1);
        if ($('#rememberMe').val() == true)
            setCookie('remembered', username, 1);
        window.location.href = 'field_agent_P2.html';
    }
}

function redirector2() {
    var username = $('#username').val();
    var password = $('#pwd').val();
	var uToken = isValid(username, password);
   if (uToken!=undefined) {
		console.log("aToken: " + uToken);
        setCookie("uToken", uToken, 1);
        setCookie("poolusername", username, 1);
        if ($('#rememberMe').val() == true)
            setCookie('remembered', username, 1);
        //window.location.href = 'field_agent_P2.html';
		console.log("here: " + getCookie("uToken"));
    }else{
		window.alert("Bad username/password combo");
	}
}


function getChecklists() {
    $('.panel').hide();
    var smplRes;
	//var username = getCookie("username");
	var poolusername = "lwacht@septechconsulting";
	var uToken = getCookie("uToken");
	if(!uToken){
        console.log("uToken: " + uToken);
        $('#username').text(poolusername.toUpperCase());
		//get records for the current user
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://apis.accela.com/v4/records/mine",
		  "method": "GET",
		  "headers": {
			"Authorization": "JFYSAcJ5XEqBIbbS5xDGDKVXMvllK4xyD88BZeJ7oRaNyofl7rH-AHCp_lmq4ZELidE_aoOdOhOCtQeZ8dcdxRKkaXj8T4jv19-bFDDjW8FYVYE8wZevEBoLtUXS0_Jl4dhOOPj-wKYaBrOQBrjokRBT9nRMjOPdQBATeS20_6-YcjfklZc9XOPu9ahFrjgXs5qXhbFGHi9gCFVj5N9HlT477Sm3MJdMxJ4jZVphSwHbJ3C5KVAK9y-LJO2wclmf600S1zE68vCVnX5LjpjEXHk-HLJGJphpy4QXRhi5pm0vB7Rjvi9PMA_JKVdLDyHiFH0jOd6RbGs_fypzQZF1O_x-8T0hFWSxa2B4hBnA3w-YBRkkRyxiGIN8ox3G4Nf8AHkbvgzYnJgSiUDNPeQYKqH7Obccg-dgb947ptKXLuy1k5JRE2lIXlbsBaC2IdASqNb7e7j6fB6DFpgizNEJY9jb2JaB6yYf6TvaNZ8zK72mKeh4l2WCLHZBl5qXy1wAso7UFAJco93Fy7xoz-o7kw2",
			"cache-control": "no-cache",
			"Postman-Token": "38bd0150-91f0-42c1-90f8-461b0bb3b515"
		  }
		}
        var xx;
        var num_scheduled = 0;
        smplRes = new Array();

		$.ajax(settings).done(function (response) {
			//console.log(response);
            if (response.result != undefined) {
                for (i = 0; i < response.result.length; i++) {
                    if (response.result[i].type.id.match("EnvHealth-WQ-GeneralWaterQuality-NA")) {
                        num_scheduled = num_scheduled + 1;
                        var capId = response.result[i].id;
						//get the inspections for the found records; find the ??? inspection to process
                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://apis.accela.com/v4/records/" + capId + "/inspections",
                            "method": "GET",
                            "headers": {
                                "authorization": "JFYSAcJ5XEqBIbbS5xDGDKVXMvllK4xyD88BZeJ7oRaNyofl7rH-AHCp_lmq4ZELidE_aoOdOhOCtQeZ8dcdxRKkaXj8T4jv19-bFDDjW8FYVYE8wZevEBoLtUXS0_Jl4dhOOPj-wKYaBrOQBrjokRBT9nRMjOPdQBATeS20_6-YcjfklZc9XOPu9ahFrjgXs5qXhbFGHi9gCFVj5N9HlT477Sm3MJdMxJ4jZVphSwHbJ3C5KVAK9y-LJO2wclmf600S1zE68vCVnX5LjpjEXHk-HLJGJphpy4QXRhi5pm0vB7Rjvi9PMA_JKVdLDyHiFH0jOd6RbGs_fypzQZF1O_x-8T0hFWSxa2B4hBnA3w-YBRkkRyxiGIN8ox3G4Nf8AHkbvgzYnJgSiUDNPeQYKqH7Obccg-dgb947ptKXLuy1k5JRE2lIXlbsBaC2IdASqNb7e7j6fB6DFpgizNEJY9jb2JaB6yYf6TvaNZ8zK72mKeh4l2WCLHZBl5qXy1wAso7UFAJco93Fy7xoz-o7kw2",
                                "cache-control": "no-cache",
                                "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
                            }
                        }
                        $.ajax(settings).done(function (response) {
                            //console.log(response);
							if (response.result != undefined) {
								for (j = 0; j < response.result.length; j++) {
									if(response.result[j].type.text.match("Initial")){
										var inspId = response.result[j].id;
										console.log("inspId: " + inspId);
										var settings = {
											"async": true,
											"crossDomain": true,
											"url": "https://apis.accela.com/v4/inspections/" + inspId + "/checklists",
											"method": "GET",
											"headers": {
												"authorization": "JFYSAcJ5XEqBIbbS5xDGDKVXMvllK4xyD88BZeJ7oRaNyofl7rH-AHCp_lmq4ZELidE_aoOdOhOCtQeZ8dcdxRKkaXj8T4jv19-bFDDjW8FYVYE8wZevEBoLtUXS0_Jl4dhOOPj-wKYaBrOQBrjokRBT9nRMjOPdQBATeS20_6-YcjfklZc9XOPu9ahFrjgXs5qXhbFGHi9gCFVj5N9HlT477Sm3MJdMxJ4jZVphSwHbJ3C5KVAK9y-LJO2wclmf600S1zE68vCVnX5LjpjEXHk-HLJGJphpy4QXRhi5pm0vB7Rjvi9PMA_JKVdLDyHiFH0jOd6RbGs_fypzQZF1O_x-8T0hFWSxa2B4hBnA3w-YBRkkRyxiGIN8ox3G4Nf8AHkbvgzYnJgSiUDNPeQYKqH7Obccg-dgb947ptKXLuy1k5JRE2lIXlbsBaC2IdASqNb7e7j6fB6DFpgizNEJY9jb2JaB6yYf6TvaNZ8zK72mKeh4l2WCLHZBl5qXy1wAso7UFAJco93Fy7xoz-o7kw2",
												"cache-control": "no-cache",
												"postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
											}
										}
										$.ajax(settings).done(function (response) {
											//console.log(response);
											if (response.result != undefined) {
												for (k = 0; k < response.result.length; k++) {
													if(response.result[k].guideType.text.match("WQ Samples")){
														var chklstId = response.result[k].id;
														console.log("chklstId: " + chklstId);
														var settings = {
															"async": true,
															"crossDomain": true,
															"url": "https://apis.accela.com/v4/inspections/" + inspId + "/checklists/" + chklstId + "/checklistItems",
															"method": "GET",
															"headers": {
																"authorization": "JFYSAcJ5XEqBIbbS5xDGDKVXMvllK4xyD88BZeJ7oRaNyofl7rH-AHCp_lmq4ZELidE_aoOdOhOCtQeZ8dcdxRKkaXj8T4jv19-bFDDjW8FYVYE8wZevEBoLtUXS0_Jl4dhOOPj-wKYaBrOQBrjokRBT9nRMjOPdQBATeS20_6-YcjfklZc9XOPu9ahFrjgXs5qXhbFGHi9gCFVj5N9HlT477Sm3MJdMxJ4jZVphSwHbJ3C5KVAK9y-LJO2wclmf600S1zE68vCVnX5LjpjEXHk-HLJGJphpy4QXRhi5pm0vB7Rjvi9PMA_JKVdLDyHiFH0jOd6RbGs_fypzQZF1O_x-8T0hFWSxa2B4hBnA3w-YBRkkRyxiGIN8ox3G4Nf8AHkbvgzYnJgSiUDNPeQYKqH7Obccg-dgb947ptKXLuy1k5JRE2lIXlbsBaC2IdASqNb7e7j6fB6DFpgizNEJY9jb2JaB6yYf6TvaNZ8zK72mKeh4l2WCLHZBl5qXy1wAso7UFAJco93Fy7xoz-o7kw2",
																"cache-control": "no-cache",
																"postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
															}
														}
														$.ajax(settings).done(function (response) {
															//console.log(response);
															if (response.result != undefined) {
																for (l = 0; l < response.result.length; l++) {
																	if(response.result[l].checklistItem.text.match("Pool")){
																		var chkLstItem = response.result[l].id;
																		console.log("chkLstItem: " + chkLstItem);
																		var settings = {
																			"async": true,
																			"crossDomain": true,
																			"url": "https://apis.accela.com/v4/inspections/" + inspId + "/checklists/" + chklstId + "/checklistItems/" + chkLstItem + "/customTables",
																			"method": "GET",
																			"headers": {
																				"authorization": "JFYSAcJ5XEqBIbbS5xDGDKVXMvllK4xyD88BZeJ7oRaNyofl7rH-AHCp_lmq4ZELidE_aoOdOhOCtQeZ8dcdxRKkaXj8T4jv19-bFDDjW8FYVYE8wZevEBoLtUXS0_Jl4dhOOPj-wKYaBrOQBrjokRBT9nRMjOPdQBATeS20_6-YcjfklZc9XOPu9ahFrjgXs5qXhbFGHi9gCFVj5N9HlT477Sm3MJdMxJ4jZVphSwHbJ3C5KVAK9y-LJO2wclmf600S1zE68vCVnX5LjpjEXHk-HLJGJphpy4QXRhi5pm0vB7Rjvi9PMA_JKVdLDyHiFH0jOd6RbGs_fypzQZF1O_x-8T0hFWSxa2B4hBnA3w-YBRkkRyxiGIN8ox3G4Nf8AHkbvgzYnJgSiUDNPeQYKqH7Obccg-dgb947ptKXLuy1k5JRE2lIXlbsBaC2IdASqNb7e7j6fB6DFpgizNEJY9jb2JaB6yYf6TvaNZ8zK72mKeh4l2WCLHZBl5qXy1wAso7UFAJco93Fy7xoz-o7kw2",
																				"cache-control": "no-cache",
																				"postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
																			}
																		}
																		$.ajax(settings).done(function (response) {
																			console.log(response);
																			if (response.result != undefined) {
																				for (l = 0; l < response.result.length; l++) {
																					if(response.result[l].id.match("WQ_GWQ_POOL-SAMPLE")){
																						if(response.result[l].rows.length==0){
																							smplRes[xx] = new sampleResults (poolusername, "", "", "", "", "", "", "", "", "", "");
																							xx++;
																						}else{
																							var rowFnd = false;
																							for(row in response.result[l].rows){
																								if(response.result[l].rows[row].fields["Sample ID"].match(poolusername)){
																									console.log("response.result[l]rows: " + response.result[l].rows[row].fields["Sample ID"]);
																									smplRes[xx] = new sampleResults (poolusername, "", "", "", "", "", "", "", "", "", "");
																									xx++;
																								}
																							}
																						}
																					}
																				}
																			}
																		});
																		
																	}
																}
															}
														});
													}
												}
											}
										});
									}
								}
							}
                        });

                    }
                }
            }
        });
        console.log(num_scheduled);
        //console.log(myInspections.length);
		/*
        if (myInspections != undefined) {
            for (i = 0; i < myInspections.length; i++) {
                var cur_num = (i + 1).toString();
                console.log(myInspections[i]);
                console.log("Value of i: " + i);
                if (myInspections[i] != undefined && myInspections[i] != null) {
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
        }
        console.log(myInspections);
		*/
    } else {
        console.log("Username did not exist");
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
        now.add(1, 'day');
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
        var num_scheduled = 0;
        myInspections = new Array();

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.result != undefined) {

                for (i = 0; i < response.result.length; i++) {
                    //if (response.result[i].status.text == "Scheduled") {
                    if (response.result[i].status.text.match("Scheduled")) {
                        num_scheduled = num_scheduled + 1;

                        console.log('Should be Scheduled ONLY: ' + response.result[i].status.text);

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
            }
        });
        console.log(num_scheduled);
        console.log(myInspections.length);

        if (myInspections != undefined) {
            for (i = 0; i < myInspections.length; i++) {
                var cur_num = (i + 1).toString();
                console.log(myInspections[i]);
                console.log("Value of i: " + i);
                if (myInspections[i] != undefined && myInspections[i] != null) {
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
    $('#result_insp').hide();
    $('#additionalItems').selectpicker('hide');
    $('#select_title').hide();

    $('#addTv').hide();
    $('#addComps').hide();
    $('#addMons').hide();
    $('#addKeys').hide();
    $('#addMice').hide();
    $('#addFax').hide();
    $('#addTVP').hide();
    $('#addVCRs').hide();
    $('#addDVRs').hide();
    $('#addDVDs').hide();
    $('#addDCB').hide();
    $('#addCable').hide();
    $('#addGame').hide();
    $('#addSSS').hide();
    $('#addPorts').hide();
    $('#addIpods').hide();
    $('#updates').hide();

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

        if (tv32 > 0)
            addRow("TVs 32 Inches & Under", tv32);
        if (tv43 > 0)
            addRow("TVs 33-43 Inches", tv43);
        if (tv49 > 0)
            addRow("TVs 44-49 Inches", tv49);
        if (tv59 > 0)
            addRow("TVs 50-59 Inches", tv59);
        if (tv69 > 0)
            addRow("TVs 60-69 Inches", tv69);
        if (tv70 > 0)
            addRow("TVs 70 Inches & Up", tv70);
        if (computers > 0)
            addRow("Computer Peripherals", computers);
        if (monitors > 0)
            addRow("Monitors, Laptops", monitors);
        if (keyboards > 0)
            addRow("Electronic Keyboards", keyboards);
        if (mice > 0)
            addRow("Electronic Mice", mice);
        if (fax > 0)
            addRow("Fax Machines", fax);
        if (peripherals > 0)
            addRow("TV Peripherals", peripherals);
        if (vcrs > 0)
            addRow("VCRs", vcrs);
        if (dvrs > 0)
            addRow("DVRs", dvrs);
        if (dvd > 0)
            addRow("DVDs", dvd);
        if (dcb > 0)
            addRow("Digital Converter Boxes", dcb);
        if (cable > 0)
            addRow("Cable Boxes", cable);
        if (xbox > 0)
            addRow("Video Game Systems", xbox);
        if (sss > 0)
            addRow("Small Scale Servers", sss);
        if (portables > 0)
            addRow("Portable Devices", portables);
        if (ipods > 0)
            addRow("Portable Music Players", ipods);
    });
}

function addRow(item_name, number) {
    $('#item_table').append('<tr><td>' + item_name + '</td><td>' + number + '</td></tr>');
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

function resultOrNot() {
    var insp_result = $('#insp_result').val();
    if (insp_result == 'Pickup Complete' || insp_result == 'Item Not Found') {
        $('#result_insp').show();
    } else if (insp_result == 'Additional / Missing') {
        $('#result_insp').hide();
        showAdditional();
    }
}

function resultInsp() {
    var insp_id = getCookie('insp');
    var result = $('#insp_result').val();

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/inspections/" + insp_id + "/result",
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "authorization": authorization_token,
            "cache-control": "no-cache",
            "postman-token": "a46b0778-4842-e7f9-96e3-252bdf31f524"
        },
        "processData": false,
        "data": "{\r\n  \"status\": {\r\n    \"value\": \"" + result + "\",\r\n    \"text\": \"" + result + "\"\r\n  },\r\n  \"resultComment\": \"All requirements met.\"\r\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert('The Pickup Request Has Been Succesfully Updated!');
    });
    window.location.href = '/field_agent_P2.html';
}

/*
option value = "tv" > Televisions < /option> <
option value = "comp" > Computers < /option> <
option value = "mon" > Monitors, Laptops < /option> <
option value = "keys" > Keyboards < /option> <
option value = "mice" > Mice < /option> <
option value = "fax" > Fax Machines < /option> <
option value = "tvp" > TV Peripherals < /option> <
option value = "vcr" > VCRs < /option> <
option value = "dvr" > DVRs < /option> <
option value = "dvd" > DVDs < /option> <
option value = "dcb" > Digital Converter Boxes < /option> <
option value = "cable" > Cable or Satellite Receivers < /option> <
option value = "xbox" > Video Game Consoles < /option> <
option value = "sss" > Small Scale Servers < /option> <
option value = "ports" > Portable Devices < /option> <
option value = "ipods" > Portable Music Players < /option>
*/
/*
$('#addTv').hide();
$('#addComps').hide();
$('#addMons').hide();
$('#addKeys').hide();
$('#addMice').hide();
$('#adFax').hide();
$('#addTVP').hide();
$('#addVCRs').hide();
$('#addDVRs').hide();
$('#addDVDs').hide();
$('#addDCB').hide();
$('#addCable').hide();
$('#addGame').hide();
$('#addSSS').hide();
$('#addPorts').hide();
$('#addIpods').hide();
*/

function showAdditional() {
    $('#addTv').show();
    $('#addComps').show();
    $('#addMons').show();
    $('#addKeys').show();
    $('#addMice').show();
    $('#addFax').show();
    $('#addTVP').show();
    $('#addVCRs').show();
    $('#addDVRs').show();
    $('#addDVDs').show();
    $('#addDCB').show();
    $('#addCable').show();
    $('#addGame').show();
    $('#addSSS').show();
    $('#addPorts').show();
    $('#addIpods').show();
    $('#updates').show();
    /*
    var multi_val = $('#additionalItems').val();
    console.log(multi_val.length);
    for (i = 0; i < multi_val.length; i++) {
        var item = multi_val[i];
        if (item == 'tv')
            $('#addTv').show();
        else
            $('#addTv').hide();
        if (item == 'comp')
            $('#addComps').show();
        else
            $('#addComps').hide();
        if (item == 'mon')
            $('#addMons').show();
        else
            $('#addMons').hide();
        if (item == 'keys')
            $('#addKeys').show();
        else
            $('#addKeys').hide();
        if (item == 'mice')
            $('#addMice').show();
        else
            $('#addMice').hide();
        if (item == 'fax')
            $('#addFax').show();
        else
            $('#addFax').hide();
    }
    */
}

var sampleResults = function (sampleID, dtCollected, timeCollected, smplType, smplResult, fldNotes, bioSmplResult, chemSmplResult, smplLoc, qaqcLoc, qaqcType) {
    this.sampleID = sampleID;
    this.dtCollected = dtCollected;
    this.timeCollected = timeCollected;
    this.smplType = smplType;
    this.smplResult = smplResult;
    this.fldNotes = fldNotes;
    this.bioSmplResult = bioSmplResult;
    this.chemSmplResult = chemSmplResult;
    this.smplLoc = smplLoc;
    this.qaqcLoc = qaqcLoc;
    this.qaqcType = qaqcType;}
