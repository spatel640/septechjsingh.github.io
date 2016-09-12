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
}

funciton linear_with_min_max_enhanced(input_string, quantity) {

}
