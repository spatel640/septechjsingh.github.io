function verifyAddress() {

    var number = document.getElementById("number").value;
    var street = document.getElementById("street").value;
    var borough = document.getElementById("borough").value;

    street = encodeURIComponent(street.trim());
    borough = encodeURIComponent(borough.trim());

    alert("Street Name: " + street);
    alert("Borough Name: " + borough);

    var settings = {
        "async": false,
        "crossDomain": false,
        "url": "https://api.cityofnewyork.us/geoclient/v1/address.json?houseNumber=321&street=Union%20Avenue&borough=Staten%20Island&app_id=b519ff0c&app_key=8351acab95743febeb729768d1251777",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "208b742b-65c0-60e9-6277-e1036f455892"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
