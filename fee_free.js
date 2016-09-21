$.getJSON( /*'https://septechjsingh.github.io/mobile_data.json'*/ 'mobile_data.json', function (data) {
    console.log(data);
    var dataLength = data.result.length;
    var i = 0;
    for (i = 0; i < dataLength; i++) {
        $("<option></option> ", {
            value: i,
            text: data.result[i].name
        }).appendTo('#fee_type').prop('disabled', false);
        console.log(data.result[i].name);
    }
    $('#fee_type').selectpicker('refresh');
});

$('#cont1').hide();
$('#cont2').hide();
$('#cont3').hide();
$('#calc').hide();
$('#myTable').hide();

var formula = '';
var variable = '';
var num_fee_inputs;

function showInput() {
    $('#cont1').hide();
    $('#cont2').hide();
    $('#cont3').hide();
    $('#calc').hide();
    $.getJSON( /*'https://septechjsingh.github.io/mobile_data.json'*/ 'mobile_data.json', function (data) {
        console.log(data);
        var num_selected = Number($('#fee_type').val());
        var num_fee_items = data.result[num_selected].fee_types[0].inputs.length;
        for (i = 0; i < num_fee_items; i++) {
            var asi = data.result[num_selected].fee_types[0].inputs[i].name;
            var label_string = "lab" + (i + 1).toString();
            console.log(label_string);
            document.getElementById(label_string).innerHTML = asi;
            var cont_string = "cont" + (i + 1).toString();
            $('#' + cont_string).show();
        }
        $('#calc').show();
    });
}

function linear_with_min_max_enhanced(myString, quantity) {
    myString = myString.split(',');
    var a, b, m, M, R;

    var R_index = myString.length - 5;
    console.log(myString);

    while (R_index > 4) {
        R = Number(myString[R_index]);
        if (quantity > R) {
            // STOP. 
            // Quantity is greater than the range parameter
            break;
        }
        R_index = R_index - 5
    }
    fee = 0;

    R = Number(myString[R_index]);

    if (R == myString[4] && quantity < R) {
        a = Number(myString[0]);
        b = Number(myString[1]);
        m = Number(myString[2]);
        M = Number(myString[3]);
        console.log("a: " + a);
        console.log("b: " + b);
        console.log("R: " + R);
        fee = a * quantity + b;
        return fee;
    }

    a = Number(myString[R_index + 1]);
    b = Number(myString[R_index + 2]);
    m = Number(myString[R_index + 3]);
    M = Number(myString[R_index + 4]);

    console.log("a: " + a);
    console.log("b: " + b);
    console.log("R: " + R);
    fee = a * (quantity - R) + b;
    return fee;
}

function calculateThisFee() {
    $.getJSON( /*'https://septechjsingh.github.io/mobile_data.json'*/ 'mobile_data.json', function (data) {
        var num_selected = Number($('#fee_type').val());
        var num_fee_items = data.result[num_selected].fee_types[0].inputs.length;
        var formula = data.result[num_selected].fee_types[0].formula;
        var fee_name = data.result[num_selected].fee_types[0].name;
        var variable = data.result[num_selected].fee_types[0].variable;
        var fee, total;
        if (formula == 'FEE_MULTIPLIER') {
            var fee2 = 1;
            for (i = 0; i < num_fee_items; i++) {
                var input_string = "var" + (i + 1).toString();
                var input = document.getElementById(input_string).value;
                fee2 = fee2 * input;
            }
            fee2 = fee2 * parseFloat(variable);
            console.log("The Fee is: " + fee2);
            fee = fee2.toFixed(2);
            total = (fee2 + 50).toFixed(2);
        }
        if (formula == 'LINEAR_MIN_MAX_ENHANCED') {
            var quantity = document.getElementById('var1').value;
            var fee2 = linear_with_min_max_enhanced(variable, quantity);
            console.log("The Fee is: " + fee2);
            fee = fee2.toFixed(2);
            total = (fee2 + 50).toFixed(2);
        }
        $('#fee_name').text(fee_name);
        $('#fees').text(fee);
        $('#total').text(total);
    });
    $('#myTable').show();
}
