var fee_iterator = 0;
var formula = "";

function load() {
    $('#proceed').hide();
    $.getJSON( /*'https://septechjsingh.github.io/mobile_data.json'*/ 'mobile_data.json', function (data) {
        console.log("Hello World");
        console.log(data);
        loadFees(data);
    });
}

function loadFees(data) {
    var num_fees = data.result.length;
    for (i = 0; i < num_fees; i++) {
        $("<option></option>", {
            value: data.result[i].name,
            text: data.result[i].name
        }).appendTo('#fee_to_calculate');
    }
    $('#fee_to_calculate').selectpicker('refresh');
}

function showButton(id) {
    $(id).show();
}

function showInputs() {
    var fee_name = $('#fee_to_calculate').val();
    console.log(fee_name)
}
