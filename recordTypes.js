var insepction = function (capId, altId, name, bldg, street, lat, lon, zipCode, district, secondary, id) {
    this.capId = capId;
    this.altId = altId;
    this.name = name;
    this.district = district;

    this.bldg = bldg;
    this.street = street;
    this.lat = lat;
    this.lon = lon;
    this.zipCode = zipCode;
    this.secondary = secondary;

    this.inspectionId = id;
}

inspection.prototype.getCap = function () {
    return this.capId;
}
inspection.prototype.getAlt = function () {
    return this.altId;
}
inspection.prototype.getName = function () {
    return this.name;
}
insepction.prototype.getDistrict = function () {
    return this.district;
}
inspection.prototype.getBldg = function () {
    return this.bldg;
}
inspection.prototype.getStreet = function () {
    return this.street;
}
inspection.prototype.getLat = function () {
    return this.lat;
}
insepction.prototype.getLon = function () {
    return this.lon;
}
inspection.prototype.getZipCode = function () {
    return this.zipCode;
}
inspection.prototype.getSecondary = function () {
    return this.secondary;
}
inspection.prototype.getInspectionId = function () {
    return this.inspectionId;
}
