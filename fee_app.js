function create_items_schedules() {
    var fee_code_AR = "BC-P";
    var fee_code_PC = "BC-I";
    var fee_schedule = "";

    var nConst = $('#is_new_const').val();
    var ncType = $('#new_const_type').val();
    var occCat = $('#occ_cat').val();
    var conType = $('#const_type').val();

    if (nConst == "Yes")
        fee_schedule = "BC-CONST-COMPLETE";
    else
        fee_schedule = "BC-CONST-ADDITION";

    if (ncType == "2") {
        fee_code_AR += "S-";
        fee_code_PC += "S-";
    } else if (ncType == "3") {
        fee_code_AR += "P-";
        fee_code_PC += "P-";
    } else {
        fee_code_AR += "C-";
        fee_code_PC += "C-";
    }

    if (occCat == "R3A") {
        fee_code_AR += "R3A-";
        fee_code_PC += "R3A-";
    } else if (occCat == "R3B") {
        fee_code_AR += "R3B-";
        fee_code_PC += "R3B-";
    } else if (occCat == "R3C") {
        fee_code_AR += "R3C-";
        fee_code_PC += "R3C-";
    } else {
        fee_code_AR += "R3D-";
        fee_code_PC += "R3D-";
    }

    if (conType == "1A" || conType == "1B") {
        fee_code_AR += "IA";
        fee_code_PC += "IA";
    } else if (conType == "2A" || conType == "2B" ||
        conType == "3A" || conType == "3B" ||
        conType == "4") {
        fee_code_AR += "II";
        fee_code_PC += "II";
    } else {
        fee_code_AR += "V";
        fee_code_PC += "V";
    }

    console.log("Plan Review Fees: " + fee_code_AR);
    console.log("Inspection Fees: " + fee_code_PC);
    console.log("Fee Schedules: " + fee_schedule);

    var quantity = $('#square_feet').val();
    var formula = "";

    $.getJSON( /*'https://septechjsingh.github.io/mobile_data.json'*/ 'fee_app_2.json', function (data) {
        formula = data[fee_code_AR];
        console.log(formula);
        console.log(linear_with_min_max_enhanced(formula, quantity));
    });
}

var test_string = '350,0,0,9999999,15,150,5250,0,9999999';
var test_string2 = '0,0,0,0,499,0.0224,325.0176,0,999999999,1499,0.0544,580.0256,0,999999999,2499,0.0928,634.7072,0,999999999,3499,0.0864,728.7936,0,999999999,4499,0.0608,815.2192,0,999999999,6499,0.0352,934.6048,0,999999999,9999,0.112,1058.368,0,999999999';

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

function hideStuff() {
    $('#myForm').hide();
    $('#myTable').hide();
}

function showInput() {
    $('#myForm').show();
}

function calc() {
    var quant = $('#exampleInputAmount').val();
    if (quant == null || quant == undefined || quant == 0) {
        alert("Please enter a value greater than 0 to continue");
    } else {
        var fee = linear_with_min_max_enhanced(test_string2, quant).toFixed(2);
        var total_fee = parseFloat(fee) + 50;
        total_fee = total_fee.toFixed(2);
        $('#app_fee').text('50');
        $('#permit_fee').text(fee);
        $('#total').text(total_fee);
        $('#myTable').show();
    }
}
