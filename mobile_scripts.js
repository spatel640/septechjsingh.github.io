var authorization_token = "FFU6v4DkHNpDFCfjyE0aLtehqPB7A4HRk3Xq1dhq-8uI5frSvNDIQduQF8J_n5aP6Qd_unNUg311obbCsIhlALo72J56ZhJu5RH1bkHYnBG_qgW0sd0HRWBaSSYoe6J8Q7y1_wv7EqIOF0WcFb5aXJRI8ApMzEDLL76Q9UPW67pfZiVe6zX7XSg_HnfweH316oh3uELmhEXf6TkzKr5xXBPG76t0rZwb3C0qdwLgA6YCH_tgy6zvl8zIsuv22RSxoKFO-Ib_OuC77mOsnBKb8T0E9OMblfYv09NHCpSFbnUsIjetH8rzZ3KMNoO-QAkws-OAe3YWPMzKGnZnb5SdX5zrED2ADhQphlVvqSE-IkC9SLF3b7bNaUatHJKlyShXpwMloSjG9vF1Ln-B8_eqiP2KGXIb0MfMrNp7am4OllIfxf6TvxKONut4P-QCfGMIYRrqKSLQ--ZoqHIEvimKOvfEhPwfmMa2Hve2F6wBIZk1";

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

function addPair() {
    $('#feeTable').show();
    $('#feeTable').append('<tr><td>' + $('#select3').val() + '</td><td>' + $('#select4').val() + '</td></tr>');
    $('#select4').selectpicker('deselectAll');
}
