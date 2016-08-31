/*
var authorization_token = "iahx_izPsqcX3EtGT7_lvdwfijvnIs9d4gcYBq4Pwexl-1pxe8aO4zWJtX2yBwMdF_FVr0ZRcrcTW4VrkPcR5ymR1oTfrHZwuqxgclHXHycJfg8z26uya8Nl8WbQHGyRUD1suBLbVhaHwP4Tc11k02LXpTNMXoXzNBHjCkTjEhQdMmCFnXgA4jxp6BrlV3-D_pJTqVlRDPhzuKrIk9h4z4DjU0qozvV3zJoSWfOo9QTaFsEcBoMeIad1xTDsoxx2zg08uyVWjH5McB1m6OeZ8iu3ago8BeYfr-Y-s_1ejtV2oXyaUJAikXwc86JkGal1zTzXIMJQX0VB7A06WocJxkja_klM6_H6if9LO1N4T4poQgFeSfnKsYzEEmJ-i-Kz1BeVJ_F5Vm6Lb2h4xJBEswsPjTY83KEneocdP2Dm1_ECjDVcq0i3FL0yVupLN-SqBzL1Jb3A-h5wzKPAZlCklNeE6ClO0drb1XXh_hSMq1o1";

function start() {
    loadRecords();
    $('.myForm').show();
    $('#fee_schedules').hide();
    $('#fee_items_inputs').hide();
    $('#configButton').hide();
    $('#feeTable').hide();
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
                text: recordType.value
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
*/

function showDrops() {
    $('.myForm').show();
    $('#fee_schedules').show();
    $('#fee_items_inputs').show();
    $('#configButton').show();
    $('#feeTable').show();
    $('#start').prop('disabled', 'true');

    fillDrop(1, "recordType", 15);
    fillDrop(2, "feeSchedule", 4);
    fillDrop(3, "feeItems", 20);
    fillDrop(4, "ASI_Item", 50);
}

function fillDrop(numSelect, wordToUse, numOpts) {
    for (i = 0; i < numOpts; i++) {
        $("<option></option>", {
            value: wordToUse + (i + 1).toString(),
            text: wordToUse + (i + 1).toString()
        }).appendTo('#select' + numSelect.toString());
    }
    $('#select' + numSelect.toString()).selectpicker('refresh');
}

function addPair() {
    $('#feeTable').show();
    $('#feeTable').append('<tr><td>' + $('#select3').val() + '</td><td>' + $('#select4').val() + '</td></tr>');
    var numItem = $('#feeTable tr').length - 1;
    var newIn1 = '<input id="fielda' + numItem + '" name="fielda' + numItem + '" type="hidden" value="' + $('#select3').val() + '">';
    var newIn2 = '<input id="fieldb' + numItem + '" name="fieldb' + numItem + '" type="hidden" value="' + $('#select4').val() + '">';
    var newInput1 = $(newIn1);
    var newInput2 = $(newIn2);
    $('#submitData').append(newInput1);
    $('#submitData').append(newInput2);
    $('#select4').selectpicker('deselectAll');
}
