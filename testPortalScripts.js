function verifyAddress() {

    var number = document.getElementById("number").value;
    var street = document.getElementById("street").value;
    var borough = document.getElementById("borough").value;

    street = encodeURIComponent(street.trim());
    borough = encodeURIComponent(borough.trim());

    $.ajax({
        url: "https://api.cityofnewyork.us/geoclient/v1/address.json?houseNumber=" + number + "&street=" + street + "&borough=" + borough + "&app_id=b519ff0c&app_key=8351acab95743febeb729768d1251777",
        dataType: "jsonp",
        jsonpCallback: "logResults"
    });
}

function logResults(json) {
    console.log(json);
    var returnCode = json.address.geosupportReturnCode;
    if (returnCode != "EE" && returnCode != "16") {
        document.getElementById("correct").style.display = "block";
        document.getElementById("correct_address").style.display = "block";
        document.getElementById("address_choices").style.display = "none";

        var houseNumber = json.address.houseNumber;
        var street = json.address.firstStreetNameNormalized;
        var borough = json.address.uspsPreferredCityName;
        var zip = json.address.zipCode;

        document.getElementById("correct_number").innerHTML = houseNumber;
        document.getElementById("correct_street").innerHTML = street;
        document.getElementById("correct_borough").innerHTML = borough;
        document.getElementById("zip_code").innerHTML = zip;

        document.getElementById("correct_number").style.display = "block";
        document.getElementById("correct_street").style.display = "block";
        document.getElementById("correct_borough").style.display = "block";
        document.getElementById("zip_code").style.display = "block";
        $('#submit-address').prop('disabled', 'false');
    } else {
        document.getElementById("correct").style.display = "none";
        document.getElementById("correct_address").style.display = "none"
        document.getElementById("address_choices").style.display = "block";
        var numSimilar = Number(json.address.numberOfStreetCodesAndNamesInList);

        if (numSimilar >= 3) {
            var choice1 = json.address.streetName1;
            var choice2 = json.address.streetName2;
            var choice3 = json.address.streetName3;

            document.getElementById("address1").innerHTML = choice1;
            document.getElementById("address2").innerHTML = choice2;
            document.getElementById("address3").innerHTML = choice3;
            document.getElementById("add1").value = choice1;
            document.getElementById("add2").value = choice2;
            document.getElementById("add3").value = choice3;
        }
    }
}
