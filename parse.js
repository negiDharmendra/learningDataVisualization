var papa = require('papaparse');
var _ = require('lodash');
var fs = require('fs');
var files = process.argv.slice(3);
var countryName = process.argv[2];
var parsedFileData = function(file) {
    var text = fs.readFileSync(file, 'utf8');
    return papa.parse(text).data;
}

var getAllYears = function(year) {
    return year.split(' ')[0];
}

var groupByYear = function(records, infoType) {
    var dataForAllCountries = {};

    records.slice(1).forEach(function(record) {
        var result = {};
        result.data = []
        var country = record[0];
        var feilds = ['InfoType'].concat(records[0].slice(1).map(getAllYears));
        result.data.push(feilds);
        result.data.push([infoType].concat(record.slice(1)));
        dataForAllCountries[country] = result;
    })
    return dataForAllCountries;
}

var createSeparateCsvForAContry = function(files) {
    var result = {};
    files.forEach(function(file) {
        var infoType = file.match(/\w+/g)[0];
        result[infoType] = groupByYear(parsedFileData(file), infoType);
    })
    var out = {};
    out.data = [];
    var field = [];
    for (var record in result) {
        out.data.push(result[record][countryName].data[1]);
        field[0] = result[record][countryName].data[0];
    }
    return papa.unparse(field.concat(out.data));
}

console.log(createSeparateCsvForAContry(files));
