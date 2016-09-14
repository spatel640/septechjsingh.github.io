jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

function onload() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://54.174.123.211:3080/wireless/GovXMLServlet",
        "method": "POST",
        "headers": {
            "content-type": "application/xml"
        },
        "data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<GovXML xmlns=\"http://www.accela.com/schema/AccelaOpenSystemInterfaceXML\">\r\n\t<AuthenticateUser>\r\n\t\t<System>\r\n\t\t\t<XMLVersion>GovXML-7.3.0</XMLVersion>\r\n\t\t\t<ServiceProviderCode>partner</ServiceProviderCode>\r\n\t\t</System>\r\n\t\t<Username>ADMIN</Username>\r\n\t\t<Password>admin</Password>\r\n\t</AuthenticateUser>\r\n</GovXML>\r\n\t"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
