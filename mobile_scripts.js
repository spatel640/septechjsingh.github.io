var authorization_token = "OCRo0EExXMbBSCkbP4RYVOTlPgk8AxSsJC_58uXKxN5-RMZKOlGRk32-V7rMdYVvc4-vXj7Cy-KiRopWtzlw05e8dBDvJK8400XXUYxjgsRcE_XwvKy90Q8hdv6pM-Ri_oY8rfeVcMwFt-z_of32d3GXhW7OFoZil8O240iiulG1-ymfoHxqfGsyZv66RzEM6hjHxuuuE0kN6tYvrstTtBel8SoXRFs_qWvw3RZMSE1mrQ8Do9lghjk4vf6nfDSIBfybk1tHUCy9jRozxuhSI1DUQu0bwvtV8S_6wjC0iPLuaeI7RyO1vU_T_hvjQWol-7aC8p51ArJ3Kd0rmYrHGAoS4Ym_v9qRXR3zT8cV47nHFIryS0EvKqz9PTYwzmGiAK-s5Y4d668GsL8InSUeXyaUit9IkIat0TWG2dtGC4vXfqe3EuZgXDCnseGq7-Q1-uGoMSnesVVRtkAjLDvo711RqGnoQAfZ8v9MmhIxm_jaE-7LxgclgZdrzCRXW9PS9SsFFIIFvWEfJsYpupVCxdNcmEJ0ccYiaSX85UzI-gViwWXs76BKMeuBgr3FxvVWUCrc53nUqL9KQU1fgJc-UzHRPDYThb_97bIa209OEQsUA-fU9w9EjkTG9TRAv3X2sPxw724PbYLhWvwTQ4Mp1Nd-TO8VlqKkVeRfHYQCc6TL8PI9_jsfB_B_VxMq6fPX0";

function start() {
    loadRecords();
    $('.myForm').show();
    $('#fee_schedules').hide();
    $('#fee_items_inputs').hide();
    $('#configButton').hide();
    $('#feeTable').hide();
    $('#submit').hide();
    $('#start').prop('disabled', 'true');
}

function loadRecords() {
    // Number of records
    var numRecords = 0;

    // Load the Records
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/settings/records/types",
        "method": "GET",
        "headers": {
            "authorization": authorization_token,
            "cache-control": "no-cache",
            "postman-token": "89e1315e-c6cd-1896-9cb9-59ef2edd4805"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        numRecords = response.result.length;
        for (var i = 0; i < numRecords; i++) {
            var recordType = response.result[i];
            $("<option></option>", {
                value: encodeURI(recordType.id),
                text: recordType.alias
            }).appendTo('#select1');
        }
        $('#select1').selectpicker('refresh');
    });
}

function loadFeeSchedules() {
    var recordType = $("#select1").val();
    console.log(recordType);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/settings/records/types/" + recordType + "/fees/schedules",
        "method": "GET",
        "headers": {
            "authorization": authorization_token,
            "cache-control": "no-cache",
            "postman-token": "a22c4961-abc1-800b-e4d7-404ab25a79f0"
        }
    }

    $.ajax(settings).done(function (response) {
        $('#select2 option').each(function () {
            $(this).remove();
        });
        console.log(response);
        var numScheds = response.result.length;
        for (var i = 0; i < numScheds; i++) {
            var fee_schedule = response.result[i].schedule.value;
            $("<option></option>", {
                value: fee_schedule,
                text: fee_schedule
            }).appendTo('#select2');
        }
        $("<option></option> ", {
            value: "",
            text: "Select A Fee Schedule..."
        }).prependTo('#select2').prop('selected', true).prop('disabled', true);
        $('#select2').selectpicker('refresh');
        $('#fee_schedules').show();
    });
}

function loadStuff() {
    var schedule = $("#select2").val();
    console.log("Fee Schedule: " + schedule);

    var record = $("#select1").val();
    console.log("Record Selected: " + record);

    $('#number_field').hide();
    loadItems(schedule);
    loadASIs(record);
}

function loadItems(schedule) {
    // Load the Fee Items
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/settings/fees?schedule=" + schedule,
        "method": "GET",
        "headers": {
            "authorization": authorization_token,
            "cache-control": "no-cache",
            "postman-token": "089dcc7f-206c-d95b-79f3-90fd4ff6c03f"
        }
    }

    $.ajax(settings).done(function (response) {
        $('#select3 option').each(function () {
            $(this).remove();
        });
        if (response.result == undefined) {
            alert("No fees Howie");
        } else {
            var numItems = response.result.length;
            for (i = 0; i < numItems; i++) {
                var item_code = response.result[i].code.value;
                $("<option></option>", {
                    value: item_code,
                    text: item_code
                }).appendTo('#select3');
            }
        }
        $("<option></option> ", {
            value: "",
            text: "Select A Fee Item..."
        }).prependTo('#select3').prop('selected', true).prop('disabled', true);
        $('#select3').selectpicker('refresh');
        $('#fee_items_inputs').show();
    });
}

function loadASIs(record) {
    // Load the ASI Fields
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apis.accela.com/v4/settings/records/types/" + record + "/customForms",
        "method": "GET",
        "headers": {
            "authorization": authorization_token,
            "cache-control": "no-cache",
            "postman-token": "1c5201ca-56f8-a2b5-1f2b-588453e9f20c"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#select4 option').each(function () {
            $(this).remove();
        });
        $("<option></option> ", {
            value: "",
            text: "Select Input or ASI Item..."
        }).appendTo('#select4').prop('disabled', true);
        $('<optGroup><optGroup/>').attr('label', 'Input Type').appendTo('#select4');
        $("<option></option> ", {
            value: "Input Type",
            text: "Input Type"
        }).appendTo('#select4').prop('disabled', true);
        $("<option></option> ", {
            value: "Number",
            text: "Number"
        }).appendTo('#select4');
        $("<option></option> ", {
            value: "Text",
            text: "Text"
        }).appendTo('#select4');

        if (response.result == undefined) {
            alert("No ASI's Howie");
        } else {
            var numSubgroups = response.result.length;
            for (var i = 0; i < numSubgroups; i++) {
                $('<optGroup/>').attr('label', response.result[i].text).appendTo('#select4');
                $("<option></option> ", {
                    value: response.result[i].text,
                    text: response.result[i].text
                }).appendTo('#select4').prop('disabled', true);

                var numASIs = response.result[i].fields.length;
                for (var j = 0; j < numASIs; j++) {
                    $("<option></option> ", {
                        value: response.result[i].fields[j].id,
                        text: response.result[i].fields[j].text
                    }).appendTo('#select4')
                }
            }
        }
        $('#select4').selectpicker({
            hideDisabled: false
        });
        $('#select4').selectpicker('refresh');
        $('#configButton').show();
    });
}

function showSubmit() {
    $('#submit').show();
}

function addPair() {
    $('#feeTable').show();
    $('#feeTable').append('<tr><td>' + $('#select3').val() + '</td><td>' + $('#select4').val() + '</td><td>' + $('#select5').val() + '</td></tr>');
    var numItem = $('#feeTable tr').length - 1;
    var newIn1 = '<input id="fielda' + numItem + '" name="fielda' + numItem + '" type="hidden" value="' + $('#select3').val() + '">';
    var newIn2 = '<input id="fieldb' + numItem + '" name="fieldb' + numItem + '" type="hidden" value="' + $('#select4').val() + '">';
    var newInput1 = $(newIn1);
    var newInput2 = $(newIn2);
    $('#submitData').append(newInput1);
    $('#submitData').append(newInput2);
    $('#select4').selectpicker('deselectAll');
}

function load() {
    $.getJSON( /*'https://septechjsingh.github.io/mobile_data.json'*/ 'mobile_data.json', function (data) {
        console.log("Hello World");
        console.log(data);
    });
}

function instaItem() {
    var fee_item = $('#select3').val();
    console.log(fee_item);
    if (fee_item == 'PERMIT_FEE')
        $('#select5').selectpicker('val', 'Linear Min Max Enhanced');
    if (fee_item == 'APP_FEE')
        $('#select5').selectpicker('val', 'Constant');
}

function showNumField() {
    var current = $('#select4').val();
    if (current == 'Number') {
        $('#number_field').show();
    } else {
        $('#number_field').hide();
    }
}
